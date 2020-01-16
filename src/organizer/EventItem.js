import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentEvent } from '../actions/event';
import { Link } from 'react-router-dom';
import { deleteEvent } from '../actions/event';

import notFound from '../img/notFound.png';

const EventItem = ({ getCurrentEvent, deleteEvent, auth, event: { event } }) => {
  useEffect(() => {
    getCurrentEvent();
  }, [getCurrentEvent]);

  const events = event.map(list => {
    return (
      <tr key={list.id}>
        <th scope="row">{list.id}</th>
        <td>{list.eventName}</td>
        <td>{list.venue}</td>
        <td>{list.dateStart}</td>
        <td>{list.dateEnd}</td>
        <td>{list.sold}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <td>
          <button className="btn btn-danger" onClick={e => deleteEvent(list.id)}>
            Delete
          </button>
        </td>
        <td>
          <Link
            className="btn btn-primary"
            to={`/dashboard/update-events/id=${list.id}&eventName=${list.eventName}`}
          >
            Update
          </Link>
        </td>
        <td>
          <Link className="btn btn-secondary" to={`/dashboard/events/list-buyer/id=${list.id}`}>
            View Buyer
          </Link>
        </td>
      </tr>
    );
  });

  const eventExists = (
    <div className="table-responsive">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Event Name</th>
            <th scope="">Venue</th>
            <th scope="">Start At</th>
            <th scope="">End At</th>
            <th scope="">Sold</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
            <th scope="col">View Buyer</th>
          </tr>
        </thead>
        <tbody>{events}</tbody>
      </table>
    </div>
  );

  const empty = (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img className="w-50 mb-4" src={notFound} alt="Event Not Found" />
      <h5>You have no active events</h5>
    </div>
  );

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <h4>Event You Already Created</h4>
      <div className="w-100 row d-flex justify-content-center align-items-center flex-row">
        {events.length > 0 ? eventExists : empty}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  getCurrentEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getCurrentEvent, deleteEvent })(EventItem);
