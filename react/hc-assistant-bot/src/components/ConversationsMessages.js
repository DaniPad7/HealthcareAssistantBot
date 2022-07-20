import { PureComponent, useState } from "react";
import MessageBubble from "./MessageBubble";

class ConversationMessages extends PureComponent {
    componentDidUpdate() {
        console.log("What are the props now", this.props);
    }
    render() { 
        return (
        <div id="messages" style={{ height: "35.9rem" }}>
            <ul style={{ height: "35.9rem", overflow: "scroll" }}>
                {console.log("WHat are the props now in render", this.props)}
                {this.props.messages.map(m => {
                    console.log(m.author === this.props.identity, m);
                    return (m.author === this.props.identity) ?
                    <MessageBubble key={m.index} direction="outgoing" message={m}></MessageBubble>
                    : <MessageBubble key={m.index} direction="incoming" message={m}></MessageBubble>
                })}
            </ul>
        </div>
    )};
};

export default ConversationMessages;