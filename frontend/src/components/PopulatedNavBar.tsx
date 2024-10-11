// PopulatedNavBar.tsx
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logout state
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropDown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
        </NavDropDown>
      </NavItem>
      {!isLoggedIn ? (
        <NavItem route="/login" end style={{ marginLeft: "auto" }}>
          Login
        </NavItem>
      ) : (
        <NavItem onClick={handleLogout} end style={{ marginLeft: "auto" }}>
          Logout
        </NavItem>
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
