import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);

  // Функція для ініціалізації WebRTC
  const initializePeerConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close(); // Закриваємо попереднє з'єднання, якщо є
    }
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.ontrack = (event) => {
      if (event.streams && event.streams[0] && videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      } else {
        console.warn("❗ Не вдалося підключити потік до video елементу");
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      console.log(
        "🧊 ICE Connection State:",
        peerConnection.current.iceConnectionState
      );
      if (peerConnection.current.iceConnectionState === "disconnected") {
        console.warn("⚠️ WebRTC з'єднання розірвано");
      }
    };
  };

  // Функція для відправки offer
  const sendOffer = async () => {
    try {
      if (!peerConnection.current) {
        console.warn("⚠️ peerConnection ще не ініціалізований");
        return;
      }
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify({ offer }));
        console.log("🎥 Надсилаємо новий offer:", offer);
      } else {
        console.warn("⚠️ WebSocket не готовий до відправки offer");
      }
    } catch (error) {
      console.error("❌ Помилка при створенні offer:", error);
    }
  };

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    socket.current = new WebSocket(`${protocol}://192.168.0.103:8080`);

    socket.current.onopen = () => {
      console.log("✅ WebSocket підключено");
      setSocketConnected(true);
      initializePeerConnection(); // Ініціалізуємо peerConnection при підключенні
      sendOffer(); // Надсилаємо offer одразу після підключення
    };

    socket.current.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message);

        if (!peerConnection.current) {
          console.warn(
            "⚠️ peerConnection ще не ініціалізований для обробки повідомлення"
          );
          return;
        }

        if (message.offer) {
          console.log("🎥 Отримано offer:", message.offer);
          if (peerConnection.current.signalingState === "stable") {
            try {
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(message.offer)
              );
              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);
              if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current.send(JSON.stringify({ answer }));
              }
            } catch (error) {
              console.error("❌ Помилка при обробці offer:", error);
            }
          }
        } else if (message.answer) {
          console.log("🎥 Отримано answer:", message.answer);
          if (peerConnection.current.signalingState === "have-local-offer") {
            await peerConnection.current.setRemoteDescription(
              new RTCSessionDescription(message.answer)
            );
          }
        } else if (message.iceCandidate) {
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          if (peerConnection.current.remoteDescription) {
            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(message.iceCandidate)
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
