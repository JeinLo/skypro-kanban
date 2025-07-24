// import React from "react";
// import Column from "../Column/Column";
// import { StyledMain, StyledMainBlock, StyledMainContent } from "./Main.styled";
// import { Container } from "../../styles/Global.styled";

// function Main({ tasks }) {
//   const statuses = [
//     "Без статуса",
//     "Нужно сделать",
//     "В работе",
//     "Тестирование",
//     "Готово",
//   ];

//   return (
//     <StyledMain>
//       <Container>
//         <StyledMainBlock>
//           <StyledMainContent>
//             {statuses.map((status) => (
//               <Column
//                 key={status}
//                 title={status}
//                 cards={tasks.filter((task) => task.status === status)}
//               />
//             ))}
//           </StyledMainContent>
//         </StyledMainBlock>
//       </Container>
//     </StyledMain>
//   );
// }

// export default Main;
