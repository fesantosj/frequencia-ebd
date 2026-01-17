import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ItemListagemProps {
  descricao: string;
  graphicItem?: React.ReactNode;
  aoEditar: () => void;
  aoDeletar: () => void;
}

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin: 6px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemContent = styled.div`
  flex: 1;
`;

const Nome = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ItemListagem: React.FC<ItemListagemProps> = ({
  descricao,
  graphicItem,
  aoEditar,
  aoDeletar,
}) => {
  return (
    <Item>
      {graphicItem && <Avatar>{graphicItem}</Avatar>}
      <ItemContent>
        <Nome>{descricao}</Nome>
      </ItemContent>
      <ItemActions>
        <ActionButton onClick={aoEditar} title="Editar">
          <FontAwesomeIcon icon={faEdit} size="lg" color="gray" />
        </ActionButton>
        <ActionButton onClick={aoDeletar} title="Deletar">
          <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
        </ActionButton>
      </ItemActions>
    </Item>
  );
};

export default ItemListagem;
