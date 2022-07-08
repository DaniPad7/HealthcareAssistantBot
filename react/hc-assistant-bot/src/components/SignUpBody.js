import { Link } from "react-router-dom";

const SignUpBody = () => {
    return (
        <div className="media__body">
                <p className="title signup__title">Sign Up</p>
                <p className="media__description description__auth">To start enter your email address</p>
                <form>
                    <div><input className="contact__input" type="email" title="Email" placeholder="Email"></input></div>
                    <div className="media__checkbox-auth">
                        <input type="checkbox" id="remember-me"></input>
                        <label htmlFor="remember-me" id="remember-me-label">Remember Me</label>
                    </div>
                    <div className="media-flex-alignitems-center">
                    <button type="button" className="btn btn__auth">Continue</button>
                    <div className="link__auth"><Link to={"/login"}>Already have an account?</Link></div>
                    </div>
                </form>
                <ul className="list list-main__stats">
                    <li className="stats__item"><p className="item__stat">245K+</p><p className="item__stat__description">Recovered Patients</p></li>
                    <li className="stats__item"><p className="item__stat">94%</p><p className="item__stat__description"> Satisfaction Rate</p></li>
                    <li className="stats__item"><p className="item__stat">75+</p><p className="item__stat__description">Expert Doctor</p></li>
                </ul>
        </div>
    );
};

export default SignUpBody;