import React, { useEffect, useState } from "react";
import OnlineUser from "../components/Chat/OnlineUser";
import Chat from "../components/Chat/Chat";
import ChatUser from "../components/Chat/ChatUser";
import Header from "../components/Chat/Header";
import { io } from "socket.io-client";

let socket;
function ChatPage({ username, onLoggout }) {
  const [online, setOnline] = useState(false);

  const [users, setUsers] = useState([]);

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const [chatSelected, setChatSelected] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:3000", {
      auth: {
        username,
      },
    }); // Se conecta solo una vez

    // Evento al conectar
    socket.on("connect", () => {
      setOnline(true);
    });

    // Evento al desconectar
    socket.on("disconnect", () => {
      setOnline(false);
    });

    socket.on("users-connect", (data) => {
      setUsers(data);
    });

    return () => {
      socket.disconnect(); // Limpia al desmontar
    };
  }, []);

  // Seleccionar un chat en especifico
  const selectChat = (chat) => {
    setChatSelected(chat);
  };

  const back = () => {
    setChatSelected(null);
  };

  //Crear un chat al tocar un usuario activo
  const createChat = (user) => {
    if (
      chats.some((chat) => chat.user.username === user.username) ||
      user.username === username
    ) {
      return false;
    }

    setChats((prevChats) => [
      ...prevChats,
      {
        user,
        messages: [],
      },
    ]);
  };

  const sendMessage = () => {};

  return (
    <div className="container">
      <div className="row justify-content-center py-3 gap-3">
        <div className="col-11 bg-dark text-white d-flex align-items-center justify-content-between p-3 shadow-sm rounded-5 border border-dark">
          <Header username={username} online={online} onLoggout={onLoggout} />
        </div>
        <div className="col-2 border rounded-4 bg-dark border-dark">
          <OnlineUser
            users={users}
            onCreateChat={createChat}
            usernameLogged={username}
          />
        </div>
        <div className="col-4 border rounded-4 bg-dark border-dark">
          <ChatUser chats={chats} onSelectChat={selectChat} />
        </div>
        <div className="col-4 border rounded-4 bg-dark border-dark">
          <Chat
            chatSelected={chatSelected}
            onBack={back}
            usernameLogged={username}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
