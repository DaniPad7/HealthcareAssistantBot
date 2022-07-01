const MainMedia = () => {
    return (
        <div className="media-container">
            <div className="media__body">
                <p className="media__title">Your Health Is Our Top Priority</p>
                <p className="media__description">Let's make healthier happen together</p>
                <button type="button" className="btn btn__home">Meet our Specialist</button>
                <ul className="list list-main__stats">
                    <li className="stats__item"><p className="item__stat">245K+</p><p className="item__stat__description">Recovered Patients</p></li>
                    <li className="stats__item"><p className="item__stat">94%</p><p className="item__stat__description"> Satisfaction Rate</p></li>
                    <li className="stats__item"><p className="item__stat">75+</p><p className="item__stat__description">Expert Doctor</p></li>
                </ul>
            </div>
            <div className="media__blur">
                
            </div>
            {/* <div className="group23-90-container">
            <div className="group23__img"></div>
                <div className="group90__snippet"></div>
            </div> */}
        </div>
    );
};

export default MainMedia;