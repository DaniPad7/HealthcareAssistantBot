const ConversationMessages = (props) => {
    return (
        <div id="messages">
            <ul>
                {props.messages.map(m => {
                    (m.author === props.identity) ?
                    <MessageBubble key={m.index} direction="outgoing" message={m}></MessageBubble>
                    : <MessageBubble key={m.index} direction="incoming" message={m}></MessageBubble>
                })}
            </ul>
        </div>
    );
};

export default ConversationMessages;