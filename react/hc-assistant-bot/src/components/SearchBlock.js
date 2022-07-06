import NavBar from "./NavBar";
import Search from "./Search";

const SearchBlock = () => {
    return (
        <section className="block--search">
            <NavBar></NavBar>
            <Search></Search>
        </section>
    );
};

export default SearchBlock;