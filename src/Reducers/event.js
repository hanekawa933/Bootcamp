import {
  GET_EVENT,
  GET_ERROR,
  CREATE_EVENT,
  GET_ALL_EVENT,
  GET_SPECIFIC_EVENT,
  GET_EVENT_BY_CATEGORY,
  DELETE_EVENT,
  UPDATE_EVENT,
  UPDATE_SOLD,
  UPDATE_SOLD2,
  GET_EVENTS_COUNT,
  CREATE_PHOTO,
  SEARCH_EVENT,
  SEARCH_RESULT,
  ADD_VIEWS,
  COUNT_COMEDY,
  COUNT_MUSIC,
  COUNT_DANCE,
  COUNT_SEMINAR,
  COUNT_SPORT,
  COUNT_TRADITIONAL
} from '../actions/types';

const initialState = {
  event: [],
  create: [],
  specificEvent: [],
  countEvent: [],
  loading: true,
  error: {},
  check: null,
  check2: true,
  update: [],
  update2: [],
  delete: [],
  file: [],
  isUpdate: true,
  result: [],
  params: [],
  add: null,
  traditional: null,
  sport: null,
  music: null,
  comedy: null,
  seminar: null,
  dance: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_VIEWS: {
      return {
        ...state,
        add: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_TRADITIONAL: {
      return {
        ...state,
        traditional: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_MUSIC: {
      return {
        ...state,
        music: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_COMEDY: {
      return {
        ...state,
        comedy: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_DANCE: {
      return {
        ...state,
        dance: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_SEMINAR: {
      return {
        ...state,
        seminar: payload,
        loading: false,
        check2: false
      };
    }
    case COUNT_SPORT: {
      return {
        ...state,
        sport: payload,
        loading: false,
        check2: false
      };
    }
    case GET_EVENT_BY_CATEGORY:
      return {
        ...state,
        event: payload,
        create: [],
        loading: false,
        check: false,
        check2: true
      };
    case SEARCH_RESULT:
      return {
        ...state,
        result: payload,
        loading: false,
        check: false,
        check2: true
      };
    case SEARCH_EVENT:
      return {
        ...state,
        params: payload,
        loading: false,
        check: true,
        check2: true
      };
    case CREATE_PHOTO:
      return {
        ...state,
        file: payload,
        loading: false,
        check2: true
      };
    case GET_EVENTS_COUNT:
      return {
        ...state,
        countEvent: payload,
        loading: false,
        check2: true
      };
    case UPDATE_EVENT:
    case UPDATE_SOLD:
      return {
        ...state,
        update: payload,
        isUpdate: false,
        loading: false,
        check2: true
      };
    case UPDATE_SOLD2:
      return {
        ...state,
        update2: payload,
        isUpdate: false,
        loading: false,
        check2: true
      };
    case CREATE_EVENT:
      return {
        ...state,
        update: payload,
        event: [],
        loading: false,
        check: true,
        check2: true
      };
    case DELETE_EVENT:
      return {
        ...state,
        delete: payload,
        loading: false,
        check2: true
      };
    case GET_SPECIFIC_EVENT:
      return {
        ...state,
        event: [],
        specificEvent: payload,
        loading: false,
        check: null
      };
    case GET_ALL_EVENT:
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        create: [],
        loading: false,
        check: null,
        check2: true
      };
    case GET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        check2: true
      };

    default:
      return state;
  }
}
