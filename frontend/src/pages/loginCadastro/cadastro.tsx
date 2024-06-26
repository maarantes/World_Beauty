import { useEffect, useState } from "react";
import FormInputEmail from "../../components/formInput/formInputEmail";
import FormInputSenha from "../../components/formInput/formInputSenha";
import "./login_cadastro.scss"
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import axios from "axios";
import { toast } from "react-toastify";
import NotificacaoToast from "../../components/NotificacaoToast/notificacaoToast";

function PaginaCadastro() {

    useEffect(() => {
        document.title = "World Beauty | Cadastro";
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

    const handleCadastro = async (event: any) => {
        event.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/usuario/cadastrar", { email, senha });
    
            const { token } = response.data;
            localStorage.setItem('token', token);
    
            toast.success('Usuário cadastrado com sucesso!');
        } catch (error) {
            toast.warning('O E-mail já está em uso!');
        }
    };
    

    return (
        <>
        <div className="logcad_container_cima">
            <img src="/img/logotipo_wb.svg" />
            <h1>Criar Conta</h1>
        </div>

        <div className="logcad_container_form">
            <form className="logcad_form" onSubmit={handleCadastro}>
                <FormInputEmail onEmailChange={handleEmailChange} />
                <FormInputSenha onSenhaChange={handleSenhaChange} type="extendido"/>
                <div className="logcad_botao">
                    <BotaoCTA type="submit" aparencia="primario" escrito="Cadastrar" />
                </div>
            </form>
            <div className="logcad_convite">
                <p>Já possui uma conta?</p>
                <BotaoCTA link="/" aparencia="secundario" escrito="Login" />
            </div>
        </div>
        
        <NotificacaoToast />
        </>
    )
}

export default PaginaCadastro;