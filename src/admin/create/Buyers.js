import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { buy } from '../../actions/buyer';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../../components/layout/Dashboard';

const Buyers = ({ buy, check, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    quantity: '',
    kk: '',
    price: ''
  });

  const { name, email, telephone, quantity, kk, price } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    buy({ name, email, telephone, quantity, kk, price });
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
      <section className="d-flex justify-content-center align-items-start">
        <div className="card w-100">
          <div className="card-header">
            <div className="card-text text-center">
              <h4>Confirm Payment</h4>
            </div>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <label htmlFor="Name">Name</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nomor Kartu Keluarga">National Identity Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="kk"
                  value={kk}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Telephone">Telephone</label>
                <input
                  className="form-control"
                  type="text"
                  name="telephone"
                  value={telephone}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantity">Quantity</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={e => onChange(e)}
                  min="1"
                  max="2147483647"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  value={price}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Create Buyer</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Buyers.propTypes = {
  buy: PropTypes.func.isRequired,
  check: PropTypes.bool
};

const mapStateToProps = state => ({
  check: state.buyer.check,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { setAlert, buy })(Buyers);
