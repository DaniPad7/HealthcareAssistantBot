import { Component, useEffect, useState } from "react";
import ChatIcon from "./ChatIcon";

class MessageBubble extends Component {
    constructor(props) {
        super(props);
        console.log("Hello I amde it to constructor");
        this.state = {
            hasMedia: props.message.type === "media",
            mediaDownloadFailed: false,
            mediaUrl: null
        };

    }
    componentDidMount = () => {
        const getType = async () => {
            // console.log("I am retrieving the message type of ", this.props.message);
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
    // Some JS for determining styles with props.direction
    render() { 
        const m = this.props.message;
        const type = this.state.type;
        return (
        <li id={m.sid} className="message__item">
            <div className="message__item-div">
                <div>
                    <strong>
                        {type === "chat" && (<span><ChatIcon></ChatIcon></span>)/*(<Icon style={{ fontSize: "1.6rem" }} component={ChatIcon}></Icon>)*/}
                        {type === "sms" && (<span type="mobile">From Mobile</span>)}
                        {` ${m.author}`}
                    </strong>
                    <br />
                    <div className="make sure to remove this div">
                        {/* No media allowed in the chat */}
                        {/* {state.hasMedia && (<Media hasFailed={state.mediaDownloadFailed} url={state.mediaUrl}></Media>)} */}
                    </div>
                    {m.body}
                </div>
                <span className="styles__time-date">{m.state.timestamp.toLocaleString()}</span>
            </div>
        </li>
    )};
};
export default MessageBubble;