const Search = () => {
    return (
        <div className="search-container">
            <div className="search__title-group">
                <p className="title search__title">How can we help you?</p>
            </div>
            <div className="search__input-group-attachment">
                <input aria-label="Domain" type="text" className="search__input box" placeholder="Search"></input>
                <span className="search__icon  box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28.207" height="28.207" viewBox="0 0 28.207 28.207">
                        <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-4 -4)">
                        <path id="Path_157" data-name="Path 157" d="M28.5,16.5a12,12,0,1,1-12-12A12,12,0,0,1,28.5,16.5Z" fill="none" stroke="#1a407b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Path_158" data-name="Path 158" d="M31.5,31.5l-6.525-6.525" fill="none" stroke="#1a407b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                        </svg>
                </span>
            </div>
        </div>
    );

};

export default Search;