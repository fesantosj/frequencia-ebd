import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "./theme/colors";

//* Geral
export const StyledView = styled.div`
  display: flex;
  background-color: ${colors.background};
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
`;

export const Icone = styled(FontAwesomeIcon).attrs((props: any) => ({
  color: props.color || "#000000",
  size: props.size || "2x",
}))``;

//* Home
export const TituloHome = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 5px;
  text-align: center;
  color: #026bdb;
  text-shadow: 1px 1px 2px #aaa;
`;

export const SubtituloHome = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 12px;
  width: 90%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const Card = styled.button`
  width: 45%;
  height: 150px;
  background-color: #fff;
  margin-bottom: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.2px solid ${colors.primary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconeCardButton = styled(FontAwesomeIcon).attrs({
  size: "3x",
})`
  color: ${colors.primary};
`;

export const TextoCard = styled.span`
  font-size: 18px;
  color: ${colors.primary};
  margin-top: 10px;
`;

//* Form

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 30px 0;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding: 0 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  font-size: 18px;
  border: 1px solid #ddd;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const SubmitButton = styled.button`
  width: 80%;
  height: 60px;
  border-radius: 20px;
  background-color: #026bdb;
  align-self: center;
  justify-content: center;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0256b8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const TextSubmitButton = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`;

//* Select (equivalente ao Picker do React Native)
export const Select = styled.select`
  background-color: #fff;
  height: 50px;
  font-size: 18px;
  padding: 0 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;
