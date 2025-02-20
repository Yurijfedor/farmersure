import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Ініціалізація WebSocket
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    socket.current = new WebSocket(`${protocol}://192.168.0.103:8080`);

    socket.current.onopen = () => {
      console.log("✅ WebSocket підключено");
      setSocketConnected(true);
    };

    socket.current.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message);

        if (message.offer) {
          // Отримання offer та створення answer
          console.log("🎥 Отримано offer:", message.offer);
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.current.send(JSON.stringify({ answer }));
        } else if (message.answer) {
          // Отримання answer
          console.log("🎥 Отримано answer:", message.answer);
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
        } else if (message.iceCandidate) {
          // Отримання iceCandidate
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(message.iceCandidate)
          );
        } else {
          console.warn("⚠️ Невідоме повідомлення:", message);
        }
      } catch (error) {
        console.error(
          "❌ Помилка при парсингу повідомлення від сервера:",
          error
        );
      }
    };

    socket.current.onerror = (err) => {
      console.error("❌ Помилка WebSocket:", err);
    };

    socket.current.onclose = () => {
      console.log("⚠️ WebSocket з'єднання закрито");
      setSocketConnected(false); // Якщо WebSocket закрито, змінюємо стан
    };

    // Очищення при демонтованому компоненті
    return () => {
      if (socket.current) {
        socket.current.close();
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []); // Ініціалізація WebSocket виконується лише один раз

  useEffect(() => {
    if (socketConnected) {
      // Ініціалізація WebRTC при підключенні WebSocket
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // Надсилаємо offer при підключенні WebSocket
      const sendOffer = async () => {
        try {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.current.send(JSON.stringify({ offer }));
          console.log("🎥 Надсилаємо новий offer:", offer);
        } catch (error) {
          console.error("❌ Помилка при створенні offer:", error);
        }
      };

      sendOffer();

      peerConnection.current.ontrack = (event) => {
        if (event.streams && event.streams[0] && videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        } else {
          console.warn("❗ Потік не знайдений");
        }
      };

      // Очищення при закритті з'єднання
      return () => {
        if (peerConnection.current) {
          peerConnection.current.close();
        }
      };
    }
  }, [socketConnected]); // Перезапуск WebRTC тільки після підключення WebSocket

  return <video ref={videoRef} autoPlay playsInline />;
};
