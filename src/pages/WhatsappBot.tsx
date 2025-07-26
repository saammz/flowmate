import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const WhatsAppBotClient = () => {
  const [status, setStatus] = useState({ text: '🔄 Connecting to server...', className: 'connecting' });
  const [messages, setMessages] = useState([]);
  const [instructions, setInstructions] = useState(['Connecting to server...']);
  const [qrCode, setQrCode] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    socketId: null,
    botConnected: false,
    botNumber: null,
    activeConnections: 0,
    qrAvailable: false
  });

  const socketRef = useRef(null);

  const SERVER_URL = "http://3.84.52.42";

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SERVER_URL);
    const socket = socketRef.current;

    // Debug all events
    socket.onAny((event, ...args) => {
      console.log(`🔔 Event received: ${event}`, args);
      addMessage(`🔔 Event: ${event}`, 'info');
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
      setDebugInfo(prev => ({ ...prev, socketId: socket.id }));
      setStatus({ text: "✅ Connected: " + socket.id, className: 'connected' });
      addMessage("✅ Connected to WebSocket server", 'success');
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      setStatus({ text: "❌ Connection Error: " + error.message, className: 'disconnected' });
      addMessage("❌ Connection Error: " + error.message, 'error');
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      setStatus({ text: "❌ Disconnected: " + reason, className: 'disconnected' });
      addMessage("❌ Disconnected: " + reason, 'error');
    });

    // Server messages
    socket.on("message", (msg) => {
      console.log("📨 Server message:", msg);
      addMessage("📨 Server: " + msg, 'info');
    });

    // Enhanced pong with bot status
    socket.on("pong", (data) => {
      console.log("🏓 Pong received:", data);
      if (typeof data === 'object' && data.botStatus) {
        setDebugInfo(prev => ({
          ...prev,
          botConnected: data.botStatus.connected,
          botNumber: data.botStatus.botNumber,
          activeConnections: data.botStatus.activeConnections
        }));
        addMessage(`🏓 Pong: Bot ${data.botStatus.connected ? 'Connected' : 'Disconnected'} | Connections: ${data.botStatus.activeConnections} | Number: ${data.botStatus.botNumber || 'N/A'}`, 'success');
      } else {
        addMessage("🏓 Pong received", 'success');
      }
    });

    // Bot status events
    socket.on("bot:status", (status) => {
      console.log("🤖 Bot status:", status);
      setDebugInfo(prev => ({
        ...prev,
        botConnected: status.connected,
        botNumber: status.botNumber,
        activeConnections: status.activeConnections
      }));
      addMessage(`🤖 Bot Status: ${status.connected ? 'Connected' : 'Disconnected'} | Active Connections: ${status.activeConnections} | Uptime: ${Math.floor(status.uptime)}s`, 'info');
    });

    // Setup instructions
    socket.on("bot:setup-instructions", (data) => {
      console.log("📋 Setup instructions:", data);
      addMessage(`📋 ${data.message}`, 'info');
      setInstructions(data.instructions);
    });

    // Bot connected
    socket.on("bot:connected", (data) => {
      console.log("✅ Bot connected:", data);
      setDebugInfo(prev => ({
        ...prev,
        botConnected: true,
        botNumber: data.botNumber,
        activeConnections: data.activeConnections
      }));
      addMessage(`✅ ${data.message} | Bot Number: ${data.botNumber} | Active Connections: ${data.activeConnections}`, 'success');
      setInstructions(data.instructions);
    });

    // Main QR code handler
    socket.on("whatsapp:qr", (data) => {
      console.log("📱 QR Code received:", data);
      setDebugInfo(prev => ({ ...prev, qrAvailable: true }));

      if (data && data.qr) {
        displayQRCode(data.qr);
        setInstructions(data.instructions || []);
        addMessage("📱 QR Code received and displayed!", 'success');
      } else {
        addMessage("❌ QR Code data is invalid", 'error');
        console.error("Invalid QR data:", data);
      }
    });

    // Auto-request QR code every 15 seconds if not available
    const autoQRInterval = setInterval(() => {
      if (!debugInfo.qrAvailable && !debugInfo.botConnected) {
        console.log("🔄 Auto-requesting QR code...");
        requestQR();
      }
    }, 15000);

    // Initial status check
    setTimeout(() => checkBotStatus(), 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(autoQRInterval);
      socket.disconnect();
    };
  }, []);

  const addMessage = (text, type = 'info') => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const displayQRCode = (qrData) => {
    console.log("🎨 Displaying QR code, length:", qrData.length);
    console.log("🎨 QR Data content:", qrData);

    try {
      // Check if this is WhatsApp encoded data or regular QR string
      let processedQRData = qrData;

      // If it contains WhatsApp-specific encoded format, we need to handle it differently
      if (qrData.includes('@') && qrData.includes(',') && qrData.includes('=')) {
        console.log("🔍 Detected WhatsApp encoded QR data");
        addMessage("🔍 Detected WhatsApp encoded QR data format", 'info');

        // For WhatsApp Web QR codes, we need to construct the proper format
        // WhatsApp QR codes typically start with specific prefixes
        processedQRData = qrData; // Keep original for now, but could be processed
      }

      // Try multiple QR code generation methods
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&ecc=M&data=${encodeURIComponent(processedQRData)}`;

      // Also try chart.googleapis.com as backup
      const backupQrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(processedQRData)}`;

      setQrCode({
        data: qrData,
        processedData: processedQRData,
        length: qrData.length,
        imageUrl: qrImageUrl,
        backupUrl: backupQrUrl
      });

      console.log('✅ QR Code URLs generated');
      console.log('Primary URL:', qrImageUrl);
      console.log('Backup URL:', backupQrUrl);
      addMessage("✅ QR Code generated successfully", 'success');

    } catch (error) {
      console.error("QR Code display error:", error);
      addMessage("❌ QR Code display error: " + error.message, 'error');

      // Fallback: show QR data as text
      setQrCode({ data: qrData, length: qrData.length, fallback: true });
    }
  };

  const requestQR = async () => {
    addMessage("🔄 Requesting QR code from server...", 'info');
    try {
      const response = await fetch(`${SERVER_URL}/api/qr-code`);
      const data = await response.json();
      console.log("QR API response:", data);

      if (data.success) {
        displayQRCode(data.qr);
        setInstructions(data.instructions);
        addMessage("✅ QR code fetched via API", 'success');
      } else {
        addMessage("❌ " + data.message, 'error');
      }
    } catch (error) {
      console.error("QR API error:", error);
      addMessage("❌ Failed to fetch QR code: " + error.message, 'error');
    }
  };

  const generateQR = async () => {
    addMessage("⚡ Forcing QR code generation...", 'warning');
    try {
      const response = await fetch(`${SERVER_URL}/api/generate-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Generate QR response:", data);

      if (data.success) {
        addMessage(`✅ ${data.message} (Action: ${data.action})`, 'success');
        setTimeout(() => {
          if (!debugInfo.qrAvailable) {
            addMessage("⏳ Waiting for QR code to generate...", 'info');
          }
        }, 3000);
      } else {
        addMessage("❌ " + data.message, 'error');
      }
    } catch (error) {
      console.error("Generate QR error:", error);
      addMessage("❌ Failed to generate QR: " + error.message, 'error');
    }
  };

  const restartBot = async () => {
    if (!window.confirm("⚠️ This will restart the entire WhatsApp bot. Continue?")) {
      return;
    }

    addMessage("🔄 Restarting WhatsApp bot...", 'warning');
    try {
      const response = await fetch(`${SERVER_URL}/api/restart-bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Restart bot response:", data);

      if (data.success) {
        addMessage(`✅ ${data.message}`, 'success');
        setDebugInfo(prev => ({
          ...prev,
          botConnected: false,
          botNumber: null,
          qrAvailable: false
        }));
        setQrCode(null);

        setTimeout(() => {
          addMessage("⏳ Waiting for bot to restart and generate QR...", 'info');
        }, 5000);
      } else {
        addMessage("❌ " + data.message, 'error');
      }
    } catch (error) {
      console.error("Restart bot error:", error);
      addMessage("❌ Failed to restart bot: " + error.message, 'error');
    }
  };

  const checkBotStatus = async () => {
    addMessage("📊 Checking bot status...", 'info');
    try {
      const response = await fetch(`${SERVER_URL}/api/bot-status`);
      const data = await response.json();
      console.log("Bot status API response:", data);

      setDebugInfo(prev => ({
        ...prev,
        botConnected: data.status === 'connected',
        botNumber: data.botNumber,
        activeConnections: data.activeConnections,
        qrAvailable: data.hasQR
      }));
      addMessage(`📊 Bot Status: ${data.status} | QR Available: ${data.hasQR ? 'Yes' : 'No'}`, 'info');
    } catch (error) {
      console.error("Status API error:", error);
      addMessage("❌ Failed to check bot status: " + error.message, 'error');
    }
  };

  const sendPing = () => {
    addMessage("🏓 Sending ping...", 'info');
    socketRef.current?.emit("ping");
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-5">🤖 ProjectBot WebSocket Client - Debug Version</h1>

        {/* Status */}
        <div className={`p-3 mb-3 rounded font-bold ${status.className === 'connected' ? 'bg-green-100 text-green-800' :
            status.className === 'disconnected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
          }`}>
          {status.text}
        </div>

        {/* Debug Controls */}
        <div className="bg-gray-50 p-4 mb-4 rounded border">
          <h3 className="text-lg font-semibold mb-3">🔧 Debug Controls</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={requestQR} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              🔄 Request QR Code
            </button>
            <button onClick={generateQR} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
              ⚡ Force Generate QR
            </button>
            <button onClick={restartBot} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              🔄 Restart Bot
            </button>
            <button onClick={checkBotStatus} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              📊 Check Bot Status
            </button>
            <button onClick={sendPing} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              🏓 Send Ping
            </button>
            <button onClick={clearMessages} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              🗑️ Clear Messages
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="text-center p-5 mb-4 bg-white border-2 border-dashed border-gray-300 rounded">
          <h3 className="text-lg font-semibold mb-3">📱 WhatsApp QR Code</h3>
          {qrCode ? (
            <div className="inline-block">
              {qrCode.imageUrl ? (
                <div>
                  <img
                    src={qrCode.imageUrl}
                    alt="WhatsApp QR Code"
                    className="border border-gray-300 rounded mx-auto mb-2"
                    style={{ width: '300px', height: '300px' }}
                    onError={(e) => {
                      console.log("Primary QR image failed, trying backup");
                      if (qrCode.backupUrl && e.target.src !== qrCode.backupUrl) {
                        e.target.src = qrCode.backupUrl;
                      } else {
                        console.log("Both QR services failed");
                        addMessage("❌ QR image generation failed, showing data as text", 'error');
                        setQrCode(prev => ({ ...prev, fallback: true, imageUrl: null }));
                      }
                    }}
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    <details>
                      <summary className="cursor-pointer hover:text-gray-700">Show QR Data</summary>
                      <div className="mt-2 p-2 bg-gray-100 rounded text-left">
                        <p><strong>Raw Data:</strong></p>
                        <code className="break-all text-xs">{qrCode.data}</code>
                        <p className="mt-2"><strong>Length:</strong> {qrCode.length} characters</p>
                      </div>
                    </details>
                  </div>
                </div>
              ) : qrCode.fallback ? (
                <div>
                  <p className="font-bold mb-2 text-red-600">QR Code Display Failed - Raw Data:</p>
                  <textarea
                    readOnly
                    value={qrCode.data}
                    className="w-full h-32 p-2 border border-gray-300 rounded text-xs font-mono"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Data Length: {qrCode.length} characters
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    ⚠️ This appears to be WhatsApp encoded data. You may need to use the WhatsApp app directly or check your server's QR generation logic.
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <p>QR code will appear here when bot needs authentication</p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold mb-3">📋 Instructions</h3>
          <ul className="list-disc pl-5">
            {instructions.map((instruction, index) => (
              <li key={index} className="mb-2 text-sm">{instruction}</li>
            ))}
          </ul>
        </div>

        {/* Debug Information */}
        <div className="bg-gray-50 p-4 mb-4 rounded border">
          <h3 className="text-lg font-semibold mb-3">🔍 Debug Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><strong>Socket ID:</strong> {debugInfo.socketId || "Not connected"}</p>
            <p><strong>Bot Connected:</strong> {debugInfo.botConnected ? "Yes" : "No"}</p>
            <p><strong>Bot Number:</strong> {debugInfo.botNumber || "Unknown"}</p>
            <p><strong>Active Connections:</strong> {debugInfo.activeConnections}</p>
            <p><strong>QR Available:</strong> {debugInfo.qrAvailable ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Messages */}
        <h3 className="text-lg font-semibold mb-3">📨 Messages & Events</h3>
        <div className="border border-gray-300 h-96 overflow-y-auto p-4 bg-gray-50 rounded">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 bg-white rounded border-l-4 text-sm ${message.type === 'error' ? 'border-red-500 bg-red-50' :
                  message.type === 'success' ? 'border-green-500 bg-green-50' :
                    message.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                }`}
            >
              <strong>{message.timestamp}</strong> - {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBotClient;