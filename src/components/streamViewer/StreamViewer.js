import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const iceCandidateQueue = useRef([]);
  const [streamReady, setStreamReady] = useState(false);

  const initializePeerConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close(); // Закриваємо старе з’єднання
    }
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.ontrack = (event) => {
      console.log("✅ Отримано потік:", event.streams);
      if (event.streams && event.streams[0] && videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        setStreamReady(true);
        videoRef.current
          .play()
          .catch((e) => console.error("❌ Помилка автозапуску:", e));
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("🧊 Надсилаємо ICE candidate:", event.candidate);
        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(
            JSON.stringify({ iceCandidate: event.candidate })
          );
        }
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      console.log(
        "🧊 ICE Connection State:",
        peerConnection.current.iceConnectionState
      );
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
        console.error("❌ Помилка при додаванні ICE candidate з черги:", error);
      }
    }
  };

  useEffect(() => {
    socket.current = new WebSocket("wss://192.168.0.103:8080");

    socket.current.onopen = () => {
      console.log("✅ WebSocket підключено");
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
            socket.current.send(JSON.stringify({ answer }));
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
    };

    socket.current.onclose = () => {
      console.log("⚠️ WebSocket закрито");
      if (peerConnection.current) peerConnection.current.close();
    };

    return () => {
      if (socket.current) socket.current.close();
      if (peerConnection.current) peerConnection.current.close();
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => console.log("▶️ Відео відтворюється"))
        .catch((e) => console.error("❌ Помилка відтворення:", e));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "640px", height: "480px", border: "1px solid black" }}
      />
      <br />
      <button onClick={handlePlay} disabled={!streamReady}>
        Play Video
      </button>
      {!streamReady && <p>Очікування потоку...</p>}
    </div>
  );
};
