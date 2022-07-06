import MainBlock from "./components/MainBlock";
import SecondBlock from "./components/SecondBlock";
import ThirdBlock from "./components/ThirdBlock";
import AppFooter from "./components/AppFooter";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import SearchBlock from "./components/SearchBlock"
// import FAQBlock from "./components/FAQBlock"
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div>
    <MainBlock></MainBlock>
    <SecondBlock></SecondBlock>
    <ThirdBlock></ThirdBlock>
    <AppFooter></AppFooter>
    {/* <Login></Login>
    <SignUp></SignUp> */}
    {/* <SearchBlock></SearchBlock>
    <FAQBlock></FAQBlock> */}
    <ChatBot></ChatBot>
    </div>
    
  );
}

export default App;
