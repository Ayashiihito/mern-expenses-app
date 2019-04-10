import React from 'react';
import mSelect from '@material-ui/core/Select';
import styled from 'styled-components';

const Select = styled(mSelect)`
  width: 100%;
  margin-left: 1rem;
`;

const ExpensesTypeSelect = ({ selectedType, handleChange, expTypes }) => {
  return (
    <Select
      native
      required
      displayEmpty
      name="selectedType"
      value={selectedType}
      onChange={handleChange}
    >
      <option value="" disabled>
        Select expense type
      </option>
      {expTypes.map(type => (
        <option key={type.id} value={type.name}>
          {type.name}
        </option>
      ))}
    </Select>
  );
};

export default ExpensesTypeSelect;
