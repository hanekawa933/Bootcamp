import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventCategory } from '../actions/event';
import { Link } from 'react-router-dom';

//Images
import notFound from '../img/notFound.png';

const Category = ({ getEventCategory, auth, event: { event }, match }) => {
  useEffect(() => {
    getEventCategory(match.params.category);
  }, [getEventCategory, match.params.category]);

  const content = event.map(list => {
    return (
      <div className="col-4 mt-4" key={list.id}>
        <div className="card">
          <img className="img" src={list.fileName} alt="Event Images" />
          <div className="card-body text-center">
            <p className="card-title">{list.eventName}</p>
          </div>
          {/* eslint-disable-next-line */}
          <Link
            to={`/events/id=${list.id}&eventName=${list.eventName}`}
            className="stretched-link"
          ></Link>
        </div>
      </div>
    );
  });

  const empty = (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img className="w-50 mb-4" src={notFound} alt="Event Not Found" />
      <h5>There is no event created with this category</h5>
    </div>
  );

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h3>{match.params.category}</h3>
        <div className="d-flex justify-content-center align-items-center flex-row">
          {event.length > 0 ? content : empty}
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  getEventCategory: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getEventCategory })(Category);
