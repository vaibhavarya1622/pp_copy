import PRESENTRIDES_ACTIONTYPES from "./presentRide.actiontypes";

const INITIAL_STATE = {
  presentRide: [],
  isFetching: false,
  errorMsg: null,
  presentRideDetails: [],
  polyline: "",
};

const presentRideReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRESENTRIDES_ACTIONTYPES.GET_PRESENTRIDE_DETAILS:
      return {
        ...state,
        presentRideDetails: action.payload,
      };
    case PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_SUCCESS:
      //console.log(action.payload[0].polyline)
      return {
        ...state,
        isFetching: false,
        presentRide: action.payload,
        polyline: JSON.stringify(action.payload[0].polyline),
      };
    case PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default presentRideReducer;
