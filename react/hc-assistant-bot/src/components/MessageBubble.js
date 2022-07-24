import { Component } from "react";
import ChatIcon from "./ChatIcon";

class MessageBubble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMedia: props.message.type === "media",
            mediaDownloadFailed: false,
            mediaUrl: null
        };

    }
    componentDidMount = () => {
        const getType = async () => {
            this.setState({ ...this.state, type: (await this.props.message.getParticipant()).type });
            if (this.state.hasMedia) {
                try {
                    const url = await this.props.message.media.getContemporaryUrl();
                    this.setState({ mediaUrl: url });
                } catch (err) {
                    this.setState({ mediaDownloadFailed: true });
                }
            }
        };
        getType();
        
        document.getElementById(this.props.message.sid).scrollIntoView({ behavior: "smooth" });
    };
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        document.getElementById(this.props.message.sid).scrollIntoView({ behavior: "smooth" });
    };
    render() { 
        const m = this.props.message;
        const type = this.state.type;
        let direction = (this.props.direction === "incoming") ? "in" : "out";
        return (
        <li id={m.sid} className={`message__item_${direction}`}>
            <div className={`message__item-div_${direction}`}>
                <div>
                    <strong>
                        {type === "chat" && (<span><ChatIcon></ChatIcon></span>)}
                        {type === "sms" && (<span type="mobile">From Mobile</span>)}
                        {` ${m.author}`}
                    </strong>
                    <br />
                    {m.body}
                </div>
                <span className="styles__time-date">{m.state.timestamp.toLocaleString()}</span>
            </div>
        </li>
    )};
};
export default MessageBubble;