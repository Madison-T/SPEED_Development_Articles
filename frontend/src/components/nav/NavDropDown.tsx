import React from "react";
import styles from "./Nav.module.scss";
type Props = {
 children?: React.ReactNode;
};
const NavDropDown = ({ children }: Props) => {
 return <div className={styles.dropdown_container}>{children}</div>;
};

export default NavDropDown;