import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Exit from '@material-ui/icons/ExitToAppRounded';

import { logoutUser } from '../actions/auth';

const StyledLink = styled(Link)`
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
  padding: 0 0.5rem;
  border: none;
  background: none;
`;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const Navbar = ({ isAuthenticated, logoutUser }) => (
  <div
    css={`
      flex-grow: 1;
    `}
  >
    <AppBar position="static">
      <Toolbar
        css={`
          background: ${props => props.theme.primaryColor};
        `}
      >
        <StyledLink
          to="/"
          css={`
            flex-grow: 1;
          `}
        >
          Expenses
        </StyledLink>
        {isAuthenticated ? (
          <StyledLink
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            as="button"
            href="#"
            onClick={() => logoutUser()}
          >
            LogOut
            <Exit
              css={`
                padding-left: 10px;
                font-size: 30px !important;
              `}
            />
          </StyledLink>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
