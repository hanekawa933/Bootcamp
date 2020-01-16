import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers, deleteUser } from '../../actions/auth';
import Dashboard from '../../components/layout/Dashboard';
import { Redirect } from 'react-router-dom';

const Users = ({ getAllUsers, deleteUser, auth: { dataUser, success, isAuthenticated } }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const content = dataUser.map(list => {
    return (
      <tr key={list.id}>
        <th scope="row">{list.id}</th>
        <td>{list.email}</td>
        <td>{list.username}</td>
        {/* <td>{list.password}</td> */}
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <td>
          <button className="btn btn-danger" onClick={e => deleteUser(list.id)}>
            Delete
          </button>
        </td>
        <td>
          <Link className="btn btn-primary" to={`/admin/update/users/id=${list.id}`}>
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
        <div className="">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <h3>Data of Users</h3>
          </div>
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                {/* <th scope="col">Password</th> */}
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
    </Fragment>
  );
};

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(Users);
