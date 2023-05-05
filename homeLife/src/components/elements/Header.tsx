import { useContext, useEffect, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { LeftMenu } from "./LeftMenu";
import { ReactDimmer } from "react-dimmer";
import PropTypes from "prop-types";
import { GlobalContext } from "../../AppSettings";

interface IUserInfoProps {
    id: number,
    email: string,
    firstName: string,
    lastName: string
}

function Header({title}) {
    const [isMenuOpen, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu((prevState) => !prevState);
    };

    return (
        <>
            <header className="app-header">
                <GiHamburgerMenu className="menu-btn" onClick={handleMenu} />
                <h1>{title}</h1>
            </header>
            <LeftMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setMenu} />
            <ReactDimmer
                isOpen={isMenuOpen}
                exitDimmer={setMenu}
                zIndex={1}
            />
        </>
    );
}

Header.defaultProps = {
    title: "HomeLife"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;