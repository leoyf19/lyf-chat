import { format } from "date-fns";
import { es } from "date-fns/locale";

function OutgoingMessage({ content, date }) {
  const formattedDate = date
    ? format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es })
    : "";

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
          {content}
          <div
            className="small text-white-70 mt-1"
            style={{ fontSize: "0.75rem" }}
          >
            {formattedDate}
          </div>
        </div>
      </div>
    </>
  );
}

export default OutgoingMessage;
