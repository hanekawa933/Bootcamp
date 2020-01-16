import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvent, deleteEvent } from '../../actions/event';
import Dashboard from '../../components/layout/Dashboard';
import { Redirect } from 'react-router-dom';

const Events = ({ getAllEvent, deleteEvent, auth: { isAuthenticated }, event: { event } }) => {
  useEffect(() => {
    getAllEvent();
  }, [getAllEvent]);

  const content = event.map(list => {
    return (
      <tr key={list.id}>
        <th scope="row">{list.id}</th>
        <td>{list.event_id}</td>
        <td>{list.organizer}</td>
        <td>{list.eventName}</td>
        <td>{list.dateStart}</td>
        <td>{list.dateEnd}</td>
        <td>{list.artist}</td>
        <td>{list.category}</td>
        <td>{list.requirement}</td>
        <td>{list.term}</td>
        <td>{list.redeem}</td>
        <td>{list.venue}</td>
        <td>{list.city}</td>
        <td>{list.price}</td>
        <td>{list.quantity}</td>
        <td>{list.description}</td>
        <td>{list.sold}</td>
        <td>{list.available}</td>
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
            to={`/admin/update/events/id=${list.id}&eventName=${list.eventName}`}
          >
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
        <div className="row d-flex justify-content-center align-items-center">
          <div className="create-event d-flex justify-content-end align-items-center mb-2">
            <h3>Data of Events</h3>
          </div>
          <div className="table-responsive">
            <table className="table  table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Created By User Of ID</th>
                  <th scope="col">Organizer</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Date Start</th>
                  <th scope="col">Date End</th>
                  <th scope="col">Artist</th>
                  <th scope="col">Category</th>
                  <th scope="col">Requirement</th>
                  <th scope="col">Term</th>
                  <th scope="col">Redeem</th>
                  <th scope="col">Venue</th>
                  <th scope="col">City</th>
                  <th scope="col">Price</th>
                  <th scope="col">Ticket Quantity</th>
                  <th scope="col">Description</th>
                  <th scope="col">Sold</th>
                  <th scope="col">Ticket Available</th>
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
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  getAllEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { getAllEvent, deleteEvent })(Events);
