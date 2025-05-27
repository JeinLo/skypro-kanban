import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledCardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledCardContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

function CardPage() {
  const { id } = useParams(); /*????*/ /*добавить форму редактирования в <p>*/

  return (
    <StyledCardPage>
      <StyledCardTitle>Карточка #{id}</StyledCardTitle>
      <StyledCardContent>
        <p>Просмотр и редактирование карточки с ID:5174 {id}</p>
      </StyledCardContent>
    </StyledCardPage>
  );
}

export default CardPage;
