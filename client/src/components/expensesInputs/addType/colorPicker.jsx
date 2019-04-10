import React from 'react';
import TwitterPicker from 'react-color/lib/Twitter';
import styled from 'styled-components';

const Swatch = styled.div`
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const Color = styled.div`
  width: 4rem;
  height: 2rem;
  border-radius: 7px;
  background: ${props => props.color};
`;

export const ColorPicker = React.memo(
  ({ handleClick, color, display, handleClose, handleColorChange }) => (
    <div>
      <Swatch onClick={handleClick}>
        <Color color={color} />
      </Swatch>
      {display ? (
        <Popover>
          <Cover onClick={handleClose} />
          <TwitterPicker color={color} onChange={handleColorChange} />
        </Popover>
      ) : null}
    </div>
  )
);
