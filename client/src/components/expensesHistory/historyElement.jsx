import React from 'react';
import styled from 'styled-components';
import Close from '@material-ui/icons/CloseRounded';
import myButton from '../common/button';

const Button = styled(myButton)`
  && {
    background: transparent;
    padding: 0;
    height: 100%;
    color: ${props => props.theme.primaryColor};
  }
`;
const Color = styled.div`
  margin: 1rem;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: ${props => props.color};
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Text = styled.span`
  display: block;
`;

const HistoryElement = React.memo(({ expense, expTypes, onDelete }) => {
  const TypeObject =
    expTypes[expTypes.findIndex(type => type.id === expense.expTypeId)];
  return (
    <Row>
      <Color color={TypeObject.color} />
      <Container>
        <Text>
          <em>{TypeObject.name}</em>
        </Text>
        <Text>
          {expense.amount}
          <Button onClick={() => onDelete(expense.id)}>
            <Close />
          </Button>
        </Text>
      </Container>
    </Row>
  );
});

export default HistoryElement;
