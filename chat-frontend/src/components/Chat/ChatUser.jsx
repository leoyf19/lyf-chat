function ChatUser({ chats, onSelectChat, usernameLogged }) {
  return (
    <>
      <div className="px-3 bg-dark text-white">
        <div className="sticky-top bg-dark pt-3">
          <h4>Chats</h4>
          <hr className="mb-3" />
        </div>

        {!chats.length ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <span className="text-secondary">No hay chats iniciados</span>
          </div>
        ) : (
          <ul
            className="list-group list-group-flush overflow-auto scroll-styled"
            style={{ height: "20em" }}
          >
            {chats.map((chat, index) => {
              return (
                <li
                  key={chat.user.id}
                  className="list-group-item bg-dark text-white d-flex align-items-center border-0 border-bottom"
                  role="button"
                  onClick={() => onSelectChat(index)}
                >
                  <div className="flex-grow-1">
                    <div className="fw-bold">{chat.user.username}</div>
                  </div>
                  {chat.messages.filter(
                    (m) => !m.view && m.from !== usernameLogged
                  ).length > 0 && (
                    <span className="badge text-bg-primary rounded-pill">
                      {chat.messages.filter((m) => !m.view).length}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default ChatUser;
