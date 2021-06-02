import HOSPITAL_ACTION_TYPES from "./hospitalActionTypes";

export const getHospitalDetails = (hospitalCode) => ({
  type: HOSPITAL_ACTION_TYPES.GET_HOSPITALDETAILS,
  payload: hospitalCode,
});

export const fetchHospitalDetailsStart = () => ({
  type: HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_START,
});

export const fetchHospitalDetailsSuccess = (hospitalDetails) => ({
  type: HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_SUCCESS,
  payload: hospitalDetails,
});

export const fetchHospitalDetailsFailure = (errorMsg) => ({
  type: HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_FAILURE,
  payload: errorMsg,
});

export const fetchHospitalDetails = () => {
  return (dispatch) => {
    dispatch(fetchHospitalDetailsStart());
    fetch("https://serverprioritypulse.herokuapp.com/hospital/",{method:'get'})
      .then((res) => res.json())
      .then((data) => dispatch(fetchHospitalDetailsSuccess(data)))
      .catch((err) => dispatch(fetchHospitalDetailsFailure(err)));
  };
};

export const setHospitalCoordinates = (coordinates) => ({
  type: HOSPITAL_ACTION_TYPES.SET_HOSPITAL_COORDINATES,
  payload: coordinates,
});
