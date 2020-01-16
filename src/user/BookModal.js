import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { buy } from '../actions/buyer';
import { getSpecificEvent } from '../actions/event';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const BookModal = ({
  getSpecificEvent,
  event: { event, specificEvent },
  buy,
  check,
  match,
  loading,
  setAlert
}) => {
  useEffect(() => {
    getSpecificEvent(match.params.id, match.params.eventName);
  }, [getSpecificEvent, match.params.id, match.params.eventName]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    quantity: 0,
    price: '',
    kk: ''
  });

  let { name, email, telephone, quantity, price, kk } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    buy({ name, email, telephone, quantity, price, kk }, match.params.id, match.params.eventName);
    setAlert('Success, Please check your email to verify your purchasement', 'success');
  };

  if (check) {
    return <Redirect to={`/events/id=${specificEvent.id}&eventName=${specificEvent.eventName}`} />;
  }

  return (
    <section className="d-flex justify-content-center align-items-start">
      <div className="card w-50">
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
                type="email"
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
                max={specificEvent.available}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Price">Price</label>
              <input
                className="form-control"
                type="text"
                name="price"
                value={(price = specificEvent.price * quantity)}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

BookModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  buy: PropTypes.func.isRequired,
  getSpecificEvent: PropTypes.func.isRequired,
  check: PropTypes.bool
};

const mapStateToProps = state => ({
  check: state.buyer.check,
  event: state.event,
  loading: state.buyer.loading
});

export default connect(mapStateToProps, { setAlert, buy, getSpecificEvent })(BookModal);
