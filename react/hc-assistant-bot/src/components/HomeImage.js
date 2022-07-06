const HomeImage = () => {
    return (
        <div className="media-attachment-container">
                <div className="media__blur box"></div>
                <div className="svg-monitor-container box">
                    <div className="media__svg-monitor">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enableBackground="new 0 0 150 73" xmlSpace="preserve">
                            <polyline fill="none" stroke="#F4DA96" strokeWidth="3" strokeMiterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/>
                        </svg>
                    </div>
                </div>
                
                <div className="media__circle box"></div>
                <picture className="group23__img box">
                    <source type="image/png" srcSet="/MaskGroup23.png 1x, /MaskGroup23@2x.png 2x" />
                    <img src="/MaskGroup23.png" alt="HealthCare Nurse"/>
                </picture>
                <div className="media-img-snippet-container box">
                    <div className="media__img-snippet">
                        <p className="media__img-snippet-title">Meet our Doctors</p>
                        <div className="group90__img">
                            <picture>
                                <source type="image/png" srcSet="/Group90.png 1x, /Group90@2x.png 2x" />
                                <img src="/Group90.png" alt="Meet our Doctors"/>
                            </picture>
                        </div>
                        <p className="snippet__bar light-bar-one"></p>
                        <p className="snippet__bar light-bar-second"></p>
                    </div>
                </div>
            </div>
    );
};

export default HomeImage;