import styled from "styled-components";
import { cardAnimation } from "../../styles/Global.styled";
import themes from "../../styles/theme";

export const StyledCards = styled.div`
  width: 100%;
  display: block;
  position: relative;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    overflow-y: auto;
  }
`;

export const StyledCardItem = styled.div`
  padding: 5px;
  animation: ${cardAnimation} 500ms linear;
`;

export const StyledCard = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${themes.background.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
    background-color: ${themes.background.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }
`;

export const StyledCardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) =>
    themes.card[props.theme]?.background || "#ffffff"};
  color: ${(props) => themes.card[props.theme]?.color || "#000000"};

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const StyledCardBtn = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${themes.text.secondary};
  }
`;

export const StyledCardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${themes.text.primary};
  margin-bottom: 10px;
`;

export const StyledCardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${themes.text.secondary};
    letter-spacing: 0.2px;
  }
`;
