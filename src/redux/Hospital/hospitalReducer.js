// import HOSPITAL_DATA from "../fakeHospitalData";
import HOSPITAL_ACTION_TYPES from "./hospitalActionTypes";
import { hospitalDetailsFromCode } from "./hospital.util";

const INITIAL_STATE = {
  hospitalDetails: [],
  isFetching: false,
  errorMsg: "",
  aboutHospital: [],
  coordinates: null,
};

const HospitalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOSPITAL_ACTION_TYPES.GET_HOSPITALDETAILS:
      return {
        ...state,
        aboutHospital: hospitalDetailsFromCode(
          state.hospitalDetails,
          action.payload
        ),
      };
    case HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hospitalDetails: action.payload,
      };
    case HOSPITAL_ACTION_TYPES.FETCH_HOSPITAL_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload,
      };
    case HOSPITAL_ACTION_TYPES.SET_HOSPITAL_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
      };
    default:
      return state;
  }
};

export default HospitalReducer;
