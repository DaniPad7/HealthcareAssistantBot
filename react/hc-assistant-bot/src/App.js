import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FAQ from './components/FAQ';
import ChatBot from "./components/ChatBot";
import { Client as ConversationsClient } from "@twilio/conversations";
import { useEffect, useState } from 'react';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("rendering");

    this.state = {
      name: localStorage.getItem("name") || "",
      loggedIn: !!localStorage.getItem("name"),
      // token: null,
      statusString: null,
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: /*process.env.TWILIO...*/"",
      // newMessage: ""
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

  // Possibly add a componenetDidUpdate on state.name
  
  // Implement
  login = (name) => {
    if (name !== "") {
      localStorage.setItem("name", name);
      this.setState({ name, loggedIn: true });
    }
   };
  logout = (event) => { };
  getToken = async (name) => {
    const payload = { name };

    const response = await fetch("http://localhost:8080/twilio/create-token1", {
      body: JSON.stringify(payload), method: "POST"
      , headers: { 'Content-Type': 'application/json' }
    });
    console.log("Here ", response);
    const myTokenR = response.body.getReader();
    const tok = await myTokenR.read();
    const myToken = new TextDecoder("utf-8").decode(tok.value);
    await myTokenR.cancel();
    // Maybe don't use setState but await a token and pass it as a param to initConversations.
    // const myToken = "INSERT TOKEN HERE";
    console.log("Hello ", myToken);
    await this.initConversations(myToken);
  };

  initConversations = async (token) => {
    window.conversationsClient = ConversationsClient;
    this.conversationsClient = new ConversationsClient(token);
    console.log("Connecting to Twilio...");
    this.setState({ statusString: "Connecting to Twilio..." });

    this.conversationsClient.on("connectionStateChanged", state => {
      switch (state) {
        case "connecting":
          console.log("Connecting");
          this.setState({ statusString: "Connecting to Twilio", status: "default" });
          break;
        case "connected":
          console.log("Connected");
          this.setState({ statusString: "You are connected.", status: "success" });
          break;
        case "disconnecting":
          console.log("Disconnecting");
          this.setState({ statusString: "Disconnecting from Twilio...", conversationsReady: false, status: "default" });
          break;
        case "disconnected":
          console.log("Disconnected");
          this.setState({ statusString: "Disconnected.", conversationsReady: false, status: "warning" });
          break;
        case "denied":
          console.log("Denied");
          this.setState({ statusString: "Connection failed.", conversationsReady: false, status: "error" });
          break;
        default:
          console.log("Hello I am in default");
          this.setState({ statusString: "Connection failed. Not denied.", conversationsReady: false, status: "error" });
      }
    });
    this.conversationsClient.on("conversationJoined", (conversation) => {
      // the first event does not have setState called
      console.log("Setting conversation joined with this ", conversation);
      // this.setState({ conversations: [...this.state.conversations, conversation] });
    });
    this.conversationsClient.onWithReplay("conversationLeft", (thisConversation) => {
      console.log("Setting conversation left with this ", thisConversation);
      // this.setState({ conversations: [...this.state.conversations.filter(it => it !== thisConversation)] });
    });
    /*const look = await this.conversationsClient.getSubscribedConversations();
    console.log("Looking ", look.items);
    this.setState({ conversations: [...this.state.conversations, ...look.items] });*/
  };

  // selectedConversationSid must be put to a default of only one conversation.
  switchConversation = () => {
    this.setState({ selectedConversationSid: 
      this.state.selectedConversationSid === ".env1" ?
      ".env2" : ".env1" });
  };
  
  render() {
    const { conversations, selectedConversationSid } = this.state;
    const selectedConversation = conversations.find(it => it.sid === selectedConversationSid);
    console.log("Conversations to choose from ", this.state.conversations);
    console.log("Slected conversation ", selectedConversation);
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
        <ChatBot onSwitchConversation={this.switchConversation} conversationProxy={selectedConversation} myIdentity={"appUser"/**temp */}></ChatBot>
      </BrowserRouter>
    </>
  )};
}

export default App;
