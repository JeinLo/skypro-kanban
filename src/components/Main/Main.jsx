import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import cards from "../../../data";
import {
  StyledMain,
  StyledMainBlock,
  StyledMainContent,
  StyledLoading,
} from "./Main.styled";
import { Container } from "../../styles/Global.styled";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <StyledMain>
      <Container>
        <StyledMainBlock>
          {isLoading ? (
            <StyledLoading>Данные загружаются...</StyledLoading>
          ) : (
            <StyledMainContent>
              {statuses.map((status) => (
                <Column
                  key={status}
                  title={status}
                  cards={cards.filter((card) => card.status === status)}
                />
              ))}
            </StyledMainContent>
          )}
        </StyledMainBlock>
      </Container>
    </StyledMain>
  );
}

export default Main;
