import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvent } from '../actions/event';

const MoreEvents = ({ getAllEvent, auth, event: { event } }) => {
  useEffect(() => {
    getAllEvent();
  }, [getAllEvent]);

  // const [price, setPrice] = useState(true);
  const [arr, setArr] = useState(9);
  const addArr = () => {
    setArr(arr + 6);
  };

  console.log(arr);

  const content = event
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
    .slice(0, arr);

  // const SortPrice = () => {
  //   setPrice(!price);
  // };

  // const sortPrice = event
  //   .sort((a, b) => a.price - b.price)
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
          {/* <div class="dropdown">
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
          </div> */}
        </div>
      </nav>
      <div className="row d-flex justify-content-start align-items-center">{content}</div>
      <button className="mt-5 d-flex mx-auto btn btn-primary" onClick={addArr}>
        Load More
      </button>
    </div>
  );
};

MoreEvents.propTypes = {
  getAllEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getAllEvent })(MoreEvents);
