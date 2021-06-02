import RIDES_ACTIONTYPES from "./rides.actiontypes";

export const getRideDetails = (pastrideDetails) => ({
  type: RIDES_ACTIONTYPES.GET_RIDE_DETAILS,
  payload: pastrideDetails,
});

export const getCurrentRideDetails = (currentrideDetails) => ({
  type: RIDES_ACTIONTYPES.GET_CURRENT_RIDE_DETAILS,
  payload: currentrideDetails,
});

export const fetchPastRideDetailsStart = () => ({
  type: RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_START,
});

export const fetchPastRideDetailsSuccess = (pastRideDetails) => ({
  type: RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_SUCCESS,
  payload: pastRideDetails,
});

export const fetchPastRideDetailFailure = (errorMsg) => ({
  type: RIDES_ACTIONTYPES.FETCH_PASTRIDE_DETAILS_FAILURE,
  payload: errorMsg,
});

export const fetchPastRideDetails = (mobilenumber) => {
  return (dispatch) => {
    // const number = mobilenumber;
    // console.log(mobilenumber);
    dispatch(fetchPastRideDetailsStart());
    fetch(` https://serverprioritypulse.herokuapp.com/user/pastrides/${mobilenumber}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(fetchPastRideDetailsSuccess(data)))
      .catch((err) => dispatch(fetchPastRideDetailFailure(err)));
  };
};
