import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
import { useAuth } from "../context/authContext"; // Import useAuth from auth context

const PopulatedNavBar = () => {
  const { user, logout } = useAuth();  // Destructure user and logout from useAuth context

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

      {/* Add login/logout button */}
      {user ? (
        <NavItem onClick={logout} end>
          Logout
        </NavItem>
      ) : (
        <NavItem route="/login" end>
          Login
        </NavItem>
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
