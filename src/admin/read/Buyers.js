import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBuyer, deleteBuyer } from '../../actions/buyer';
import Dashboard from '../../components/layout/Dashboard';
import { Redirect } from 'react-router-dom';

const Buyers = ({ getAllBuyer, deleteBuyer, auth: { isAuthenticated }, buyer: { buyer } }) => {
  useEffect(() => {
    getAllBuyer();
  }, [getAllBuyer]);

  const content = buyer.map(list => {
    return (
      <tr key={list.id}>
        <th scope="row">{list.id}</th>
        <td>{list.name}</td>
        <td>{list.email}</td>
        <td>{list.kk}</td>
        <td>{list.telephone}</td>
        <td>{list.quantity}</td>
        <td>{list.price}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <td>
          <button className="btn btn-danger" onClick={e => deleteBuyer(list.id)}>
            Delete
          </button>
        </td>
        <td>
          <Link className="btn btn-primary" to={`/admin/update/buyers/id=${list.id}`}>
            Update
          </Link>
        </td>
      </tr>
    );
  });

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Dashboard />
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
                  <th scope="col">Price</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated At</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Buyers.propTypes = {
  getAllBuyer: PropTypes.func.isRequired,
  deleteBuyer: PropTypes.func.isRequired,
  buyer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  buyer: state.buyer,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { getAllBuyer, deleteBuyer })(Buyers);
