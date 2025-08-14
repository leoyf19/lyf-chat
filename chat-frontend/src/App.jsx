// export default App;
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import ChatPage from "./pages/ChatPage";
import "./App.css";

function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const [joined, setJoined] = useState(() => {
    return !!localStorage.getItem("username");
  });

  const join = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      setJoined(true);
    }
  };

  const loggout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("chats");
    setJoined(false);
  };

  return (
    <>
      {!joined ? (
        <Login join={join} setUsername={setUsername} />
      ) : (
        <ChatPage username={username} onLoggout={loggout} />
      )}
    </>
  );
}

export default App;
