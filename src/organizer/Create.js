import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { create } from '../actions/event';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import FileUpload from '../upload/FileUpload';

const Create = ({ create, check, file, auth: { isAuthenticated } }) => {
  let [formData, setFromData] = useState({
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
    fileName: ''
  });

  let {
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
    fileName
  } = formData;

  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    create({
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
      fileName
    });
  };

  if (check) {
    return <Redirect to="/dashboard" />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="d-flex justify-content-center align-items-start">
      <div className="card card-width">
        <div className="card-header">
          <div className="card-text text-center">
            <h4>Create Events</h4>
          </div>
        </div>
        <div className="card-body">
          <FileUpload />
          <form className="form" encType="multipart/form-data" onSubmit={e => onSubmit(e)}>
            <label htmlFor="Created By">Organization</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="organizer"
                value={organizer}
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
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Category">Category</label>
              <select
                className="form-control"
                name="category"
                value={category}
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
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Terms & Agreement">Terms & Agreement</label>
              <input
                className="form-control"
                type="text"
                name="term"
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
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fileName">File Path</label>
              <br />
              <input
                type="text"
                name="fileName"
                value={(fileName = file.filePath)}
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

Create.propTypes = {
  create: PropTypes.func.isRequired,
  check: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  check: state.event.check,
  file: state.event.file
});

export default connect(mapStateToProps, { setAlert, create })(Create);
