import React from 'react';
import { updateSold, updateSold2 } from '../actions/event';
import { validUpdate } from '../actions/buyer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';

const Confirm = ({ updateSold, updateSold2, validUpdate, match, event: { isUpdate } }) => {
  if (isUpdate) {
    updateSold(match.params.qty, match.params.id, match.params.eventName, match.params.qty);
    updateSold2(match.params.qty, match.params.id, match.params.qty);
    validUpdate(match.params.id);
    setAlert();
  }

  return <div></div>;
};

Confirm.propTypes = {
  updateSold: PropTypes.func.isRequired,
  updateSold2: PropTypes.func.isRequired,
  validUpdate: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  buyer: state.buyer,
  isUpdate: state.event.isUpdate
});

export default connect(mapStateToProps, { updateSold, updateSold2, validUpdate })(Confirm);
