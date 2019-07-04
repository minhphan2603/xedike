import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Store/Action/auth";

class Header extends React.Component {
  render() {
    const { isAuthenticated, onLogOut } = this.props;

    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            <h2>XE ĐI KÉ </h2>
          </NavbarBrand>
          {isAuthenticated ? (
            <Nav>
              <NavItem className="mx-3">
                <Link to="/profile">
                  <h3>Profile</h3>
                </Link>
              </NavItem>
              <NavItem className="mx-3">
                <Link onClick={onLogOut} to="/">
                  <h3>Log out</h3>
                </Link>
              </NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem className="mx-3">
                <Link to="/login">
                  <h3>Log in</h3>
                </Link>
              </NavItem>
              <NavItem className="mx-3">
                <Link to="/register">
                  <h3>Register</h3>
                </Link>
              </NavItem>
            </Nav>
          )}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
