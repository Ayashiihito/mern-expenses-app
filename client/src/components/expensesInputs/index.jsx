import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import mTextField from '@material-ui/core/TextField';
import Button from '../common/button';

import { addExpense, setTo } from '../../redux/actions/actions';
import AddTypeModal from './addTypeModal';
import ExpensesTypeSelect from './expensesTypeSelect';

const TextField = styled(mTextField)`
&&{
  margin-left: 1rem;
}
`;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;
const Container = styled.div`
  margin: 0.5rem;
  min-width: 15rem;
  display: flex;
  align-items: flex-end;
`;

const mapStateToProps = state => ({
  expTypes: state.expensesApp.expTypes,
});

const ExpensesInputs = React.memo(({ expTypes, addExpense, setTo }) => {
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const selectedTypeId = expTypes.filter(
      type => type.name === selectedType
    )[0].id;
    addExpense(parseInt(amount), selectedTypeId);
    setTo(new Date());
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Container>
        <Button type="submit">Confirm</Button>
        <TextField
          required
          type="number"
          label="Amount spent"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          inputProps={{
            min: '1',
          }}
          margin="none"
        />
      </Container>
      <Container>
        <AddTypeModal />
        <ExpensesTypeSelect
          selectedType={selectedType}
          handleChange={e => setSelectedType(e.target.value)}
          expTypes={expTypes}
        />
      </Container>
    </FormContainer>
  );
});

export default connect(
  mapStateToProps,
  { addExpense, setTo }
)(ExpensesInputs);
