import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the token is present in localStorage to determine login status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    setIsLoggedIn(false);              // Update the state
    router.push('/');                  // Redirect to home page
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

          {/* Conditionally render the Search option if the user is logged in */}
          {isLoggedIn && (
            <NavItem route="/search">Search</NavItem>
          )}
        </NavDropDown>
      </NavItem>

      {/* Conditional rendering of Login/Logout */}
      {isLoggedIn ? (
        <NavItem onClick={handleLogout}>
          Logout
        </NavItem>
      ) : (
        <NavItem route="/login">
          Login
        </NavItem>
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
