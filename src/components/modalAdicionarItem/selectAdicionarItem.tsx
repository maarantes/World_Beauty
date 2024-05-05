import React, { useState } from "react";
import Select from "react-select";

interface SelectProps {
  tipo: string;
}

const opcoesProd = [
  { value: "Exemplo 1", label: "Exemplo 1" },
  { value: "Exemplo 2", label: "Exemplo 2" },
  { value: "Exemplo 3", label: "Exemplo 3" },
  { value: "Exemplo 4", label: "Exemplo 4" }
];

const opcoesServ = [
  { value: "Exemplo 5", label: "Exemplo 5" },
  { value: "Exemplo 6", label: "Exemplo 6" },
  { value: "Exemplo 7", label: "Exemplo 7" },
  { value: "Exemplo 8", label: "Exemplo 8" }
];

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    width: 320
  }),
};

function SelectAdicionarItem({ tipo }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option: any) => {
    setSelectedOption(option);
  };

  // Se o tipo invocado não for Produto sempre vai ser Serviço
  const options = tipo === "produto" ? opcoesProd : opcoesServ;

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Pesquisar"
      styles={customStyles}
    />
  );
}

export default SelectAdicionarItem;