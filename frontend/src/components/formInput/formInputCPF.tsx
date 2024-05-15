import { useState } from "react";
import "./formInput.css"


interface FormInputCPFProps {
    onCpfChange: (cpf: string) => void;
  }


function FormInputCPF({ onCpfChange }: FormInputCPFProps) {

    const [cpfValido, setCpfValido] = useState(false);
    const [cpfFocado, setCpfFocado] = useState(false);

    //Formata o CPF automaticamente para o usuário

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = event.target;
		value = value.replace(/\D/g, ""); 
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
		value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
		event.target.value = value;
		const isValid = !!value.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/); // Verifica se o formato é válido
		setCpfValido(isValid);
		onCpfChange(value);
	};
	
    
    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setCpfFocado(true);
    };
  
    return (
    
    <div className="form_item">
        <div className="form_item_cima">
            <img src="img/form_cpf.svg" alt="" />
            <label className="form_label" htmlFor="cpf">CPF</label>
        </div>
    <input 
    className={`form_input ${cpfValido ? 'valid' : (!cpfValido && cpfFocado) ? 'invalid' : ''}`}
    type="text"
    id="cpf"
    name="cpf"
    placeholder="Formato: 000.000.000-00"
    maxLength={13} 
    pattern="\d{5}-\d{4}\.\d{2}" 
    required 
    onChange={handleInputChange}
    onBlur={handleInputBlur}
    onFocus={() => setCpfFocado(false)}
    />
        {!cpfValido && cpfFocado && <p className="form_mensagem_erro">Verifique o formato exigido</p>}
    
    </div>
  );
}

export default FormInputCPF;
