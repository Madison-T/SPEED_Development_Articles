// PopulatedNavBar.tsx
import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
import { useAuth } from "../context/authContext"; // Import the Auth context

const PopulatedNavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Get login state and logout function from context

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
        <NavItem onClick={logout} end style={{ marginLeft: "auto" }}>
          Logout
        </NavItem>
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
