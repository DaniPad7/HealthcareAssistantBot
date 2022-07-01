const NavBar = () => {
    return (
        <div className="nav-attachment-container">
            <div className="nav__blur box"></div>
        <div className="nav-container box stack-top-layer1">
            <nav className="nav">
                <div className="nav__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="156" height="47" viewBox="0 0 156 47">
                        <g id="Group_91" data-name="Group 91" transform="translate(-139 -29)">
                        <circle id="Ellipse_71" data-name="Ellipse 71" cx="23.5" cy="23.5" r="23.5" transform="translate(139 29)" fill="#07abff"/>
                        <text id="MedLife" transform="translate(195 63)" fill="#484848" fontSize="26" fontFamily="Poppins-Medium, Poppins" fontWeight="500"><tspan x="0" y="0">MedLife</tspan></text>
                        <g id="noun-stethoscope-2182106" transform="translate(78.982 41.488)">
                        <path id="Path_110" data-name="Path 110" d="M94.364,5.149a3.231,3.231,0,0,0-1,6.3v6.617a7.423,7.423,0,0,1-14.84.292,7.4,7.4,0,0,0,6.291-7.316V.028H80.588V2.689H82.7v8.355a5.286,5.286,0,1,1-10.572,0V2.689h2.114V.028H70.018V11.044a7.4,7.4,0,0,0,6.394,7.332,9.536,9.536,0,0,0,19.066-.19h0V11.412A3.231,3.231,0,0,0,94.364,5.15Zm.059,4.957A1.727,1.727,0,1,1,96.15,8.379,1.726,1.726,0,0,1,94.423,10.106Z" fill="#fff"/>
                        </g>
                        </g>
                    </svg>
                </div>
                <ul className="list nav__list">
                    <li className="nav__item"><span>Home</span></li>
                    <li className="nav__item"><span>Login</span></li>
                    <li className="nav__item"><span>Sign Up</span></li>
                    <li className="nav__item"><span>Contact Us</span></li>
                    <li className="nav__item"><span>FAQ</span></li>
                </ul>
            </nav>
        </div>
        </div>
    );
};

export default NavBar;