import React, { useEffect, useRef, useState } from "react";
import OnlineUser from "../components/Chat/OnlineUser";
import Chat from "../components/Chat/Chat";
import ChatUser from "../components/Chat/ChatUser";
import Header from "../components/Chat/Header";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

let socket;
function ChatPage({ username, onLoggout }) {
  const [online, setOnline] = useState(false);

  const [users, setUsers] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [indexChatSelected, setIndexChatSelected] = useState(null);

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
      auth: {
        username,
      },
    });

    socket.on("already_connect", (err) => {
      console.error("Error de conexión:", err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
      onLoggout();
    });

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

    socket.on("new-message", ({ message, from }) => {
      setChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex(
          (chat) => chat.user.username === from
        );

        if (existingChatIndex !== -1) {
          const updatedChats = [...prevChats];
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            messages: [...updatedChats[existingChatIndex].messages, message],
          };
          return updatedChats;
        } else {
          return [
            ...prevChats,
            {
              user: {
                username: from,
              },
              messages: [message],
            },
          ];
        }
      });
    });

    socket.on("typing", (data) => {
      const existingChatIndex = chats.findIndex(
        (chat) => chat.user.username === data.from
      );

      if (existingChatIndex !== -1) {
        if (data.from === chats[existingChatIndex].user.username) {
          setIsTyping(true);

          setTimeout(() => setIsTyping(false), 1000);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const selectChat = (index) => {
    setIndexChatSelected(index);
  };

  const back = () => {
    setIndexChatSelected(null);
  };

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

  const sendMessage = (msg) => {
    socket.emit("send-message", {
      roomId: msg.to,
      from: username,
      message: msg,
    });

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.user.username === msg.to
          ? {
              ...chat,
              messages: [...chat.messages, msg],
            }
          : chat
      )
    );
  };

  const updateView = (usernameToUpdate, updatedMessages) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.user.username === usernameToUpdate
          ? { ...chat, messages: updatedMessages }
          : chat
      )
    );
  };

  const handleTyping = () => {
    socket.emit("typing", {
      to: chats[indexChatSelected].user.username,
      from: username,
    });
  };

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
          <ChatUser
            chats={chats}
            onSelectChat={selectChat}
            usernameLogged={username}
          />
        </div>
        <div className="col-4 border rounded-4 bg-dark border-dark">
          <Chat
            index={indexChatSelected}
            chatSelected={chats[indexChatSelected]}
            usernameLogged={username}
            isTyping={isTyping}
            onBack={back}
            onSendMessage={sendMessage}
            onUpdateView={updateView}
            onHandleTyping={handleTyping}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
