import PRESENTRIDES_ACTIONTYPES from "./presentRide.actiontypes";
// import PRESENT_RIDE_DATA from "../fakePresentRideData";

export const getPresentRideDetails = (presentRideDetails) => ({
  type: PRESENTRIDES_ACTIONTYPES.GET_PRESENTRIDE_DETAILS,
  payload: presentRideDetails,
});

export const fetchPresentRideStart = () => ({
  type: PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_START,
});

export const fetchPresentRideSuccess = (presentRideDetails) => ({
  type: PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_SUCCESS,
  payload: presentRideDetails,
});

export const fetchPresentRideFailure = (errorMsg) => ({
  type: PRESENTRIDES_ACTIONTYPES.FETCH_PRESENTRIDE_DETAILS_FAILURE,
  payload: errorMsg,
});

export const fetchPresentRide = (mobilenumber) => {
  return (dispatch) => {
    // const number = mobilenumber;
    dispatch(fetchPresentRideStart());
    fetch(`https://serverprioritypulse.herokuapp.com/user/activeRide/${mobilenumber}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(fetchPresentRideSuccess(data)))
      .catch((err) => dispatch(fetchPresentRideFailure(err)));
  };
};
