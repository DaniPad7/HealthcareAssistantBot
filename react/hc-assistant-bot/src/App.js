import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FAQ from './components/FAQ';
import ChatBot from "./components/ChatBot";
import { Client as ConversationsClient } from "@twilio/conversations";
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: localStorage.getItem("name") || "appUser",
      loggedIn: !!localStorage.getItem("name"),
      statusString: null,
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: "CHd79a76d541474371a03edd49ffded206",
    };

  }

  componentDidMount = () => {
    if (this.state.loggedIn) {
      this.getToken(this.state.name)
    }
    else {
      this.getToken("appUser")
    }
  };
  
  getToken = async (name) => {
    const payload = { name };

    const response = await fetch("/twilio/create/token", {
      body: JSON.stringify(payload), method: "POST"
      , headers: { 'Content-Type': 'application/json' }
    });
    const myTokenR = response.body.getReader();
    const tok = await myTokenR.read();
    const myToken = new TextDecoder("utf-8").decode(tok.value);
    await myTokenR.cancel();
    await this.initConversations(myToken);
  };

  initConversations = async (token) => {
    window.conversationsClient = ConversationsClient;
    this.conversationsClient = new ConversationsClient(token);
    this.setState({ statusString: "Connecting to Twilio..." });

    this.conversationsClient.on("connectionStateChanged", state => {
      switch (state) {
        case "connecting":
          this.setState({ statusString: "Connecting to Twilio", status: "default" });
          break;
        case "connected":
          this.setState({ statusString: "You are connected.", status: "success" });
          break;
        case "disconnecting":
          this.setState({ statusString: "Disconnecting from Twilio...", conversationsReady: false, status: "default" });
          break;
        case "disconnected":
          this.setState({ statusString: "Disconnected.", conversationsReady: false, status: "warning" });
          break;
        case "denied":
          this.setState({ statusString: "Connection failed.", conversationsReady: false, status: "error" });
          break;
        default:
          this.setState({ statusString: "Connection failed. Not denied.", conversationsReady: false, status: "error" });
      }
    });
    const look = await this.conversationsClient.getSubscribedConversations();
    this.setState({ conversations: [...this.state.conversations, ...look.items] });
  };

  switchConversation = () => {
    this.setState({ selectedConversationSid: 
      this.state.selectedConversationSid === "CH5fabf57759b648b0a675cbf3e052e277" ?
      "CHd79a76d541474371a03edd49ffded206" : "CH5fabf57759b648b0a675cbf3e052e277" });
  };
  
  render() {
    const { conversations, selectedConversationSid } = this.state;
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
        <ChatBot onSwitchConversation={this.switchConversation} conversationProxy={selectedConversation} myIdentity={this.state.name}></ChatBot>
      </BrowserRouter>
    </>
  )};
}

export default App;
