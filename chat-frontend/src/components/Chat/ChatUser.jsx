function ChatUser({ chats, onSelectChat }) {
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
            {chats.map((chat) => {
              return (
                <li
                  key={chat.user.id}
                  className="list-group-item bg-dark text-white d-flex align-items-center border-0 border-bottom"
                  role="button"
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="flex-grow-1">
                    <div className="fw-bold">
                      {chat.user.username + " "}
                      <span
                        className={`rounded-circle me-2 online-dot bg-success`}
                      ></span>
                    </div>
                  </div>
                  {/* <span className="badge text-bg-primary rounded-pill">2</span> */}
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
