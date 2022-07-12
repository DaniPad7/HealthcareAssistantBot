import { useEffect, useState } from "react";
import ChatIcon from "./ChatIcon";

const MessageBubble = (props) => {
    const initState = {
        hasMedia: props.message.type === "media",
        mediaDownloadFailed: false,
        mediaUrl: null
    };
    const [state, setState] = useState(initState);
    useEffect(async () => {
        setState({ ...state, type: (await props.message.getParticipant()).type });
        if (state.hasMedia) {
            try {
                const url = await props.message.media.getContemporaryUrl();
                setState({ mediaUrl: url });
            } catch (err) {
                setState({ mediaDownloadFailed: true });
            }
        }
        document.getElementById(props.message.sid).scrollIntoView({ behavior: "smooth" });
    });
    // Some JS for determining styles
    return (
        <li id={m.sid} className={itemStyle}>
            <div className={divStyle}>
                <div>
                    <strong>
                        {/* {type === "whatsapp" && (<Icon style={{ fontSize: "1.6rem" }} component={WhatsAppIcon}></Icon>)} */}
                        {type === "chat" && <span><ChatIcon></ChatIcon></span>/*(<Icon style={{ fontSize: "1.6rem" }} component={ChatIcon}></Icon>)*/}
                        {type === "sms" && (<Icon type={"mobile"}></Icon>)}
                        {` ${m.author}`}
                    </strong>
                    <br />
                    <div className={styles.medias}>
                        {/* {state.hasMedia && (<Media hasFailed={state.mediaDownloadFailed} url={state.mediaUrl}></Media>)} */}
                    </div>
                    {m.body}
                </div>
                <span className={styles.time_date}>{m.state.timestamp.toLocaleString()}</span>
            </div>
        </li>
    );
};
export default MessageBubble;