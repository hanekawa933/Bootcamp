import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Events from '../organizer/Events';
import Reports from '../organizer/Reports';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const DashboardUser = ({ auth: isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="create-event d-flex justify-content-end align-items-center">
        <Link to="/dashboard/create-events" className="btn btn-primary">
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="dashboard">
        <Events />
        <Reports />
      </div>
    </Fragment>
  );
};

DashboardUser.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(DashboardUser);
