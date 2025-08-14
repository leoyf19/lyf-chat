function IncomingMessage() {
  return (
    <>
      <div className="d-flex mb-3">
        <div
          className="p-2 rounded-3"
          style={{
            backgroundColor: "#2a2f36",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          Hola, ¿cómo estás?
          <div
            className="small text-white-70 mt-1"
            style={{ fontSize: "0.75rem" }}
          >
            10:30 AM
          </div>
        </div>
      </div>
    </>
  );
}
export default IncomingMessage;
