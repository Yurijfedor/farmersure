import { useEffect, useRef, useState } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Ініціалізація WebRTC і WebSocket
    const initializeWebRTC = () => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // Встановлення обробників для iceCandidate
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("🧊 Надсилаємо iceCandidate", event.candidate);
          socket.send(JSON.stringify({ iceCandidate: event.candidate }));
        }
      };

      // Обробник для отримання відео потоку
      peerConnection.ontrack = (event) => {
        if (event.streams && event.streams[0] && videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        } else {
          console.warn("❗ Потік не знайдений");
        }
      };

      return peerConnection;
    };

    const socket = new WebSocket(
      `${
        window.location.protocol === "https:" ? "wss" : "ws"
      }://192.168.0.103:8080`
    );

    // Логування WebSocket
    socket.onopen = () => {
      console.log("✅ WebSocket підключено");
      setSocketConnected(true);
    };

    socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message);

        if (message.offer) {
          console.log("🎥 Отримано offer:", message.offer);
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.send(JSON.stringify({ answer }));
        } else if (message.answer) {
          console.log("🎥 Отримано answer:", message.answer);
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
        } else if (message.iceCandidate) {
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          await peerConnection.addIceCandidate(
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

    socket.onerror = (err) => {
      console.error("❌ Помилка WebSocket:", err);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket з'єднання закрито");
      setSocketConnected(false);
    };

    const peerConnectionInstance = initializeWebRTC();
    setPeerConnection(peerConnectionInstance);
    setSocket(socket);

    return () => {
      peerConnectionInstance.close(); // Закриваємо peerConnection
      socket.close(); // Закриваємо WebSocket
    };
  }, [peerConnection]);

  useEffect(() => {
    if (socketConnected && peerConnection) {
      const sendOffer = async () => {
        try {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket.send(
            JSON.stringify({ offer: peerConnection.localDescription })
          );
          console.log("🎥 Надсилаємо новий offer:", offer);
        } catch (error) {
          console.error("❌ Помилка при створенні offer:", error);
        }
      };

      // Надсилаємо новий offer при відновленні з'єднання
      sendOffer();
    }
  }, [socketConnected, peerConnection, socket]);

  return <video ref={videoRef} autoPlay playsInline />;
};
