import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropDown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
const PopulatedNavBar = () => {
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
 </NavBar>
 );
};
export default PopulatedNavBar;