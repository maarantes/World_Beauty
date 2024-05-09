import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notificacaoToast.scss"

function NotificacaoToast() {
  
  return (
    <ToastContainer 
    position="top-center"
    pauseOnHover={false}
    className="toast_maior"
    />
  );
}


export default NotificacaoToast;
