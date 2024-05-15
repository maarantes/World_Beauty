import { useState } from "react";
import "./formInput.css";

interface FormInputEmailProps {
  onEmailChange: (email: string) => void; // Função para passar o valor do e-mail para fora do componente
}

function FormInputEmail({ onEmailChange }: FormInputEmailProps) {
  const [emailValido, setEmailValido] = useState(false);
  const [emailFocado, setEmailFocado] = useState(false);
  const [email, setEmail] = useState(""); // Estado para guardar o valor do e-mail

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, pattern } = event.target;
    const isValid = !!value.match(pattern);
    setEmailValido(isValid);
    setEmail(value); // Atualiza o valor do e-mail no estado
    onEmailChange(value); // Passa o valor do e-mail para fora do componente
  };

  const handleInputBlur = () => {
    setEmailFocado(true);
  };

  return (
    <div className="form_item">
      <div className="form_item_cima">
        <img src="img/form_email.svg" alt="" />
        <label className="form_label" htmlFor="email">
          E-Mail
        </label>
      </div>
      <input
        className={`form_input ${
          emailValido ? "valid" : !emailValido && emailFocado ? "invalid" : ""
        }`}
        type="text"
        id="email"
        name="email"
        placeholder="Formato: usuario@email.com"
        maxLength={50}
        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        required
        value={email} // Define o valor do input como o estado 'email'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => setEmailFocado(false)}
      />
      {!emailValido && emailFocado && (
        <p className="form_mensagem_erro">Verifique o formato exigido</p>
      )}
    </div>
  );
}

export default FormInputEmail;
