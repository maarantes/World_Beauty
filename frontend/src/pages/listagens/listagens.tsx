import React, { useState } from 'react';
import "./listagens.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from '../../components/botaoCTA/botaoCTA';

function PaginaListagens() {

    return (
        <>
        <Navbar />
        <section className="margem">
            <h1 className="dash_titulo">Listagens</h1>

            <div className="list_botao">
                <div>
                <BotaoCTA escrito="Top 10 clientes que mais consumiram em quantidade" aparencia="secundario" />
                </div>
                <div>
                <BotaoCTA escrito="Top 05 clientes que mais consumiram em valor" aparencia="secundario" />
                </div>
                <div>
                 <BotaoCTA escrito="Produtos mais populares" aparencia="secundario" />
                </div>
            </div>

            <div className="list_output">
                <p>OUTPUT</p>
            </div>

            <hr className="list_hr" />

        </section>
        </>
  
  );
}

export default PaginaListagens;