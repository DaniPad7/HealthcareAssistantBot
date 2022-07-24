import { PureComponent } from "react";
import MessageBubble from "./MessageBubble";

class ConversationMessages extends PureComponent {
    componentDidUpdate() {
    }
    render() { 
        return (
        <div id="messages" style={{ height: "35.9rem" }}>
            <ul className="list" style={{ height: "35.9rem", overflow: "scroll", fontSize: "1.2rem" }}>
                {this.props.messages.map(m => {
                    return (m.author === this.props.identity) ?
                    <MessageBubble key={m.index} direction="outgoing" message={m}></MessageBubble>
                    : <MessageBubble key={m.index} direction="incoming" message={m}></MessageBubble>
                })}
            </ul>
        </div>
    )};
};

export default ConversationMessages;