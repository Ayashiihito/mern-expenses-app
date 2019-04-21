import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Exit from '@material-ui/icons/ExitToAppRounded';

import { logoutUser } from '../redux/actions/auth';

const StyledLink = styled(Link)`
  color: ${props => props.theme.primaryText};
  text-decoration: none;
  text-shadow: ${props => props.theme.shadow};
  padding: 1rem 1.5rem;
  border-radius: 5%;
  border: none;
  background: none;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const Avatar = styled.img`
  size: 45px;
  margin: 0 0.5rem;
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadow};
`;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  avatarSmall: state.auth.user.avatarSmall,
});

const Navbar = ({ isAuthenticated, logoutUser, avatarSmall }) => (
  <AppBar position="static">
    <Toolbar
      css={`
        background: ${props => props.theme.primary};
        justify-content: space-between;
      `}
    >
      <StyledLink
        to="/"
        css={`
          &:hover {
            //override button hover
            background: ${props => props.theme.primary};
          }
        `}
      >
        Expenses
      </StyledLink>
      <div>
        {isAuthenticated ? (
          <div
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            <Avatar
              src={avatarSmall}
              alt="Visit gravatar.com to set profile image"
            />
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
              Log Out
              <Exit
                css={`
                  padding-left: 10px;
                  font-size: 30px !important;
                `}
              />
            </StyledLink>
          </div>
        ) : null}
      </div>
    </Toolbar>
  </AppBar>
);

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
