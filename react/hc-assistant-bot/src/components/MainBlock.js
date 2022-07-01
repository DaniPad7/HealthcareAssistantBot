import MainMedia from "./MainMedia";
import NavBar from "./NavBar";

const MainBlock = () => {
    return (
        <section className="block--main">
            <NavBar></NavBar>
            <MainMedia></MainMedia>
        </section>
    );
};

export default MainBlock;