function OnlineUser({ users, onCreateChat, usernameLogged }) {
  return (
    <>
      <div className="px-3 bg-dark text-white">
        <div className="sticky-top bg-dark pt-3">
          <h4>Usuarios Activos</h4>
          <hr className="mb-3" />
        </div>

        {!users.length ? (
          <div className="d-flex justify-content-center align-items-center">
            <span className="text-white">No hay usuarios conectados</span>
          </div>
        ) : (
          <ul
            className="overflow-auto scroll-styled"
            style={{ height: "20em" }}
          >
            {users.map((user) => {
              return (
                <li
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => onCreateChat(user)}
                >
                  {user.username}{" "}
                  {user.username === usernameLogged ? " (Tu) " : ""}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default OnlineUser;
