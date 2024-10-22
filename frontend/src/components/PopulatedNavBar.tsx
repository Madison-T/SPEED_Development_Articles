import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
import { useAuth } from "../context/authContext"; // Import Auth context
import { useRouter } from "next/router";

const PopulatedNavBar = () => {
  const { isLoggedIn, logout, userType } = useAuth(); // Get user role and state
  const router = useRouter();

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    } else if (userType === "User" || userType === "Admin") {
      router.push("/search"); // Allow User and Admin to access search
    } else {
      router.push("/access-denied"); // Deny access for other roles
    }
  };

  const handleQueueClick = () => {
    if (userType === "Moderator") {
      router.push("/moderation-queue"); // Redirect Moderator to Moderation Queue
    } else if (userType === "Analyst") {
      router.push("/analysis-queue"); // Redirect Analyst to Analysis Queue
    }
  };

  const handleLogout = async () => {
    await logout(); // Ensure logout completes
    router.replace("/"); // Redirect to home page after logout
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>

      {/* Admin Dropdown with Options */}
      {userType === "Admin" && (
        <NavItem dropdown>
          Options <IoMdArrowDropdown />
          <NavDropDown>
            <NavItem route="/articles">View Articles</NavItem>
            <NavItem route="/articles/new">Submit New</NavItem>
            <NavItem onClick={handleSearchClick}>Search</NavItem>
            <NavItem route="/moderation-queue">Moderation Queue</NavItem>
            <NavItem route="/analysis-queue">Analysis Queue</NavItem>
          </NavDropDown>
        </NavItem>
      )}

      {/* User Dropdown with Articles Only */}
      {userType === "User" && (
        <NavItem dropdown>
          Articles <IoMdArrowDropdown />
          <NavDropDown>
            <NavItem route="/articles">View Articles</NavItem>
            <NavItem route="/articles/new">Submit New</NavItem>
            <NavItem onClick={handleSearchClick}>Search</NavItem>
          </NavDropDown>
        </NavItem>
      )}

      {/* Queue Button for Moderator and Analyst */}
      {(userType === "Moderator" || userType === "Analyst") && (
        <NavItem onClick={handleQueueClick}>Queue</NavItem>
      )}

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
