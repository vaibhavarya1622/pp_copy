import RIDES_ACTIONTYPES from "./rides.actiontypes";

const INITIAL_STATE = {
  pastrides: [],
  isFetching: false,
  errorMsg: null,
  pastRideDetails: [],
  currentRideDetails: [],
  polyline: "",
};

const RidesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RIDES_ACTIONTYPES.GET_RIDE_DETAILS:
      console.log(action.payload)
      return {
        ...state,
        pastRideDetails: action.payload,
      };
      case RIDES_ACTIONTYPES.GET_CURRENT_RIDE_DETAILS:
       
        return {
          ...state,
          currentRideDetails: action.payload,
        };
    case RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pastrides: action.payload,
        polyline: JSON.stringify(action.payload[0].polyline),
      };
    case RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default RidesReducer;
