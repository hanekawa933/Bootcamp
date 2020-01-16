import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getValidBuyer } from '../actions/buyer';
import { Redirect } from 'react-router-dom';

const ListBuyer = ({
  getValidBuyer,
  buyer: { specificBuyer },
  match,
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getValidBuyer(match.params.buyer_id);
  }, [getValidBuyer, match.params.buyer_id]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const content = specificBuyer.map(list => {
    return (
      <tr key={list.id}>
        <th scope="row">{list.id}</th>
        <td>{list.name}</td>
        <td>{list.email}</td>
        <td>{list.kk}</td>
        <td>{list.telephone}</td>
        <td>{list.quantity}</td>
      </tr>
    );
  });

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="create-event d-flex justify-content-end align-items-center mb-2">
          <h3>Data of Buyers</h3>
        </div>
        <div className="table-responsive">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">National Identity Number</th>
                <th scope="col">Telephone</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ListBuyer.propTypes = {
  getValidBuyer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  buyer: state.buyer
});

export default connect(mapStateToProps, { getValidBuyer })(ListBuyer);
