import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const iceCandidateQueue = useRef([]);
  const [streamReady, setStreamReady] = useState(false);

  const initializePeerConnection = () => {
    if (peerConnection.current) peerConnection.current.close();
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
    });

    peerConnection.current.ontrack = (event) => {
      console.log("✅ Отримано потік:", event.streams);
      if (event.streams && event.streams[0] && videoRef.current) {
        console.log("Прив’язуємо потік до videoRef:", videoRef.current);
        videoRef.current.srcObject = event.streams[0];
        setStreamReady(true);
        playVideo();
        // Перевірка активності треків
        event.streams[0].getTracks().forEach((track) => {
          console.log(
            `Трек ${track.kind}: enabled=${track.enabled}, readyState=${track.readyState}`
          );
        });
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && socket.current?.readyState === WebSocket.OPEN) {
        socket.current.send(
          JSON.stringify({
            iceCandidate: event.candidate,
            viewerId: socket.current.viewerId,
          })
        );
        console.log("🧊 Надсилаємо ICE candidate:", event.candidate);
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      console.log(
        "🧊 ICE Connection State:",
        peerConnection.current.iceConnectionState
      );
      if (
        peerConnection.current.iceConnectionState === "disconnected" ||
        peerConnection.current.iceConnectionState === "failed"
      ) {
        console.warn("⚠️ З’єднання розірвано, перезапуск");
        setStreamReady(false);
        initializePeerConnection();
      }
    };
  };

  const processIceCandidates = async () => {
    while (iceCandidateQueue.current.length) {
      const candidate = iceCandidateQueue.current.shift();
      try {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
        console.log("🧊 Додано ICE candidate з черги:", candidate);
      } catch (error) {
        console.error("❌ Помилка при додаванні ICE candidate:", error);
      }
    }
  };

  const playVideo = () => {
    if (!videoRef.current) {
      console.error("❌ videoRef не ініціалізований");
      return;
    }
    console.log(
      "Спроба відтворити відео, srcObject:",
      videoRef.current.srcObject
    );
    if (videoRef.current.srcObject) {
      videoRef.current
        .play()
        .then(() => {
          console.log("▶️ Відео відтворюється");
          // Перевірка стану відео
          console.log("Стан відео:", {
            paused: videoRef.current.paused,
            ended: videoRef.current.ended,
            readyState: videoRef.current.readyState,
            networkState: videoRef.current.networkState,
          });
        })
        .catch((e) => {
          console.error("❌ Помилка відтворення:", e);
          if (e.name === "NotAllowedError") {
            console.warn("⚠️ Автозапуск заблоковано. Натисніть 'Play Video'.");
          }
        });
    } else {
      console.warn("⚠️ Немає потоку для відтворення");
    }
  };

  const connectWebSocket = () => {
    socket.current = new WebSocket("wss://3f69-91-218-88-220.ngrok-free.app");

    socket.current.onopen = () => {
      console.log("✅ WebSocket підключено");
      socket.current.send(JSON.stringify({ role: "viewer" }));
      initializePeerConnection();
    };

    socket.current.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message);

        if (message.offer) {
          console.log("🎥 Отримано offer:", message.offer);
          const signalingState = peerConnection.current.signalingState;
          console.log("Текущий стан:", signalingState);

          if (signalingState === "stable" && streamReady) {
            console.log(
              "⚠️ З’єднання вже встановлено, ігноруємо повторний offer"
            );
            return;
          }

          if (signalingState !== "stable") {
            console.warn("⚠️ Перезапуск з’єднання через новий offer");
            initializePeerConnection();
          }

          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );
          console.log("✅ RemoteDescription встановлено");

          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(
              JSON.stringify({ answer, viewerId: socket.current.viewerId })
            );
            console.log("✅ Answer надіслано:", answer);
          }
          await processIceCandidates();
        } else if (message.iceCandidate) {
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          if (peerConnection.current.remoteDescription) {
            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(message.iceCandidate)
            );
            console.log("🧊 Додано ICE candidate:", message.iceCandidate);
          } else {
            iceCandidateQueue.current.push(message.iceCandidate);
            console.log(
              "🧊 ICE candidate додано в чергу:",
              message.iceCandidate
            );
          }
        }
      } catch (error) {
        console.error("❌ Помилка при обробці повідомлення:", error);
      }
    };

    socket.current.onerror = (err) => {
      console.error("❌ Помилка WebSocket:", err);
      setTimeout(connectWebSocket, 2000);
    };

    socket.current.onclose = () => {
      console.log("⚠️ WebSocket закрито");
      setTimeout(connectWebSocket, 2000);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket.current) socket.current.close();
      if (peerConnection.current) peerConnection.current.close();
    };
  }, []);

  const handlePlay = () => {
    playVideo();
  };

  const handleRestart = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ restart: true }));
      console.log("🔄 Надіслано команду перезапуску broadcaster'у");
    }
    if (peerConnection.current) peerConnection.current.close();
    initializePeerConnection();
    setStreamReady(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        playsInline
        muted
        style={{ width: "640px", height: "480px", border: "1px solid black" }}
      />
      <br />
      <button onClick={handlePlay} disabled={!streamReady}>
        Play Video
      </button>
      <button onClick={handleRestart}>Restart Stream</button>
      {!streamReady && <p>Очікування потоку...</p>}
      {streamReady && (
        <p>
          Потік готовий. Натисніть "Play Video", якщо відео не відтворюється.
        </p>
      )}
    </div>
  );
};
