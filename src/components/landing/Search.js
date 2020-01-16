import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchEvent } from '../../actions/event';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Search = ({ searchEvent, check, params }) => {
  let [formData, setFromData] = useState({
    search: ''
  });

  let { search } = formData;

  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    searchEvent({ search });
  };

  if (check) {
    return <Redirect to={`/events/search/result=${params}`} />;
  }

  return (
    <section className="section-finder d-flex justify-content-center align-items-center flex-column">
      <h4 className="text-light mb-4">Find some events</h4>
      <form
        className="w-100 d-flex justify-content-center align-items-center"
        onSubmit={e => onSubmit(e)}
      >
        <div className="form-group input-group form-input ml-3">
          <div className="input-group-prepend">
            <div className="input-group-text">Find</div>
          </div>
          <input
            type="text"
            placeholder="Search Event, Organizer or Interest"
            className="form-control"
            name="search"
            value={search.toLowerCase()}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group ml-3">
          <button className="btn btn-light text-dark">Search</button>
        </div>
      </form>
    </section>
  );
};

Search.propTypes = {
  searchEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  params: state.event.params,
  check: state.event.check
});

export default connect(mapStateToProps, { searchEvent })(Search);
