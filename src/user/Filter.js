import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventCategory } from '../actions/event';
import { Link } from 'react-router-dom';

const Filter = ({ getEventCategory, auth, event: { event }, match }) => {
  useEffect(() => {
    getEventCategory(match.params.category);
  }, [getEventCategory, match.params.category]);

  const [price, setPrice] = useState(true);

  const content = event.map(list => {
    return (
      <div className="col-4 mt-5" key={list.id}>
        <div className="card font-weight-bold">
          <div className="card-header"></div>
          <div className="card-body text-center">
            <img className="img" src={list.fileName} alt="Event Images" />
          </div>
          <div className="card-footer text-center">
            <p>{list.eventName}</p>
            <p>
              <i className="fas fa-calendar-alt"></i> {list.dateStart} to {list.dateEnd} |{' '}
              <i className="fas fa-location-arrow"></i> {list.venue}
            </p>
            <p>
              <i className="fas fa-dollar-sign"></i>
              {list.price}
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
  });

  const SortPrice = () => {
    setPrice(!price);
  };

  const sortPrice = event
    .sort((a, b) => a.price - b.price)
    .map(list => {
      return (
        <div className="col-4 mt-5" key={list.id}>
          <div className="card font-weight-bold">
            <div className="card-header"></div>
            <div className="card-body text-center">
              <img className="img" src={list.fileName} alt="Event Images" />
            </div>
            <div className="card-footer text-center">
              <p>{list.eventName}</p>
              <p>
                <i className="fas fa-calendar-alt"></i> {list.dateStart} to {list.dateEnd} |{' '}
                <i className="fas fa-location-arrow"></i> {list.venue}
              </p>
              <p>
                <i className="fas fa-dollar-sign"></i>
                {list.price}
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
    });

  // const sortName = event
  //   .sort((a, b) => b.price - a.price)
  //   .map(list => {
  //     return (
  //       <div className="col-4 mt-5" key={list.id}>
  //         <div className="card font-weight-bold">
  //           <div className="card-header"></div>
  //           <div className="card-body text-center">
  //             <img className="img" src={list.fileName} alt="Event Images" />
  //           </div>
  //           <div className="card-footer text-center">
  //             <p>{list.eventName}</p>
  //             <p>
  //               <i className="fas fa-calendar-alt"></i> {list.dateStart} to {list.dateEnd} |{' '}
  //               <i className="fas fa-location-arrow"></i> {list.venue}
  //             </p>
  //             <p>
  //               <i className="fas fa-dollar-sign"></i>
  //               {list.price}
  //             </p>
  //           </div>
  //           {/* eslint-disable-next-line */}
  //           <Link
  //             to={`/events/id=${list.id}&eventName=${list.eventName}`}
  //             className="stretched-link"
  //           ></Link>
  //         </div>
  //       </div>
  //     );
  //   });

  return (
    <div className="w-100">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/events/all-events">Events</Link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            All Event
          </li>
          <li class="breadcrumb-item" aria-current="page">
            Category
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {match.params.category}
          </li>
        </ol>
        <div class="dropdown d-flex justify-content-end">
          <button
            class="btn btn-secondary dropdown-toggle btn-sm"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter
          </button>
          <div
            class="dropdown-menu dropleft"
            style={{ border: 'none' }}
            aria-labelledby="dropdownMenuButton"
          >
            <button
              class="btn btn-light text-dark dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Category
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link class="dropdown-item" to="/events/all-events/filter/category=Music">
                Music
              </Link>
              <Link class="dropdown-item" to="/events/all-events/filter/category=Sport">
                Sport
              </Link>
              <Link class="dropdown-item" to="/events/all-events/filter/category=Traditional">
                Traditional
              </Link>
              <Link class="dropdown-item" to="/events/all-events/filter/category=Seminar">
                Seminar
              </Link>
              <Link class="dropdown-item" to="/events/all-events/filter/category=Dance">
                Dance
              </Link>
              <Link class="dropdown-item" to="/events/all-events/filter/category=Comedy">
                Comedy
              </Link>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle btn-sm ml-2"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" onClick={() => SortPrice()}>
                Price
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="row d-flex justify-content-start align-items-center">
        {price ? content : sortPrice}
      </div>
    </div>
  );
};

Filter.propTypes = {
  getEventCategory: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getEventCategory })(Filter);
