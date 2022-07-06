import HomeImage from "./HomeImage";
import HomeBody from "./HomeBody";
import MainMedia from "./MainMedia";
import NavBar from "./NavBar";

const MainBlock = () => {
    return (
        <section className="block--main">
            <NavBar></NavBar>
            <MainMedia MediaBody={HomeBody} MediaImage={HomeImage}></MainMedia>
        </section>
    );
};

export default MainBlock;