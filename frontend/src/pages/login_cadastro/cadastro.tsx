import { useEffect, useState } from "react";
import FormInputEmail from "../../components/formInput/formInputEmail";
import FormInputSenha from "../../components/formInput/formInputSenha";
import "./login_cadastro.scss"
import BotaoCTA from "../../components/botaoCTA/botaoCTA";


function PaginaCadastro() {

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

    return (
        <>
        <div className="logcad_container_cima">
            <img src="/img/nav_placeholder.png" />
            <h1>Criar Conta</h1>
        </div>

        <div className="logcad_container_form">
            <form className="logcad_form">
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
        </>
    )
}

export default PaginaCadastro;