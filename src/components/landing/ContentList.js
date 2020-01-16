import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvent } from '../../actions/event';

const ContentList = ({ getAllEvent, auth, event: { event } }) => {
  useEffect(() => {
    getAllEvent();
  }, [getAllEvent]);

  const content = event
    .sort((a, b) => b.views - a.views)
    .map(list => {
      return (
        <div className="col-6 mt-5" key={list.id}>
          <div className="card font-weight-bold">
            <div className="card-header"></div>
            <div className="card-body text-center">
              <img className="img" src={list.fileName} alt="Event Images" />
            </div>
            <div className="card-footer text-center">
              <p>{list.eventName}</p>
              <p>
                <i className="fas fa-calendar-alt"></i> {list.dateStart} to {list.dateEnd}
              </p>
              <p>
                <i className="fas fa-location-arrow"></i> {list.venue}
              </p>
            </div>
            {/* eslint-disable-next-line */}
            <Link
              to={`/events/id=${list.id}&eventName=${list.eventName}`}
              className="stretched-link"
            ></Link>
          </div>
        </div>
      );
    })
    .slice(0, 4);

  return (
    <div className="events-list">
      <div className="row d-flex justify-content-center align-items-center">{content}</div>
    </div>
  );
};

ContentList.propTypes = {
  getAllEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getAllEvent })(ContentList);
