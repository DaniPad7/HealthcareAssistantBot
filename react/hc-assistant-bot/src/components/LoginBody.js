const LoginBody = () => {
    return (
        <div className="media__body">
                <p className="title login__title">Login</p>
                <p className="media__description">First. Let's look up your account</p>
                {/* Remember Me div */}
                <button type="button" className="btn btn__home">Continue</button>
                <ul className="list list-main__stats">
                    <li className="stats__item"><p className="item__stat">245K+</p><p className="item__stat__description">Recovered Patients</p></li>
                    <li className="stats__item"><p className="item__stat">94%</p><p className="item__stat__description"> Satisfaction Rate</p></li>
                    <li className="stats__item"><p className="item__stat">75+</p><p className="item__stat__description">Expert Doctor</p></li>
                </ul>
        </div>
    );
};

export default LoginBody;