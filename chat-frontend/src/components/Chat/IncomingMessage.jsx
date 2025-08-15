import { format } from "date-fns";
import { es } from "date-fns/locale";

function IncomingMessage({ content, date }) {
  // Convertir y formatear la fecha
  const fechaFormateada = format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es });

  return (
    <div className="d-flex mb-3">
      <div
        className="p-2 rounded-3"
        style={{
          backgroundColor: "#2a2f36",
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        {content}
        <div
          className="small text-white-70 mt-1"
          style={{ fontSize: "0.75rem" }}
        >
          {fechaFormateada}
        </div>
      </div>
    </div>
  );
}

export default IncomingMessage;
