import { useState } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

function Chat({ chatSelected, onBack, usernameLogged }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: usernameLogged,
        receiver: chatSelected.user.username,
        timestamp: new Date().toISOString(),
      };

      setMessage("");
    }
  };

  return (
    <>
      {chatSelected ? (
        <div className="d-flex flex-column p-3" style={{ height: "100%" }}>
          {/* Contenedor de mensajes */}
          <div className="px-3 bg-dark text-white flex-grow-1">
            <div>
              <header className="sticky-top bg-dark text-white py-3 px-2 d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
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
              {chatSelected.messages.map((chat) => {
                return (
                  <>
                    <IncomingMessage />
                    <OutgoingMessage />
                  </>
                );
              })}
              {/* <IncomingMessage />

              <OutgoingMessage />

              <OutgoingMessage />

              <OutgoingMessage />

              <OutgoingMessage />

              <OutgoingMessage /> */}
            </div>

            {/* Input para enviar mensajes */}
            <div className="bg-dark p-2 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
