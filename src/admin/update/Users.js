import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { update, getUserById } from '../../actions/auth';
import PropTypes from 'prop-types';
import Dashboard from '../../components/layout/Dashboard';
import { Redirect } from 'react-router-dom';

const Users = ({ getUserById, update, setAlert, match, auth: { isAuthenticated } }) => {
  useEffect(() => {
    getUserById(match.params.id);
  }, [getUserById, match.params.id]);

  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: ''
  });

  const { username, email, password, isAdmin } = formData;

  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    update({ username, email, password, isAdmin }, match.params.id);
    setAlert();
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Dashboard />
      <section className="login d-flex justify-content-center align-items-start">
        <div className="card w-100">
          <div className="card-header">
            <div className="card-text text-center">
              <h4>Update Users</h4>
            </div>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Is Admin"
                  name="isAdmin"
                  value={isAdmin}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Update User</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Users.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { setAlert, getUserById, update })(Users);
