import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormInputEmail from "../../components/formInput/formInputEmail";
import FormInputSenha from "../../components/formInput/formInputSenha";
import "./login_cadastro.scss"
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NotificacaoToast from "../../components/NotificacaoToast/notificacaoToast";


function PaginaLogin() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "World Beauty | Login";
    }, []);

    // Renderizar pág. a partir do topo ao ser carregada
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    // Pegar e guardar informações dos Inputs
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
    const handleSenhaChange = (value: string) => {
        setSenha(value);
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/usuario/login", { email, senha });
    
            const { token } = response.data;
            localStorage.setItem("token", token);
    
            navigate("/clientes");
        } catch (error) {
            toast.warning("Credenciais incorretas!");
        }
    };

    return (
        <>
        <div className="logcad_container_cima">
            <img src="/img/logotipo_wb.svg" />
            <h1>Fazer Login</h1>
        </div>

        <div className="logcad_container_form">
            <form className="logcad_form" onSubmit={handleLogin}>
                <FormInputEmail onEmailChange={handleEmailChange} />
                <FormInputSenha onSenhaChange={handleSenhaChange} type="normal"/>
                <div className="logcad_botao">
                    <BotaoCTA type="submit" aparencia="primario" escrito="Login" />
                </div>
            </form>
            <div className="logcad_convite">
                <p>Ainda não possui uma conta?</p>
                <BotaoCTA link="/cadastro" aparencia="secundario" escrito="Cadastre-se" />
            </div>
        </div>
        
        <NotificacaoToast />

        </>
    )
}

export default PaginaLogin;