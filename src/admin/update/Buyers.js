import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { update, getBuyer } from '../../actions/buyer';
import PropTypes from 'prop-types';
import Dashboard from '../../components/layout/Dashboard';
import { Redirect } from 'react-router-dom';

const Buyers = ({
  update,
  setAlert,
  getBuyer,
  match,
  buyer: { specificBuyer },
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getBuyer(match.params.id);
  }, [getBuyer, match.params.id]);

  let [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    quantity: '',
    price: '',
    kk: ''
  });

  let { name, email, telephone, quantity, price, kk } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    update({ name, email, telephone, quantity, price, kk }, match.params.id);
    setAlert();
  };

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
              <h4>Update Buyers</h4>
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
                  value={(price = specificBuyer.price * quantity)}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Update Buyer</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Buyers.propTypes = {
  update: PropTypes.func.isRequired,
  getBuyer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  buyer: state.buyer,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { setAlert, update, getBuyer })(Buyers);
