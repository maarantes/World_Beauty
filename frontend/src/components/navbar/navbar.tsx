import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss"
import BotaoCTA from "../botaoCTA/botaoCTA";

function Navbar () {

    const [menuAberto, setMenuAberto] = useState(false);

    const location = useLocation();

    return (
        <>
        <nav className="navbar margem">
        <img src="img/nav_placeholder.png" />
        <img className="navbar_hamburguer" src="img/nav_menu.png" onClick={() => setMenuAberto(!menuAberto)} />
        <div className={`navbar_menu ${menuAberto ? 'aberto' : ''}`}>
            <Link to="/clientes" className={`navbar_menu_item ${location.pathname === "/clientes" ? "active" : ""}`}>Clientes</Link>
            <Link to="/produtos" className={`navbar_menu_item ${location.pathname === "/produtos" ? "active" : ""}`}>Produtos</Link>
            <Link to="/servicos" className={`navbar_menu_item ${location.pathname === "/servicos" ? "active" : ""}`}>Serviços</Link>
            <Link to="/listagens" className={`navbar_menu_item ${location.pathname === "/listagens" ? "active" : ""}`}>Listagens</Link>
            <div className="navbar_botao_hamburguer">
                <BotaoCTA escrito="Sair" aparencia="primario" />
            </div>
        </div>
        <div className="navbar_botao">
            <BotaoCTA escrito="Sair" aparencia="primario" />
        </div>

    </nav>

    <hr className="divisoria_navbar"></hr>
    </>
    );
}

export default Navbar;