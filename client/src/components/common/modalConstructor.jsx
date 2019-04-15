import React from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import Close from '@material-ui/icons/CloseRounded';

import Button from './button';

const CloseButton = styled(Button)`
  color: #e2e2e2;
  background: transparent;
`;

const Header = styled.div`
  border-radius: 10px 10px 0 0;
  color: ${props => props.theme.primaryText};
  background: ${props => props.theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
`;
const Background = styled.div`
  border-radius: 10px;
  height: 100vh;
  background: white;
  @media screen and (min-width: 480px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 50%;
  }
`;

const ModalConstructor = ({
  open,
  title,
  handleOpen,
  handleClose,
  openText,
  closeText,
  children,
}) => (
  <>
    <Modal open={open}>
      <Background>
        <Header>
          <h2>{title || openText}</h2>
          <CloseButton onClick={handleClose || handleOpen} color="primary">
            {closeText || <Close />}
          </CloseButton>
        </Header>
        {children}
      </Background>
    </Modal>
  </>
);

export default ModalConstructor;
