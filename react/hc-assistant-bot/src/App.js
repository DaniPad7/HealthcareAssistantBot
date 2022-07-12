import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FAQ from './components/FAQ';
import ChatBot from "./components/ChatBot";
import 'dotenv/config';
import { Client as ConversationsClient } from "@twilio/conversations";
import { useEffect, useState } from 'react';

function App() {
  const conversationsClient = null;
  const initState = {
    name: localStorage.getItem("name") || "",
    loggedIn: this.name !== "",
    token: null,
    statusString: null,
    conversationsReady: false,
    conversations: [],
    selectedConversationSid: null,
    newMessage: ""
  };
  const [state, setState] = useState(initState);
  useEffect(() => {
    if (state.loggedIn) {
      getToken();
      setState({ statusString: "Fetching credentials...." });
    }
  });
  // Implement
  const login = (name) => { };
  const logout = (event) => { };
  const getToken = () => {
    const myToken = "example";
    setState({ token: myToken }, initConversations);
  };

  const initConversations = async () => {
    window.conversationsClient = ConversationsClient;
    conversationsClient = ConversationsClient(state.token /**Created in the backend */);
    setState({ statusString: "Connecting to Twilio..." });

    conversationsClient.on("connectionStateChanged", state => {
      switch (state) {
        case "connecting":
          setState({ statusString: "Connecting to Twilio", status: "default" });
        case "connected":
          setState({ statusString: "You are connected.", status: "success" });
        case "disconnecting":
          setState({ statusString: "Disconnecting from Twilio...", conversationsReady: false, status: "default" });
        case "disconnected":
          setState({ statusString: "Disconnected.", conversationsReady: false, status: "warning" });
        case "denied":
          setState({ statusString: "Connection failed.", conversationsReady: false, status: "error" });
        default:
          setState({ statusString: "Connection failed. Not denied.", conversationsReady: false, status: "error" });
      }
    });
    conversationsClient.on("conversationJoined", conversation => {
      setState({ conversations: [...state.conversations, conversation] });
    });
    conversationsClient.on("conversationLeft", thisConversation => {
      setState({ conversations: [...state.conversations.filter(it => it !== thisConversation)] });
    });
  };
  // selectedConversationSid must be put to a default of only one conversation.
  const { conversations, selectedConversationSid, status } = state;
  const selectedConversation = conversations.find(it => it.sid === selectedConversationSid);
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
        <ChatBot conversationProxy={selectedConversation} myIdentity={state.name}></ChatBot>
      </BrowserRouter>
    </>
  );
}

export default App;
