import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const iceCandidateQueue = useRef([]); // Черга для ICE кандидатів

  // Ініціалізація PeerConnection
  const initializePeerConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.ontrack = (event) => {
      console.log("✅ Отримано потік:", event.streams);
      if (event.streams && event.streams[0] && videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      } else {
        console.warn("❗ Не вдалося підключити потік до video елементу");
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

  // Надсилання offer
  const sendOffer = async () => {
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify({ offer }));
        console.log("🎥 Надсилаємо новий offer:", offer);
      } else {
        console.warn("⚠️ WebSocket не готовий для відправки offer");
      }
    } catch (error) {
      console.error("❌ Помилка при створенні offer:", error);
    }
  };

  // Обробка ICE кандидатів із черги
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
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    socket.current = new WebSocket(`${protocol}://192.168.0.103:8080`);

    socket.current.onopen = () => {
      console.log("✅ WebSocket підключено");
      setSocketConnected(true);
      initializePeerConnection();
      sendOffer();
    };

    socket.current.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message);

        if (!peerConnection.current) {
          console.warn("⚠️ peerConnection не ініціалізований");
          return;
        }

        if (message.offer) {
          console.log("🎥 Отримано offer:", message.offer);
          const signalingState = peerConnection.current.signalingState;
          console.log("Текущий стан:", signalingState);

          if (
            signalingState === "stable" ||
            signalingState === "have-local-offer"
          ) {
            try {
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(message.offer)
              );
              console.log("✅ RemoteDescription встановлено");

              if (signalingState === "stable") {
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                if (socket.current?.readyState === WebSocket.OPEN) {
                  socket.current.send(JSON.stringify({ answer }));
                  console.log("✅ Answer надіслано:", answer);
                }
              }
              await processIceCandidates(); // Обробляємо ICE кандидати після remoteDescription
            } catch (error) {
              console.error("❌ Помилка при обробці offer:", error);
            }
          } else {
            console.warn("⚠️ Неправильний стан для offer:", signalingState);
          }
        } else if (message.answer) {
          console.log("🎥 Отримано answer:", message.answer);
          if (peerConnection.current.signalingState === "have-local-offer") {
            try {
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(message.answer)
              );
              console.log("✅ RemoteDescription (answer) встановлено");
              await processIceCandidates();
            } catch (error) {
              console.error("❌ Помилка при обробці answer:", error);
            }
          }
        } else if (message.iceCandidate) {
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          if (peerConnection.current.remoteDescription) {
            try {
              await peerConnection.current.addIceCandidate(
                new RTCIceCandidate(message.iceCandidate)
              );
              console.log("🧊 Додано ICE candidate:", message.iceCandidate);
            } catch (error) {
              console.error("❌ Помилка при додаванні ICE candidate:", error);
            }
          } else {
            iceCandidateQueue.current.push(message.iceCandidate);
            console.log(
              "🧊 ICE candidate додано в чергу:",
              message.iceCandidate
            );
          }
        }
      } catch (error) {
        console.error("❌ Помилка при парсингу повідомлення:", error);
      }
    };

    socket.current.onerror = (err) => {
      console.error("❌ Помилка WebSocket:", err);
    };

    socket.current.onclose = () => {
      console.log("⚠️ WebSocket з'єднання закрито");
      setSocketConnected(false);
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };

    return () => {
      if (socket.current) socket.current.close();
      if (peerConnection.current) peerConnection.current.close();
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline />;
};
