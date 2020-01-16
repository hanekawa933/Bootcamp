import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSpecificEvent, addViews } from '../actions/event';
import { Link } from 'react-router-dom';

const ListEvent = ({
  getSpecificEvent,
  addViews,
  auth,
  event: { event, specificEvent },
  match,
  check,
  check2
}) => {
  useEffect(() => {
    getSpecificEvent(match.params.id, match.params.eventName);
  }, [getSpecificEvent, match.params.id, match.params.eventName]);

  if (check2) {
    addViews(match.params.id, match.params.eventName);
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center flex-row">
      <div className="image">
        <img src={specificEvent.fileName} className="img" alt="Background Event" />
      </div>
      <div className="text-left ml-5">
        <h3>{specificEvent.eventName}</h3>
        <h5>Description</h5>
        <p>{specificEvent.description}</p>
        <h5>Our Guest</h5>
        <p>{specificEvent.artist}</p>
        <h5>Requirement</h5>
        <h5>Purchase Conditions</h5>
        <p>{specificEvent.requirement}</p>
        <h5>Ticket Redemption</h5>
        <p>{specificEvent.redeem}</p>
        <h5>Terms and Conditions on Event</h5>
        <p>{specificEvent.term}</p>
        <h5>Venue</h5>
        <p>{specificEvent.venue}</p>
        <p>Price</p>
        <p>Rp.{specificEvent.price}</p>
        <h5>Ticket Available</h5>
        <p>{specificEvent.available > 0 ? specificEvent.available : 'Sold Out'}</p>
        <h5>Ticket</h5>
        {specificEvent.available > 0 ? (
          <Link
            to={`/events/ticket/id=${specificEvent.id}&eventName=${specificEvent.eventName}`}
            className="btn btn-primary"
          >
            Book Now
          </Link>
        ) : (
          <Link
            to={`/events/id=${specificEvent.id}&eventName=${specificEvent.eventName}`}
            className="btn btn-primary"
          >
            Sold Out
          </Link>
        )}
      </div>
    </div>
  );
};

ListEvent.propTypes = {
  getSpecificEvent: PropTypes.func.isRequired,
  addViews: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  check: (state.buyer.check = false),
  check2: state.event.check2
});

export default connect(mapStateToProps, { getSpecificEvent, addViews })(ListEvent);
