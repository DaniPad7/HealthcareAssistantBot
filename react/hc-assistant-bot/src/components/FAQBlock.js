import { useEffect } from "react";

const FAQBlock = () => {
    useEffect(() => {
        if (window.location.hash) {
            let a = document.createElement("a");
            a.setAttribute("href", "#contact-us");
            a.click();
        }
    });
    return (
        <section className="block--faq">
            <div className="faq-container">
                <div className="faq__questions">
                    <p className="block__heading faq__title-one">FAQ</p>
                    <div className="media-container">
                        <button className="btn btn__faq-tab-clicked" type="button">Pharmacy</button>
                        <button className="btn btn__faq-tab" type="button">Consultation</button>
                        <button className="btn btn__faq-tab" type="button">Meetings</button>
                    </div>
                    <ul className="list faq__list">
                        <li>
                            <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                        <li>
                        <div className="media-container">
                                <button className="chat__button" type="button" title="Close">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                        <g id="Group_148" data-name="Group 148" transform="translate(-145 -426)">
                                            <g id="Ellipse_77" data-name="Ellipse 77" transform="translate(145 426)" fill="#fff" stroke="#07abff" strokeWidth="2">
                                            <circle cx="14.5" cy="14.5" r="14.5" stroke="none"/>
                                            <circle cx="14.5" cy="14.5" r="13.5" fill="none"/>
                                            </g>
                                            <path id="Path_159" data-name="Path 159" d="M0,0H13.1" transform="translate(153.296 440.5)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                            <path id="Path_160" data-name="Path 160" d="M0,0H13.1" transform="translate(159.845 433.951) rotate(90)" fill="none" stroke="#07abff" strokeLinecap="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                <p className="faq__list-question">How many variations of passages of Lorem Ipsum available?</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="contact-us" className="faq__contact-us">
                    <p className="block__heading faq__title-two">We'd love to hear from you</p>
                    <form>
                        <div className="media-container">
                            <div>
                                <div><input className="contact__input" type="text" title="Full Name" placeholder="Full Name"></input></div>
                                <div><input className="contact__input" type="email" title="Email" placeholder="Email"></input></div>
                                <div><input className="contact__input" type="tel" title="Phone Number" placeholder="Phone Number"></input></div>
                            </div>
                            <div><textarea className="contact__textarea" placeholder="Your Message"></textarea></div>
                        </div>
                        <button className="btn btn__contact" type="button">Send</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FAQBlock;