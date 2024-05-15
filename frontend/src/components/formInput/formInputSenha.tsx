import { useState } from "react";
import "./formInput.css";

interface FormInputSenhaProps {
  type: "normal" | "extendido"; // Caso o tipo for "extendido" o componente mostrará instruções de criação de senha
  onSenhaChange: (senha: string) => void; // Função para passar o valor da senha para fora do componente
}

function FormInputSenha({ type, onSenhaChange }: FormInputSenhaProps) {
  const [senhaValido, setSenhaValido] = useState(false);
  const [senhaFocado, setSenhaFocado] = useState(false);
  const [revelaSenha, setRevelaSenha] = useState(false);
  const [senhaOlho, setSenhaOlho] = useState("img/form_olho_ativar.svg");
  const [senha, setSenha] = useState(""); // Estado para guardar o valor da senha

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, pattern } = event.target;
    const isValid = !!value.match(pattern);
    setSenhaValido(isValid);
    setSenha(value); // Atualiza o valor da senha no estado
    onSenhaChange(value); // Passa o valor da senha para fora do componente
  };

  const handleInputBlur = () => {
    setSenhaFocado(true);
  };

  return (
    <div className="form_item">
      <div className="form_item_cima">
        <img src="img/form_senha.svg" alt="" />
        <label className="form_label" htmlFor="senha">
          Senha
        </label>
      </div>
      <div className="form_item_baixo">
        <input
          className={`form_input ${senhaValido ? "valid" : ""} ${
            !senhaValido && senhaFocado ? "invalid" : ""
          }`}
          type={revelaSenha ? "text" : "password"}
          id="senha"
          name="senha"
          maxLength={50}
          pattern="(?=.*\d)(?=.*[\W])(?=.*[A-Z]).{8,}"
          // Muda o escrito do placeholder dependendo do tipo do input de senha
          placeholder={
            type === "normal"
              ? "Insira sua senha aqui..."
              : "Siga as instruções abaixo:"
          }
          required
          value={senha} // Define o valor do input como o estado 'senha'
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setSenhaFocado(false)}
        />
        <button
          className="form_botao_revelar"
          type="button"
          onClick={() => {
            setRevelaSenha(!revelaSenha);
            setSenhaOlho(
              senhaOlho === "img/form_olho_ativar.svg"
                ? "img/form_olho_desativar.svg"
                : "img/form_olho_ativar.svg"
            );
          }}
        >
          <img src={senhaOlho} alt="" />
        </button>
      </div>
      {!senhaValido && senhaFocado && (
        <p className="form_mensagem_erro">Verifique o formato exigido</p>
      )}

      {type === "extendido" && (
        <div className="form_input_senha_baixo">
          <p className="form_input_senha_baixo_titulo">
            Sua senha deve conter no mínimo:
          </p>
          <p>• Entre 8 e 50 caracteres</p>
          <p>• 01 letra maiúscula</p>
          <p>• 01 número</p>
          <p>• 01 caractere especial</p>
        </div>
      )}
    </div>
  );
}

export default FormInputSenha;
