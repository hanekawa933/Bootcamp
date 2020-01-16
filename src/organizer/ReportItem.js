import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentEvent, countCategory } from '../actions/event';
import { Pie } from 'react-chartjs-2';

import notFound from '../img/notFound.png';

const EventItem = ({
  getCurrentEvent,
  countCategory,
  auth: { user, loading },
  event: { event },
  traditional,
  music,
  comedy,
  sport,
  seminar,
  dance
}) => {
  useEffect(() => {
    getCurrentEvent();
  }, [getCurrentEvent]);

  useEffect(() => {
    countCategory('Traditional', user.id, 'COUNT_TRADITIONAL');
  }, [countCategory, user.id]);

  useEffect(() => {
    countCategory('Music', user.id, 'COUNT_MUSIC');
  }, [countCategory, user.id]);

  useEffect(() => {
    countCategory('Comedy', user.id, 'COUNT_COMEDY');
  }, [countCategory, user.id]);

  useEffect(() => {
    countCategory('Seminar', user.id, 'COUNT_SEMINAR');
  }, [countCategory, user.id]);

  useEffect(() => {
    countCategory('Dance', user.id, 'COUNT_DANCE');
  }, [countCategory, user.id]);

  useEffect(() => {
    countCategory('Sport', user.id, 'COUNT_SPORT');
  }, [countCategory, user.id]);

  const data = {
    labels: ['Music', 'Sport', 'Traditional', 'Comedy', 'Seminar', 'Dance'],
    datasets: [
      {
        label: 'Sold',
        data: [music, sport, traditional, comedy, seminar, dance],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  const events = (
    <Pie
      data={data}
      options={{
        title: {
          display: true,
          text: 'Ticket Sold By Category',
          fontSize: 25
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }}
    />
  );

  const empty = (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img className="w-50 mb-4" src={notFound} alt="Event Not Found" />
      <h5>You have no active events</h5>
    </div>
  );

  return (
    <div className="current-event d-flex justify-content-center align-items-center flex-column">
      <h4>Your Event Report</h4>
      <div className="events-list mt-5 d-flex justify-content-center align-items-center flex-row">
        {(event.length > 0 && music > 0) ||
        sport > 0 ||
        dance > 0 ||
        traditional > 0 ||
        comedy > 0 ||
        seminar > 0 ? (
          events
        ) : event.length <= 0 ? (
          empty
        ) : (
          <h3>No Ticket Sold</h3>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  getCurrentEvent: PropTypes.func.isRequired,
  countCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  music: state.event.music,
  traditional: state.event.traditional,
  comedy: state.event.comedy,
  sport: state.event.sport,
  seminar: state.event.seminar,
  dance: state.event.dance
});

export default connect(mapStateToProps, { getCurrentEvent, countCategory })(EventItem);
