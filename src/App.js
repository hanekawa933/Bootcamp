import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Templates
import Navbar from './components/landing/Navbar';
import Landing from './components/landing/Landing';
import Footer from './components/landing/Footer';

// Organizer
import Login from './organizer/Login';
import Register from './organizer/Register';
import Create from './organizer/Create';
import ListBuyer from './organizer/ListBuyer';
import ListEvent from './organizer/ListEvent';
import UpdateEvents from './organizer/UpdateEvents';

// Layout
import Alert from './components/layout/Alert';

// User
import Category from './user/Category';
import Filter from './user/Filter';
import Search from './user/Search';
import MoreEvents from './user/MoreEvents';
import BookTicket from './user/BookModal';
import Confirm from './user/Confirm';

// Admin
import LoginAdmin from './admin/Login';
import createUsersAdmin from './admin/create/Users';
import createEventsAdmin from './admin/create/Events';
import createBuyersAdmin from './admin/create/Buyers';
import updateUsersAdmin from './admin/update/Users';
import updateEventsAdmin from './admin/update/Events';
import updateBuyersAdmin from './admin/update/Buyers';
import readUsersAdmin from './admin/read/Users';
import readEventsAdmin from './admin/read/Events';
import readBuyersAdmin from './admin/read/Buyers';

// Dashboard Admin & Organizer
import Dashboard from './dashboard/Organizer';
import AdminDashboard from './dashboard/Admin';

//Redux
import { Provider } from 'react-redux';
import Store from './Store';
import { loadUser } from './actions/auth';
import setAuthToken from './Utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <div className="container mt-5">
              <Alert />
              {/* Event Organizer Site */}
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/Dashboard/Events/List-Buyer/id=:buyer_id" component={ListBuyer} />
              <Route exact path="/Dashboard/Create-Events" component={Create} />
              <Route
                exact
                path="/Dashboard/Update-Events/id=:id&eventName=:eventName"
                component={UpdateEvents}
              />
              <Route exact path="/Events/Search/Result=:searchForm" component={Search} />
              <Route exact path="/Events/All-Events" component={MoreEvents} />
              <Route exact path="/Events/All-Events/Filter/Category=:category" component={Filter} />

              {/* Admin Site */}
              <Route path="/Admin/Login" component={LoginAdmin} />
              <Route exact path="/Admin/Create/Users" component={createUsersAdmin} />
              <Route exact path="/Admin/Create/Events" component={createEventsAdmin} />
              <Route exact path="/Admin/Create/Buyers" component={createBuyersAdmin} />
              <Route exact path="/Admin/Update/Users/id=:id" component={updateUsersAdmin} />
              <Route
                exact
                path="/Admin/Update/Events/id=:id&eventName=:eventName"
                component={updateEventsAdmin}
              />
              <Route exact path="/Admin/Update/Buyers/id=:id" component={updateBuyersAdmin} />
              <Route exact path="/Admin/Dashboard" component={AdminDashboard} />
              <Route exact path="/Admin/Dashboard/View/Users" component={readUsersAdmin} />
              <Route exact path="/Admin/Dashboard/View/Events" component={readEventsAdmin} />
              <Route exact path="/Admin/Dashboard/View/Buyers" component={readBuyersAdmin} />
              <Route exact path="/events/id=:id&eventName=:eventName" component={ListEvent} />
              <Route exact path="/events/category=:category" component={Category} />
              <Route
                exact
                path="/events/ticket/id=:id&eventName=:eventName"
                component={BookTicket}
              />
              <Route
                exact
                path="/events/verify/id=:id&eventName=:eventName&:qty"
                component={Confirm}
              />
            </div>
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
