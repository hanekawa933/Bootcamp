import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerAdmin } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Dashboard from '../../components/layout/Dashboard';

const Users = ({ setAlert, registerAdmin, auth: { isAuthenticated }, check }) => {
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      registerAdmin({ username, email, password });
    }
  };

  if (check) {
    return <Redirect to="/admin/dashboard" />;
  }

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
              <h4>Create Account</h4>
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
                  type="password"
                  placeholder="Verify Password"
                  name="password2"
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Create Account</button>
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
  registerAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  check: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  check: state.auth.check,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { setAlert, registerAdmin })(Users);
