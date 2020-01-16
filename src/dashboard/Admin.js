import React, { useEffect } from 'react';
import Dashboard from '../components/layout/Dashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUsersCount } from '../actions/auth';
import { getEventsCount } from '../actions/event';
import { getBuyersCount } from '../actions/buyer';

const DashboardAdmin = ({
  getUsersCount,
  getEventsCount,
  getBuyersCount,
  countUser,
  countBuyer,
  countEvent,
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getUsersCount();
  }, [getUsersCount]);
  useEffect(() => {
    getEventsCount();
  }, [getEventsCount]);
  useEffect(() => {
    getBuyersCount();
  }, [getBuyersCount]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="container d-flex flex-column">
        <h3 className="text-center">Admin Dashboard</h3>
        <div className="">
          <Dashboard />
          <div className="card">
            <div className="card-header bg-primary">
              <h3 className="text-light">Website Overview</h3>
            </div>
            <div className="card-body d-flex flex-row bg-light">
              <div className="col-4">
                <div className="card w-100 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <i
                      className="fas fa-user"
                      style={{
                        fontSize: '75px',
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginRight: '20px'
                      }}
                    ></i>
                    <p style={{ fontSize: '75px', marginTop: '20px' }}>{countUser}</p>
                  </div>
                  <h1>Users</h1>
                </div>
              </div>
              <div className="col-4">
                <div className="card w-100 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <i
                      className="fas fa-calendar-alt"
                      style={{
                        fontSize: '75px',
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginRight: '20px'
                      }}
                    ></i>
                    <p style={{ fontSize: '75px', marginTop: '20px' }}>{countEvent}</p>
                  </div>
                  <h1>Events</h1>
                </div>
              </div>
              <div className="col-4">
                <div className="card w-100 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <i
                      className="fas fa-shopping-cart"
                      style={{
                        fontSize: '75px',
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginRight: '20px'
                      }}
                    ></i>
                    <p style={{ fontSize: '75px', marginTop: '20px' }}>{countBuyer}</p>
                  </div>
                  <h1>Buyers</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardAdmin.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUsersCount: PropTypes.func.isRequired,
  getEventsCount: PropTypes.func.isRequired,
  getBuyersCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  countUser: state.auth.countUser,
  countEvent: state.event.countEvent,
  countBuyer: state.buyer.countBuyer,
  checkUser: (state.auth.check = false),
  checkEvent: (state.event.check = false),
  checkBuyer: (state.buyer.check = false),
  isAdmin: (state.auth.isAdmin = true)
});

export default connect(mapStateToProps, { getUsersCount, getEventsCount, getBuyersCount })(
  DashboardAdmin
);
