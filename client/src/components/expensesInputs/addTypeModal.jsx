import React from 'react';
import { connect } from 'react-redux';
import Button from '../common/button';

import { toggleModal, addExpType } from '../../actions/actions';
import ModalConstructor from '../common/modalConstructor';
import AddType from './addType';

const mapStateToProps = state => {
  return {
    open: state.expensesApp.modals.addType,
    expTypes: state.expensesApp.expTypes,
  };
};
const AddTypeModal = ({ open, addExpType, toggleModal, expTypes }) => {
  const handelToggle = () => toggleModal('addType');
  return (
    <>
      <ModalConstructor
        openText="+"
        title="Add new type"
        open={open}
        handleOpen={handelToggle}
      >
        <AddType
          toggleModal={handelToggle}
          addExpType={addExpType}
          expTypes={expTypes}
        />
      </ModalConstructor>
      <Button onClick={handelToggle}>+</Button>
    </>
  );
};
export default connect(
  mapStateToProps,
  {
    toggleModal,
    addExpType,
  }
)(AddTypeModal);
