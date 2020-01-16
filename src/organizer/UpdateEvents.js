import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { getSpecificEvent, update } from '../actions/event';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const UpdateEvents = ({
  getSpecificEvent,
  setAlert,
  update,
  check,
  event: { event, specificEvent },
  match,
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getSpecificEvent(match.params.id, match.params.eventName);
  }, [getSpecificEvent, match.params.eventName, match.params.id]);

  const [formData, setFromData] = useState({
    organizer: '',
    eventName: '',
    dateStart: '',
    dateEnd: '',
    artist: '',
    category: '',
    requirement: '',
    term: '',
    redeem: '',
    venue: '',
    city: '',
    price: '',
    quantity: '',
    description: '',
    photo: '',
    sold: '',
    available: ''
  });

  const {
    organizer,
    eventName,
    dateStart,
    dateEnd,
    artist,
    category,
    requirement,
    term,
    redeem,
    venue,
    city,
    price,
    quantity,
    description,
    photo,
    sold,
    available
  } = formData;

  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    update(
      {
        organizer,
        eventName,
        dateStart,
        dateEnd,
        artist,
        category,
        requirement,
        term,
        redeem,
        venue,
        city,
        price,
        quantity,
        description,
        photo
      },
      match.params.id,
      match.params.eventName
    );
    setAlert();
  };

  if (check) {
    return <Redirect to="/dashboard" />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <section className="d-flex justify-content-center align-items-start">
        <div className="card w-100">
          <div className="card-header">
            <div className="card-text text-center">
              <h4>Update Events</h4>
            </div>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <label htmlFor="Oragnized By">Organization</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="organizer"
                  value={organizer}
                  placeholder={specificEvent.organizer}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Event Name">Event Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="eventName"
                  value={eventName}
                  placeholder={specificEvent.eventName}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Date Start">Date Start</label>
                <input
                  className="form-control"
                  type="date"
                  name="dateStart"
                  value={dateStart}
                  placeholder={specificEvent.dateStart}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Date End">Date End</label>
                <input
                  className="form-control"
                  type="date"
                  name="dateEnd"
                  value={dateEnd}
                  placeholder={specificEvent.dateEnd}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Category">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={category}
                  placeholder={specificEvent.category}
                  onChange={e => onChange(e)}
                >
                  <option value="">Select</option>
                  <option value="Music">Music</option>
                  <option value="Sport">Sport</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Dance">Dance</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Artist">Artist</label>
                <input
                  className="form-control"
                  type="text"
                  name="artist"
                  value={artist}
                  placeholder={specificEvent.artist}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Requirement">Requirement</label>
                <input
                  className="form-control"
                  type="text"
                  name="requirement"
                  value={requirement}
                  placeholder={specificEvent.requirement}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Terms & Agreement">Terms & Agreement</label>
                <input
                  className="form-control"
                  type="text"
                  name="term"
                  placeholder={specificEvent.term}
                  value={term}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Redeem Instruction">Redeem Instruction</label>
                <input
                  className="form-control"
                  type="text"
                  name="redeem"
                  placeholder={specificEvent.redeem}
                  value={redeem}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Venue">Venue</label>
                <input
                  className="form-control"
                  type="text"
                  name="venue"
                  placeholder={specificEvent.venue}
                  value={venue}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="City">City</label>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder={specificEvent.city}
                  value={city}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  placeholder={specificEvent.price}
                  value={price}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantity">Quantity</label>
                <input
                  className="form-control"
                  type="text"
                  name="quantity"
                  placeholder={specificEvent.quantity}
                  value={quantity}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder={specificEvent.description}
                  value={description}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Sold">Sold</label>
                <input
                  className="form-control"
                  type="text"
                  name="sold"
                  placeholder={specificEvent.sold}
                  value={sold}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Available">Available</label>
                <input
                  className="form-control"
                  type="text"
                  name="available"
                  placeholder={specificEvent.available}
                  value={available}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Photo">Photo</label>
                <br />
                <input type="file" name="photo" value={photo} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Update Event</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

UpdateEvents.propTypes = {
  update: PropTypes.func.isRequired,
  check: PropTypes.bool,
  getSpecificEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  event: state.event,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { setAlert, update, getSpecificEvent })(UpdateEvents);
