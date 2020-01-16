import React, { Fragment } from 'react';
import ContentList from './ContentList';
import { Link } from 'react-router-dom';

//image

const Contents = () => {
  return (
    <Fragment>
      <section className="section-content-events mt-5 d-flex justify-content-center align-items-center flex-column">
        <h4 className="text-dark text-center mb-5">Popular Events</h4>
        <ContentList />
        <Link to="/events/all-events" className="btn btn-dark mt-5 mb-5">
          View More Events
        </Link>
      </section>
    </Fragment>
  );
};

export default Contents;
