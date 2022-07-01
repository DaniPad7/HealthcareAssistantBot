const ThirdBlock = () => {
    return (
        <section className="block block--third">
            <div className="block-container">
                <p className="block__title">Get the care you need</p>
                <div className="care-container">
                    <div className="care__virtual">
                        <div className="mask-group4__img">
                            <picture>
                                <source type="image/png" srcSet="/MaskGroup4.png 1x, /MaskGroup4@2x.png 2x" />
                                <img src="/MaskGroup4.png" alt="Virtual Consulting"/>
                            </picture>
                        </div>
                        <p className="block__heading">Virtual Care</p>
                    </div>
                    <div className="care__in-person">
                        <div className="mask-group5__img">
                            <picture>
                                <source type="image/png" srcSet="/MaskGroup5.png 1x, /MaskGroup5@2x.png 2x" />
                                <img src="/MaskGroup5.png" alt="In-Person Consulting"/>
                            </picture>
                        </div>
                        <p className="block__heading">In-Person Care</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThirdBlock;