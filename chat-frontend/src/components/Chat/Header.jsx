import "./css/Header.css";
function Header({ username, onLoggout, online }) {
  return (
    <>
      <div className="d-flex align-items-center">
        <h1 className="h4 mb-0 me-3 fw-bold">{username}</h1>
        <span
          className={`rounded-circle me-2 online-dot ${
            online ? "bg-success" : "bg-danger"
          }`}
        ></span>

        <small
          className={`fw-semibold ${online ? "text-success" : "text-danger"}`}
        >
          {online ? "Online" : "Offline"}
        </small>
      </div>

      <button
        className="btn btn-sm btn-outline-light border-0"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
        }}
        title="Cerrar sesión"
        onClick={onLoggout}
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </>
  );
}

export default Header;
