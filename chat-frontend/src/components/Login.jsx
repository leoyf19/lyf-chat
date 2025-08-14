function Login({ join, setUsername }) {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border border-0 rounded p-5 bg-dark text-light">
        <div className="row text-center gap-3">
          <div className="col-12">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Jhon Doe"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={join}
            >
              Unirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
