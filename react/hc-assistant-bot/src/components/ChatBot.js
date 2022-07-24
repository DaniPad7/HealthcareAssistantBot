import { Component } from "react";
import ConversationsMessages from "./ConversationsMessages";
import {Device} from "@twilio/voice-sdk";

class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usingVoice: false,
            usingCall: false,
            onRep: false,
            mediaRecorder: null,
            device: null,
            newMessage: "",
            conversationProxy: props.conversationProxy,
            messages: [],
            loadingState: "initializing",
            boundConversations: new Set(),
        };
    }
    loadMessagesFor = async (thisConversation) => {
        if (this.props.conversationProxy.sid === thisConversation.sid) {
            try {
                const messagePaginator = await thisConversation.getMessages();
                if (this.props.conversationProxy === thisConversation && (this.state.messages.length !== messagePaginator.items.length)) {
                    this.setState({ messages: messagePaginator.items, loadingState: "ready" });
                }
            } catch (err) {
                console.error("Could not fetch messages Implement Retry", err);
                // this.setState({ loadingState: "failed" }); causes loop
            }
        }
    };
    componentDidMount = () => {
        const openForm = () => {
            document.getElementById("Component_1_1").style.display = "none";
            document.getElementById("bot-svg").style.display = "none";
            document.getElementById("my-form").style.display = "block";
        };
        const closeForm = () => {
            document.getElementById("my-form").style.display = "none";
            document.getElementById("Component_1_1").style.display = "block";
            document.getElementById("bot-svg").style.display = "block";
        };
        document.getElementById("Component_1_1").addEventListener('click', () => {
            openForm();
        });
        document.getElementById("chat-header-close-btn").addEventListener('click', () => {
            closeForm();
        });
        this.getCallToken();
        
        if (this.state.conversationProxy) {
            this.loadMessagesFor(this.state.conversationProxy);
            if (!this.state.boundConversations.has(this.state.conversationProxy)) {
                let newConversation = this.state.conversationProxy;
                newConversation.on("messageAdded", m => this.messageAdded(m, newConversation));
                this.setState({ boundConversations: new Set([...this.state.boundConversations, newConversation]) });
            }
        }
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.conversationProxy !== this.props.conversationProxy) {
            
            this.loadMessagesFor(this.props.conversationProxy);
            if (!this.state.boundConversations.has(this.props.conversationProxy)) {
                let newConversation = this.props.conversationProxy;
                newConversation.on("messageAdded", m => this.messageAdded(m, newConversation));
                this.setState({ boundConversations: new Set([...this.state.boundConversations, newConversation]) });
            }
        }
    };
    componentWillUnmount = () => {
        const openForm = () => {
            document.getElementById("Component_1_1").style.display = "none";
            document.getElementById("bot-svg").style.display = "none";
            document.getElementById("my-form").style.display = "block";
        };
        const closeForm = () => {
            document.getElementById("my-form").style.display = "none";
            document.getElementById("Component_1_1").style.display = "block";
            document.getElementById("bot-svg").style.display = "block";
        };
        document.getElementById("Component_1_1").removeEventListener("click", () => {openForm()});
        document.getElementById("chat-header-close-btn").removeEventListener("click", () => {closeForm()});
    }

    
    messageAdded = (message, targetConversation) => {
        if (targetConversation === this.props.conversationProxy) {
            this.setState((prevState, props) => ({ messages: [...prevState.messages, message] }));
        }
    };
    onMessageChanged = (event) => {
        this.setState({ newMessage: event.target.value });
    };

    sendMessage = async (event) => {
        event.preventDefault();
        const message = this.state.newMessage;
        this.setState({ newMessage: "" });
        await this.props.conversationProxy.sendMessage(message);
        if (!this.state.onRep) {
            await fetch("/nlu/text/dialogflow", {
            body: message, method: "POST"
            })
        }
    };
    getCallToken = async () => {
        const response = await fetch("/twilio/create/token/call",
        { method: "POST", headers: { "Content-Type": "application/json "} });
        const tokenR = response.body.getReader();
        const tok = await tokenR.read();
        const token = new TextDecoder("utf-8").decode(tok.value);
        await tokenR.cancel();
        const device = new Device(token);
        this.initDevice(device);
    };
    initDevice = (device) => {
        device.on("error", (err) => {
            console.error(err);
        });
        this.setState({ device });
    }
    sendAudioData = async (dataArray) => {
        let on = this;
        const data = dataArray[0];
        const fileReader = new FileReader();
        fileReader.onloadend = async function () {
            const dat = this.result;
            await fetch(`/nlu/voice/dialogflow/${on.props.conversationProxy.sid}?typeonrep=${on.state.onRep}&author=${on.props.myIdentity}`, {
                method: "POST",
                body: dat
            });
        }
        fileReader.readAsArrayBuffer(data);
    };
    switchVoice = async (event) => {
        event.preventDefault();
        let audioIn = { audio: true };
        if (!this.state.usingVoice && !this.state.mediaRecorder) {
            try {
                const mediaStreamObj = await navigator.mediaDevices.getUserMedia(audioIn);
                let mediaRecord = new MediaRecorder(mediaStreamObj, { mimeType: 'audio/webm',  });
                let dataArray = [];
                mediaRecord.ondataavailable = (ev) => {
                    dataArray.push(ev.data);
                }
                mediaRecord.onstop = async (ev) => {
                    await this.sendAudioData(dataArray);
                    dataArray = [];
                }
                mediaRecord.start();
                this.setState({ usingVoice: !this.state.usingVoice, mediaRecorder: mediaRecord });
            }
            catch (err) {
                console.error(err);
            }
        }
        else if (!this.state.usingVoice && this.state.mediaRecorder) {
            this.state.mediaRecorder.start();
            this.setState({ usingVoice: !this.state.usingVoice });
        }
        else {
            this.state.mediaRecorder.stop();
            this.setState({ usingVoice: !this.state.usingVoice });
        }
    }
    callRep = () => {
        if (!this.state.usingCall && this.state.device) {
            this.state.device.connect();
            this.setState({ usingCall: true });
        }
        else if (this.state.usingCall && this.state.device) {
            this.state.device.disconnectAll();
            this.setState({ usingCall: false });
        }
    };

    renderName = () => {
        return (this.state.onRep) ? "Representative" : "Alphius";
    }
    renderButton = () => {
        return (this.state.onRep) ? "Disconnect" : "Connect Representative";
    };
    renderCall = () => {
        return (this.state.onRep) ? (
                <button onClick={this.callRep} className={(this.state.usingCall ? "button-voice " : "") + "chat__button btn-bottom-one"} type="button" title="Call" disabled={this.state.usingVoice}>
                    <span>
                        <picture>
                            <source type="image/png" srcSet="/MaskGroup21.png 1x, /MaskGroup21@2x.png 2x" />
                            <img src="/MaskGroup21.png" alt="Call" />
                        </picture>
                    </span>
                </button>) : null
    };
    switchChannel = () => {
        this.setState({ onRep: !this.state.onRep });
        this.props.onSwitchConversation();
    };
    renderAssistant = () => {
        return (!this.state.onRep) ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="33.763" height="32.473" viewBox="0 0 33.763 32.473">
                            <g id="bot" transform="translate(-113.303 -150.148)">
                                <g id="Group_16" data-name="Group 16" transform="translate(113.303 150.148)">
                                    <path id="Path_24" data-name="Path 24" d="M171.978,299.123a5.32,5.32,0,0,1-1.118-1.637,5.1,5.1,0,0,1,3.535-7.056,4.845,4.845,0,0,1,1.312-.143A8.955,8.955,0,0,1,171.978,299.123Z" transform="translate(-167.118 -280.021)" fill="#60bbea" />
                                    <path id="Path_25" data-name="Path 25" d="M174.918,299.123a5.319,5.319,0,0,1-1.118-1.637c.6-1.04,1.2-2.144,1.78-3.314.65-1.286,1.235-2.547,1.741-3.743a4.845,4.845,0,0,1,1.313-.143C177.4,293.211,176.165,296.174,174.918,299.123Z" transform="translate(-170.057 -280.021)" fill="#5faddd" />
                                    <path id="Path_26" data-name="Path 26" d="M209.377,266.815c-.52,7.29-17.231,9.694-25.054,5.289a7.006,7.006,0,0,1-3.911-5.289c-1.2-10.656,5.861-20.415,13.957-20.415a14.438,14.438,0,0,1,9.252,3.613C207.271,253.209,209.961,258.641,209.377,266.815Z" transform="translate(-175.694 -241.839)" fill="#60bbea" />
                                    <path id="Path_27" data-name="Path 27" d="M152.944,242.884a7.5,7.5,0,0,1-2.573-2.6c-1.014-1.65-1.949-4.509-.663-8.785l.754.221c-.962,3.184-.767,5.913.559,8.109a6.737,6.737,0,0,0,2.3,2.352Z" transform="translate(-148.551 -228.875)" fill="#60bbea" />
                                    <circle id="Ellipse_30" data-name="Ellipse 30" cx="1.832" cy="1.832" r="1.832" transform="translate(0)" fill="#2a5082" />
                                    <path id="Path_28" data-name="Path 28" d="M231.244,315.631c0,1.468-1.611,2.365-3.678,2.9a27.955,27.955,0,0,1-6.744.7c-2.69-.026-7.862-.494-9.733-2.2a1.878,1.878,0,0,1-.689-1.4,5.645,5.645,0,0,1,1.728-4.054A5.961,5.961,0,0,1,216.3,309.9h9.057a5.927,5.927,0,0,1,4.652,2.222A5.545,5.545,0,0,1,231.244,315.631Z" transform="translate(-201.901 -297.087)" fill="#2a5082" />
                                    <path id="Path_29" data-name="Path 29" d="M235.855,330.422c0,1.468-1.611,2.365-3.678,2.9a27.956,27.956,0,0,1-6.744.7c-2.69-.026-7.862-.494-9.733-2.2,5.315-.156,14.359-1.027,18.921-4.925A5.608,5.608,0,0,1,235.855,330.422Z" transform="translate(-206.513 -311.878)" fill="#34497b" />
                                    <path id="Path_30" data-name="Path 30" d="M252.547,400a6.334,6.334,0,0,1-4.028-1.39c-1.741-1.4-2.287-3.392-1.728-3.431.871-.065,2.937.975,5.276.975,2.677,0,4.509-.676,5.887-.728h.182C259.538,395.414,257.823,400,252.547,400Z" transform="translate(-233.379 -371.283)" fill="#2a5082" />
                                    <path id="Path_31" data-name="Path 31" d="M236.454,291c-.52,7.29-17.231,9.694-25.054,5.289,4.782.793,19,2.534,21.546-4.314,2.2-5.887-.52-13.749-2.261-17.777C234.349,277.4,237.039,282.829,236.454,291Z" transform="translate(-202.771 -266.026)" fill="#5faddd" />
                                    <path id="Path_32" data-name="Path 32" d="M216.365,262.032c.429.572,3.093-.624,4.873-1.936,1.715-1.261,3.457-3.236,3.067-3.807-.338-.494-2.3.208-3.535.871C218.015,258.627,215.9,261.408,216.365,262.032Z" transform="translate(-207.034 -250.297)" fill="#b6e2e6" />
                                    <path id="Path_33" data-name="Path 33" d="M186.983,371.064c.065,1.949,1.247,3.794,1.728,3.665.507-.13.3-2.456.065-3.73-.065-.364-.481-2.612-1-2.6C187.373,368.4,186.944,369.8,186.983,371.064Z" transform="translate(-181.526 -347.985)" fill="#b6e2e6" />
                                    <g id="Group_13" data-name="Group 13" transform="translate(21.779 14.216)">
                                        <g id="Group_12" data-name="Group 12">
                                            <path id="Path_34" data-name="Path 34" d="M321.276,326.925a2.642,2.642,0,0,1-5.107.949,2.492,2.492,0,0,1-.169-.936,2.636,2.636,0,0,1,5.042-1.079A2.565,2.565,0,0,1,321.276,326.925Z" transform="translate(-315.558 -323.832)" fill="#393861" />
                                            <path id="Path_35" data-name="Path 35" d="M315.68,321.155a2.638,2.638,0,0,1,2.4,1.559,2.673,2.673,0,0,1,.234,1.079,2.642,2.642,0,0,1-5.107.949,2.491,2.491,0,0,1-.169-.936,2.643,2.643,0,0,1,2.638-2.651Zm0-.455a3.086,3.086,0,0,0-3.08,3.08,2.926,2.926,0,0,0,.208,1.1,3.083,3.083,0,0,0,5.965-1.092,2.971,2.971,0,0,0-.273-1.26,3.09,3.09,0,0,0-2.82-1.832Z" transform="translate(-312.6 -320.7)" fill="#47aed2" />
                                        </g>
                                        <path id="Path_36" data-name="Path 36" d="M321.042,325.746c-.988,2.378-3.418,2.313-4.86,2.027a2.786,2.786,0,0,1-.182-.936,2.639,2.639,0,0,1,5.042-1.092Z" transform="translate(-315.558 -323.745)" fill="#304673" />
                                        <circle id="Ellipse_31" data-name="Ellipse 31" cx="0.871" cy="0.871" r="0.871" transform="translate(1.222 1.351)" fill="#b6e2e6" />
                                        <path id="Path_37" data-name="Path 37" d="M338.364,348.349c.143.091-.052,1.014-.7,1.364-.585.312-1.352.078-1.365-.091-.013-.13.39-.156,1.053-.559C338.052,348.648,338.26,348.284,338.364,348.349Z" transform="translate(-333.218 -344.75)" fill="#b6e2e6" />
                                    </g>
                                    <g id="Group_15" data-name="Group 15" transform="translate(10.097 14.216)">
                                        <g id="Group_14" data-name="Group 14">
                                            <path id="Path_38" data-name="Path 38" d="M231.276,326.925a2.642,2.642,0,0,1-5.107.949,2.492,2.492,0,0,1-.169-.936,2.636,2.636,0,0,1,5.042-1.079A2.377,2.377,0,0,1,231.276,326.925Z" transform="translate(-225.571 -323.832)" fill="#393861" />
                                            <path id="Path_39" data-name="Path 39" d="M225.78,321.155a2.638,2.638,0,0,1,2.4,1.559,2.673,2.673,0,0,1,.234,1.079,2.642,2.642,0,0,1-5.107.949,2.492,2.492,0,0,1-.169-.936,2.634,2.634,0,0,1,2.638-2.651Zm0-.455a3.086,3.086,0,0,0-3.08,3.08,2.926,2.926,0,0,0,.208,1.1,3.083,3.083,0,0,0,5.965-1.092,2.971,2.971,0,0,0-.273-1.26,3.1,3.1,0,0,0-2.82-1.832Z" transform="translate(-222.7 -320.7)" fill="#47aed2" />
                                        </g>
                                        <path id="Path_40" data-name="Path 40" d="M231.042,325.746c-.988,2.378-3.418,2.313-4.86,2.027a2.785,2.785,0,0,1-.182-.936,2.64,2.64,0,0,1,5.042-1.092Z" transform="translate(-225.571 -323.745)" fill="#304673" />
                                        <circle id="Ellipse_32" data-name="Ellipse 32" cx="0.871" cy="0.871" r="0.871" transform="translate(1.209 1.338)" fill="#b6e2e6" />
                                        <path id="Path_41" data-name="Path 41" d="M248.464,348.349c.143.091-.052,1.014-.7,1.364-.585.312-1.351.078-1.364-.091-.013-.13.39-.156,1.053-.559C248.139,348.648,248.36,348.284,248.464,348.349Z" transform="translate(-243.318 -344.75)" fill="#b6e2e6" />
                                    </g>
                                    <path id="Path_42" data-name="Path 42" d="M255.271,313.727a4.549,4.549,0,0,1-2.391.7c-1.988.182-3.807-.442-3.781-.663a20.492,20.492,0,0,1,3.781-.13C254.907,313.61,255.258,313.636,255.271,313.727Z" transform="translate(-235.57 -300.329)" fill="#336bb4" />
                                    <circle id="Ellipse_33" data-name="Ellipse 33" cx="0.988" cy="0.988" r="0.988" transform="translate(0.329 0.705) rotate(-18.089)" fill="#336bb4" />
                                    <path id="Path_43" data-name="Path 43" d="M265.528,401.587a6.333,6.333,0,0,1-4.028-1.39c2.339-.312,6.913-1.144,9.421-3.2h.182C272.52,397,270.8,401.587,265.528,401.587Z" transform="translate(-246.361 -372.868)" fill="#34497b" />
                                </g>
                            </g>
                        </svg>
        ) : (
            <span>
                <picture>
                    <source />
                        <img id="rep__img" src="https://picsum.photos/32" alt="Assistant" />
                </picture>
            </span>
        );
    };

    render() {
        return (<>
        <div className="static chat-popup">
            <form className="form-container" id="my-form">
                <div className="chat-header">
                    <button className="chat__button" type="button" title="More">
                        <span>
                            <svg id="Component_6_2" data-name="Component 6 – 2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="6" height="28" viewBox="0 0 6 28">
                                <defs>
                                    <clipPath id="clip-path">
                                        <rect width="6" height="28" fill="none" />
                                    </clipPath>
                                </defs>
                                <g id="Repeat_Grid_22" data-name="Repeat Grid 22" clipPath="url(#clip-path)">
                                    <g transform="translate(-422 -83)">
                                        <g id="Ellipse_78" data-name="Ellipse 78" transform="translate(422 83)" fill="#707070" stroke="#707070" strokeWidth="1">
                                            <circle cx="3" cy="3" r="3" stroke="none" />
                                            <circle cx="3" cy="3" r="2.5" fill="none" />
                                        </g>
                                    </g>
                                    <g transform="translate(-422 -72)">
                                        <g id="Ellipse_78-2" data-name="Ellipse 78" transform="translate(422 83)" fill="#707070" stroke="#707070" strokeWidth="1">
                                            <circle cx="3" cy="3" r="3" stroke="none" />
                                            <circle cx="3" cy="3" r="2.5" fill="none" />
                                        </g>
                                    </g>
                                    <g transform="translate(-422 -61)">
                                        <g id="Ellipse_78-3" data-name="Ellipse 78" transform="translate(422 83)" fill="#707070" stroke="#707070" strokeWidth="1">
                                            <circle cx="3" cy="3" r="3" stroke="none" />
                                            <circle cx="3" cy="3" r="2.5" fill="none" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </button>
                    <p className="chat__heading">Chatbot</p>
                    <button className="chat__button" type="button" title="Close" id="chat-header-close-btn" disabled={this.state.usingCall || this.state.usingVoice}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="29.25" height="29.25" viewBox="0 0 29.25 29.25">
                                <g id="Icon_ionic-ios-close-circle-outline" data-name="Icon ionic-ios-close-circle-outline" transform="translate(-3.375 -3.375)">
                                    <path id="Path_6" data-name="Path 6" d="M23.295,21.705,19.589,18l3.705-3.705a1.124,1.124,0,0,0-1.589-1.589L18,16.411l-3.705-3.705a1.124,1.124,0,0,0-1.589,1.589L16.411,18l-3.705,3.705a1.086,1.086,0,0,0,0,1.589,1.116,1.116,0,0,0,1.589,0L18,19.589l3.705,3.705a1.129,1.129,0,0,0,1.589,0A1.116,1.116,0,0,0,23.295,21.705Z" fill="#707070" />
                                    <path id="Path_7" data-name="Path 7" d="M18,5.344A12.651,12.651,0,1,1,9.049,9.049,12.573,12.573,0,0,1,18,5.344m0-1.969A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Z" fill="#707070" />
                                </g>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="chat-handoff">
                    <div className="media-flex-alignitems-center">
                        {this.renderAssistant()}
                        <p>{this.renderName()}</p>
                    </div>
                    <button className="btn btn__handoff" type="button" onClick={this.switchChannel} disabled={this.state.usingCall || this.state.usingVoice}>{ this.renderButton()} </button>
                </div>
                <div style={{ height: "35.9rem" }}>
                    <ConversationsMessages identity={this.props.myIdentity} messages={this.state.messages}></ConversationsMessages>
                </div>
                <div className="chat-input">
                    <textarea style={(this.state.onRep) ? {"width": "23.2rem" } : {"width": "29.8rem" }} onChange={this.onMessageChanged} value={this.state.newMessage} placeholder="Message..." maxLength={100}></textarea>
                    <button onClick={this.sendMessage} className="chat__button btn-bottom-one" type="button" title="Send" disabled={this.state.usingVoice || this.state.usingCall}>
                        <span>
                            <picture>
                                <source type="image/png" srcSet="/MaskGroup2.png 1x, /MaskGroup2@2x.png 2x" />
                                <img src="/MaskGroup2.png" alt="Send" />
                            </picture>
                        </span>
                    </button>
                    {this.renderCall()}
                    <button onClick={this.switchVoice} className={(this.state.usingVoice ? "button-voice " : "") + "chat__button btn-bottom-two"} type="button" title="Speech">
                        <span>
                            <picture>
                                <source type="image/png" srcSet="/MaskGroup1.png 1x, /MaskGroup1@2x.png 2x" />
                                <img src="/MaskGroup1.png" alt="Speech" />
                            </picture>

                        </span>
                    </button>
                </div>
            </form>
        </div>
        <div className="static">
            <svg xmlns="http://www.w3.org/2000/svg" width="253" height="127" viewBox="0 0 253 127" id="bot-svg">
                <g id="Component_1_1" data-name="Component 1 – 1" transform="translate(0 15)">
                    <g id="Group_93" data-name="Group 93" transform="translate(-1010 -663)">
                        <rect id="Rectangle_93" data-name="Rectangle 93" width="171" height="37" rx="18.5" transform="translate(1010 696)" fill="#fff" />
                        <text id="Hey_I_m_Alphius" data-name="Hey! I&apos;m Alphius" transform="translate(1027 721)" fill="#707070" fontSize="14" fontFamily="Poppins-Regular, Poppins"><tspan x="0" y="0">Hey! I&apos;m Alphius</tspan></text>
                    </g>
                    <circle id="Ellipse_75" data-name="Ellipse 75" cx="48.5" cy="48.5" r="48.5" transform="translate(141)" fill="#07abff" opacity="0.42" />
                    <g id="Ellipse_76" data-name="Ellipse 76" transform="translate(141)" fill="#fff" stroke="rgba(7,171,255,0.4)" strokeWidth="1">
                        <circle cx="48.5" cy="48.5" r="48.5" stroke="none" />
                        <circle cx="48.5" cy="48.5" r="48" fill="none" />
                    </g>
                    <g id="chatbot" transform="translate(48.697 -128.148)">
                        <g id="Group_16" data-name="Group 16" transform="translate(113.303 150.148)">
                            <path id="Path_24" data-name="Path 24" d="M172.957,304.683a8.666,8.666,0,0,1-1.82-2.667,8.309,8.309,0,0,1,5.758-11.495,7.893,7.893,0,0,1,2.138-.233C180.684,299.75,172.957,304.683,172.957,304.683Z" transform="translate(-165.04 -273.565)" fill="#60bbea" />
                            <path id="Path_25" data-name="Path 25" d="M175.62,304.683a8.665,8.665,0,0,1-1.82-2.667c.974-1.694,1.947-3.493,2.9-5.4,1.058-2.1,2.011-4.149,2.837-6.1a7.893,7.893,0,0,1,2.138-.233C179.664,295.051,177.653,299.877,175.62,304.683Z" transform="translate(-167.703 -273.565)" fill="#5faddd" />
                            <path id="Path_26" data-name="Path 26" d="M227.679,279.656c-.847,11.876-28.07,15.792-40.813,8.616-3.535-1.99-5.948-4.848-6.372-8.616C178.547,262.3,190.042,246.4,203.23,246.4a23.52,23.52,0,0,1,15.072,5.885C224.25,257.492,228.632,266.341,227.679,279.656Z" transform="translate(-172.81 -238.97)" fill="#60bbea" />
                            <path id="Path_27" data-name="Path 27" d="M155.373,250.044a12.216,12.216,0,0,1-4.191-4.234c-1.651-2.688-3.175-7.346-1.08-14.31l1.228.36c-1.566,5.186-1.249,9.632.91,13.209a10.975,10.975,0,0,0,3.747,3.831Z" transform="translate(-148.218 -227.224)" fill="#60bbea" />
                            <circle id="Ellipse_30" data-name="Ellipse 30" cx="2.985" cy="2.985" r="2.985" transform="translate(0)" fill="#2a5082" />
                            <path id="Path_28" data-name="Path 28" d="M244.354,319.235c0,2.392-2.625,3.853-5.991,4.721a45.539,45.539,0,0,1-10.986,1.143c-4.382-.042-12.807-.8-15.855-3.578a3.059,3.059,0,0,1-1.122-2.286,9.2,9.2,0,0,1,2.815-6.6,9.71,9.71,0,0,1,6.8-2.731h14.755a9.655,9.655,0,0,1,7.578,3.62A9.032,9.032,0,0,1,244.354,319.235Z" transform="translate(-196.556 -289.028)" fill="#2a5082" />
                            <path id="Path_29" data-name="Path 29" d="M248.533,332.637c0,2.392-2.625,3.853-5.991,4.721a45.539,45.539,0,0,1-10.987,1.143c-4.382-.042-12.807-.8-15.855-3.578,8.658-.254,23.391-1.672,30.822-8.023A9.135,9.135,0,0,1,248.533,332.637Z" transform="translate(-200.734 -302.429)" fill="#34497b" />
                            <path id="Path_30" data-name="Path 30" d="M256.3,403.036a10.317,10.317,0,0,1-6.562-2.265c-2.837-2.286-3.726-5.525-2.815-5.589,1.418-.106,4.784,1.588,8.594,1.588,4.361,0,7.346-1.1,9.589-1.185h.3C267.689,395.563,264.895,403.036,256.3,403.036Z" transform="translate(-225.077 -356.253)" fill="#2a5082" />
                            <path id="Path_31" data-name="Path 31" d="M252.213,301.571c-.847,11.876-28.07,15.792-40.813,8.616,7.79,1.291,30.949,4.128,35.1-7.028,3.577-9.589-.847-22.4-3.683-28.959C248.784,279.408,253.166,288.256,252.213,301.571Z" transform="translate(-197.344 -260.885)" fill="#5faddd" />
                            <path id="Path_32" data-name="Path 32" d="M216.406,265.749c.7.931,5.038-1.016,7.938-3.154,2.794-2.053,5.631-5.271,5-6.2-.55-.8-3.747.339-5.758,1.418C219.094,260.2,215.644,264.733,216.406,265.749Z" transform="translate(-201.207 -246.634)" fill="#b6e2e6" />
                            <path id="Path_33" data-name="Path 33" d="M186.985,372.739c.106,3.175,2.032,6.181,2.815,5.97.826-.212.487-4,.106-6.075-.106-.593-.783-4.255-1.63-4.234C187.62,368.4,186.921,370.686,186.985,372.739Z" transform="translate(-178.094 -335.144)" fill="#b6e2e6" />
                            <g id="Group_13" data-name="Group 13" transform="translate(35.479 23.158)">
                                <g id="Group_12" data-name="Group 12">
                                    <path id="Path_34" data-name="Path 34" d="M324.594,328.576a4.3,4.3,0,0,1-8.319,1.545A4.06,4.06,0,0,1,316,328.6a4.294,4.294,0,0,1,8.213-1.757A4.178,4.178,0,0,1,324.594,328.576Z" transform="translate(-315.28 -323.538)" fill="#393861" />
                                    <path id="Path_35" data-name="Path 35" d="M317.617,321.441a4.3,4.3,0,0,1,3.916,2.54,4.354,4.354,0,0,1,.381,1.757,4.3,4.3,0,0,1-8.319,1.545,4.058,4.058,0,0,1-.275-1.524,4.3,4.3,0,0,1,4.3-4.318Zm0-.741a5.028,5.028,0,0,0-5.017,5.017,4.766,4.766,0,0,0,.339,1.8,5.022,5.022,0,0,0,9.716-1.778,4.841,4.841,0,0,0-.445-2.053,5.034,5.034,0,0,0-4.594-2.985Z" transform="translate(-312.6 -320.7)" fill="#47aed2" />
                                </g>
                                <path id="Path_36" data-name="Path 36" d="M324.213,326.719c-1.609,3.874-5.567,3.768-7.917,3.3a4.537,4.537,0,0,1-.3-1.524,4.3,4.3,0,0,1,8.213-1.778Z" transform="translate(-315.28 -323.459)" fill="#304673" />
                                <circle id="Ellipse_31" data-name="Ellipse 31" cx="1.418" cy="1.418" r="1.418" transform="translate(1.99 2.202)" fill="#b6e2e6" />
                                <path id="Path_37" data-name="Path 37" d="M339.664,348.354c.233.148-.085,1.651-1.143,2.223-.953.508-2.2.127-2.223-.148-.021-.212.635-.254,1.715-.91C339.156,348.841,339.495,348.248,339.664,348.354Z" transform="translate(-331.281 -342.49)" fill="#b6e2e6" />
                            </g>
                            <g id="Group_15" data-name="Group 15" transform="translate(16.448 23.158)">
                                <g id="Group_14" data-name="Group 14">
                                    <path id="Path_38" data-name="Path 38" d="M234.594,328.576a4.3,4.3,0,0,1-8.319,1.545A4.059,4.059,0,0,1,226,328.6a4.294,4.294,0,0,1,8.213-1.757A3.872,3.872,0,0,1,234.594,328.576Z" transform="translate(-225.301 -323.538)" fill="#393861" />
                                    <path id="Path_39" data-name="Path 39" d="M227.717,321.441a4.3,4.3,0,0,1,3.916,2.54,4.355,4.355,0,0,1,.381,1.757,4.3,4.3,0,0,1-8.319,1.545,4.06,4.06,0,0,1-.275-1.524,4.291,4.291,0,0,1,4.3-4.318Zm0-.741a5.028,5.028,0,0,0-5.017,5.017,4.766,4.766,0,0,0,.339,1.8,5.022,5.022,0,0,0,9.716-1.778,4.841,4.841,0,0,0-.445-2.053,5.057,5.057,0,0,0-4.594-2.985Z" transform="translate(-222.7 -320.7)" fill="#47aed2" />
                                </g>
                                <path id="Path_40" data-name="Path 40" d="M234.213,326.719c-1.609,3.874-5.567,3.768-7.917,3.3a4.536,4.536,0,0,1-.3-1.524,4.3,4.3,0,0,1,8.213-1.778Z" transform="translate(-225.301 -323.459)" fill="#304673" />
                                <circle id="Ellipse_32" data-name="Ellipse 32" cx="1.418" cy="1.418" r="1.418" transform="translate(1.969 2.18)" fill="#b6e2e6" />
                                <path id="Path_41" data-name="Path 41" d="M249.764,348.354c.233.148-.085,1.651-1.143,2.223-.953.508-2.2.127-2.223-.148-.021-.212.635-.254,1.715-.91C249.235,348.841,249.595,348.248,249.764,348.354Z" transform="translate(-241.381 -342.49)" fill="#b6e2e6" />
                            </g>
                            <path id="Path_42" data-name="Path 42" d="M259.153,313.79c.042.275-1.884.953-3.9,1.143-3.239.3-6.2-.72-6.16-1.08.021-.169,2.075-.191,6.16-.212C258.561,313.6,259.132,313.642,259.153,313.79Z" transform="translate(-227.062 -291.965)" fill="#336bb4" />
                            <circle id="Ellipse_33" data-name="Ellipse 33" cx="1.609" cy="1.609" r="1.609" transform="translate(0.535 1.148) rotate(-18.089)" fill="#336bb4" />
                            <path id="Path_43" data-name="Path 43" d="M268.062,404.472a10.316,10.316,0,0,1-6.562-2.265c3.81-.508,11.262-1.863,15.347-5.207h.3C279.451,397,276.657,404.472,268.062,404.472Z" transform="translate(-236.839 -357.69)" fill="#34497b" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </>
    )};
};

export default ChatBot;