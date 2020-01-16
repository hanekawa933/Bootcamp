import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { admin } from '../actions/auth';

const Login = ({ admin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    admin(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <section className="login d-flex justify-content-center align-items-start">
      <div className="card w-50">
        <div className="card-header">
          <div className="card-text text-center">
            <h4>LoginAdmin</h4>
          </div>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  admin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { admin })(Login);
