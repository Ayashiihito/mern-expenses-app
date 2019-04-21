import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import Button from '../../common/button';
import { ColorPicker } from './colorPicker';

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  margin: 3rem;
  display: flex;
  align-items: flex-end;
`;

const AddType = ({ addExpType, toggleModal, expTypes }) => {
  const [typeName, setTypeName] = useState('');
  const [color, setColor] = useState('#1dc291');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const typeInput = useRef();
  const handleDisplay = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleTypeNameChange = event => {
    typeInput.current.setCustomValidity('');
    setTypeName(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    // stop bubbling to prevent outer form from submitting
    event.stopPropagation();

    if (expTypes.map(type => type.name).includes(typeName)) {
      typeInput.current.setCustomValidity('This type is already in the list');
      typeInput.current.reportValidity();
      return;
    }
    addExpType(typeName, color);
    toggleModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <TextField
          required
          name="typeName"
          label="New type name"
          value={typeName}
          onChange={handleTypeNameChange}
          margin="none"
          inputProps={{
            ref: typeInput,
          }}
        />
        <ColorPicker
          color={color}
          handleClick={handleDisplay}
          display={displayColorPicker}
          handleClose={handleDisplay}
          handleColorChange={color => setColor(color.hex)}
        />
      </Container>
      <Button type="submit">Confirm</Button>
    </Form>
  );
};

export default AddType;
