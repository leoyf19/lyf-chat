function OutgoingMessage() {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <div
          className="p-2 rounded-3 text-white"
          style={{
            backgroundColor: "#0d6efd",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          Bien, ¿y tú?
          <div
            className="small text-white-70 mt-1"
            style={{ fontSize: "0.75rem" }}
          >
            10:31 AM
          </div>
        </div>
      </div>
    </>
  );
}

export default OutgoingMessage;
