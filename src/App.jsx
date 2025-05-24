import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import { Wrapper } from "./styles/Global.styled";
import "./App.css";

function App() {
  return (
    <Wrapper>
      <PopNewCard />
      <PopBrowse />
      <Header />
      <Main />
    </Wrapper>
  );
}

export default App;
