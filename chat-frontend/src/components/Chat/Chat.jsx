import { useEffect, useState } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

function Chat({
  index,
  chatSelected,
  usernameLogged,
  isTyping,
  onBack,
  onSendMessage,
  onUpdateView,
  onHandleTyping,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (index !== null && chatSelected?.messages?.length > 0) {
      const updatedMessages = chatSelected.messages.map((m) => ({
        ...m,
        view: true,
      }));

      const hasUnseen = chatSelected.messages.some((m) => !m.view);
      if (!hasUnseen) return;

      onUpdateView(chatSelected.user.username, updatedMessages);
    }
  }, [index, chatSelected, onUpdateView]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        content: message,
        from: usernameLogged,
        to: chatSelected.user.username,
        timestamp: new Date().toISOString(),
        view: false,
      };

      onSendMessage(newMessage);

      setMessage("");
    }
  };

  const handleTyping = () => {
    onHandleTyping();
  };

  return (
    <>
      {index !== null ? (
        <div className="d-flex flex-column p-3" style={{ height: "100%" }}>
          <div className="px-3 bg-dark text-white flex-grow-1">
            <div>
              <header className="sticky-top bg-dark text-white py-3 px-2 d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  aria-label="Volver"
                  onClick={() => onBack()}
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>

                <h4 className="mb-0 flex-grow-1">
                  {chatSelected.user.username}
                </h4>
              </header>
              <hr className="mb-3" />
            </div>

            <div
              style={{ height: "20em" }}
              className="overflow-auto scroll-styled p-2"
            >
              {chatSelected.messages.map((message, index) => {
                return (
                  <>
                    {message.from === usernameLogged ? (
                      <OutgoingMessage
                        key={index}
                        content={message.content}
                        date={message.timestamp}
                      />
                    ) : (
                      <IncomingMessage
                        key={index}
                        content={message.content}
                        date={message.timestamp}
                      />
                    )}
                  </>
                );
              })}
            </div>

            <div className="bg-dark p-2 border-top">
              {isTyping && (
                <div className="typing-indicator">Escribiendo...</div>
              )}
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleTyping}
                  style={{ borderRadius: "20px 0 0 20px" }}
                />
                <button
                  className="btn btn-primary px-4"
                  style={{ borderRadius: "0 20px 20px 0" }}
                  onClick={() => sendMessage()}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <span className="text-secondary">No hay chat seleccionado</span>
        </div>
      )}
    </>
  );
}

export default Chat;
