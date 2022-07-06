const HomeBody = () => {
    return (
        <div className="media__body">
                <p className="title media__title">Your Health Is Our Top Priority</p>
                <p className="media__description">Let's make healthier happen together</p>
                <button type="button" className="btn btn__home">Meet our Specialist</button>
                <ul className="list list-main__stats">
                    <li className="stats__item"><p className="item__stat">245K+</p><p className="item__stat__description">Recovered Patients</p></li>
                    <li className="stats__item"><p className="item__stat">94%</p><p className="item__stat__description"> Satisfaction Rate</p></li>
                    <li className="stats__item"><p className="item__stat">75+</p><p className="item__stat__description">Expert Doctor</p></li>
                </ul>
        </div>
    );
}

export default HomeBody;