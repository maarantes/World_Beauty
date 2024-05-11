import React, { useState, useContext } from "react";
import Select from "react-select";
import { ProdutoContext } from '../../contexts/produtoProvider';
import { ServicoContext } from '../../contexts/servicoProvider';

import { OpcaoProps } from "./modalAdicionarItem";

interface SelectProps {
  tipo: string;
  setSelectedOption: (option: OpcaoProps | null) => void;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    width: 320
  }),
};

function SelectAdicionarItem({ tipo, setSelectedOption }: SelectProps) {
  
  const { produtos } = useContext(ProdutoContext);
  const { Servicos } = useContext(ServicoContext);

  const handleChange = (option: any) => {
    setSelectedOption(option);
  };

  // Mapeia os produtos e os serviços para o formato esperado pelo Select
  const opcoesProd = produtos.map(produto => ({ value: produto.ID, label: produto.Nome }));
  const opcoesServ = Servicos.map(servico => ({ value: servico.ID, label: servico.Nome }));

  // Se o tipo invocado não for Produto sempre vai ser Serviço
  const options = tipo === "produto" ? opcoesProd : opcoesServ;

  return (
    <Select
      onChange={handleChange}
      options={options}
      placeholder="Pesquisar"
      styles={customStyles}
    />
  );
}

export default SelectAdicionarItem;
