import NavBar from "./NavBar";
import MainMedia from "./MainMedia";
import LoginBody from "./LoginBody";
import LoginImage from "./LoginImage";

const Login = () => {
    return (
        <section className="block--main">
            <NavBar></NavBar>
            <MainMedia MediaBody={LoginBody} MediaImage={LoginImage}></MainMedia>
        </section>
    );

};

export default Login;