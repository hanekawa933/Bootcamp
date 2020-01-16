import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { searchResult } from '../actions/event';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import notFound from '../img/notFound.png';

const BookModal = ({ searchResult, event: { event, result }, check, match }) => {
  useEffect(() => {
    searchResult(match.params.searchForm);
  }, [searchResult, match.params.searchForm]);

  const content = result.map(list => {
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
          {console.log(list.fileName)}
        </div>
      </div>
    );
  });

  const empty = (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img className="w-50 mb-4" src={notFound} alt="Event Not Found" />
      <h5>There is no event found with your keyword</h5>
    </div>
  );

  return (
    <section className="d-flex justify-content-center align-items-start">
      {result.length > 0 ? content : empty}
    </section>
  );
};

BookModal.propTypes = {
  searchResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { searchResult })(BookModal);
