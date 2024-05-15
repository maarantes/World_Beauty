import { useState } from "react";
import "./formInput.css";

function FormInputNome({ onInputChange }: { onInputChange: (value: string) => void }) {
    const [nomeValido, setNomeValido] = useState(false);
    const [nomeFocado, setNomeFocado] = useState(false);
    const [valorInput, setValorInput] = useState(""); 

    const handleInputChange = (event: { target: { value: any; pattern: any; }; }) => {
        const { value, pattern } = event.target;
        const isValid = !!value.match(pattern);
        setNomeValido(isValid);
        setValorInput(value);
        onInputChange(value); // Chama a função de retorno com o valor do input
    };
    
    const handleInputBlur = () => {
        setNomeFocado(true);
    };

    return (
        <div className="form_item">
            <div className="form_item_cima">
                <img src="img/form_nome.svg" alt="" />
                <label className="form_label" htmlFor="nome">Nome Completo</label>
            </div>
            <input 
                className={`form_input ${nomeValido ? 'valid' : (!nomeValido && nomeFocado) ? 'invalid' : ''}`}
                type="text"
                id="nome"
                name="nome"
                placeholder="Até 100 caracteres"
                maxLength={100} 
                required
                pattern="^[a-zA-Z\s]*$"
                value={valorInput}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={() => setNomeFocado(false)}
            />
            {!nomeValido && nomeFocado && <p className="form_mensagem_erro">Verifique o formato exigido</p>}
        </div>
    );
}

export default FormInputNome;
