import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "Exemplo 1", label: "Exemplo 1" },
  { value: "Exemplo 2", label: "Exemplo 2" },
  { value: "Exemplo 3", label: "Exemplo 3" },
  { value: "Exemplo 4", label: "Exemplo 4" }
];

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    width: 320
  }),
};

function SelectAdicionarProd() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
    />
  );
}

export default SelectAdicionarProd;
