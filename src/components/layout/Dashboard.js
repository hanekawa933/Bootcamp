import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div className="dropdown d-flex justify-content-end mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Create Content
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link className="dropdown-item" to="/admin/create/users">
            Create User
          </Link>
          <Link className="dropdown-item" to="/admin/create/events">
            Create Event
          </Link>
          <Link className="dropdown-item" to="/admin/create/buyers">
            Create Buyer
          </Link>
        </div>
      </div>
      <div className="card mb-5">
        <div className="card-header bg-primary">
          <h3 className="text-light">Dashboard</h3>
        </div>
        <div className="card-body d-flex flex-row bg-light">
          <div className="col-4">
            <div className="card w-100 d-flex justify-content-center align-items-center">
              <i
                className="fas fa-user"
                style={{ fontSize: '50px', marginTop: '20px', marginBottom: '20px' }}
              ></i>
              <h3>Users</h3>
              {/* eslint-disable-next-line */}
              <Link to="/admin/dashboard/view/users" className="stretched-link"></Link>
            </div>
          </div>
          <div className="col-4">
            <div className="card w-100 d-flex justify-content-center align-items-center">
              <i
                className="fas fa-calendar-alt"
                style={{ fontSize: '50px', marginTop: '20px', marginBottom: '20px' }}
              ></i>
              <h3>Events</h3>
              {/* eslint-disable-next-line */}
              <Link to="/admin/dashboard/view/events" className="stretched-link"></Link>
            </div>
          </div>
          <div className="col-4">
            <div className="card w-100 d-flex justify-content-center align-items-center">
              <i
                className="fas fa-shopping-cart"
                style={{ fontSize: '50px', marginTop: '20px', marginBottom: '20px' }}
              ></i>
              <h3>Buyers</h3>
              {/* eslint-disable-next-line */}
              <Link to="/admin/dashboard/view/buyers" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <Link to="/admin/dashboard" className="btn btn-dark mb-3 mx-auto" style={{ width: '94%' }}>
          Back To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
