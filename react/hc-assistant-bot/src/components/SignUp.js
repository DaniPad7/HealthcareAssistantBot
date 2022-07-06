import LoginImage from "./LoginImage";
import NavBar from "./NavBar";
import SignUpBody from "./SignUpBody";
import MainMedia from "./MainMedia";

const SignUp = () => {
    return (
        <section className="block--main">
            <NavBar></NavBar>
            <MainMedia MediaBody={SignUpBody} MediaImage={LoginImage}></MainMedia>
        </section>

    );
};

export default SignUp;