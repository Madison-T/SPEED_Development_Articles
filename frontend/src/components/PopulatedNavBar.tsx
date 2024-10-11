// src/components/PopulatedNavBar.tsx
import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
import { useAuth } from "../context/authContext"; // Import the Auth context
import { useRouter } from "next/router";

const PopulatedNavBar = () => {
  const { isLoggedIn, logout, userType } = useAuth(); // Get login state and user role from context
  const router = useRouter();

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login page if not logged in
    } else if (userType !== "User") {
      router.push("/access-denied"); // Redirect to access-denied for non-users
    } else {
      router.push("/search"); // Redirect to search page for users
    }
  };

  const handleLogout = () => {
    logout(); // Log out the user (regardless of type)
    router.push("/"); // Redirect to the home page after logging out
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown>
        Articles <IoMdArrowDropdown />
        <NavDropDown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
          <NavItem onClick={handleSearchClick}>Search</NavItem>
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
