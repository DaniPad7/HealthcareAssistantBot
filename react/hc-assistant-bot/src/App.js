import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FAQ from './components/FAQ';
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" exact element={<Login></Login>}></Route>
          <Route path="/signup" exact element={<SignUp></SignUp>}></Route>
          <Route path="/faq" exact element={<FAQ></FAQ>}></Route>
          <Route path="/" exact element={<Home></Home>}></Route>
        </Routes>
      </div>
      <ChatBot></ChatBot>
    </BrowserRouter>
    </>
  );
}

export default App;
