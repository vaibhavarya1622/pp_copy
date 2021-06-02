import { DRIVER_ACTION_TYPES } from "./driver.actionTypes";

const INITIAL_STATE = {
  driverLatitude: "",
  driverLongitude: "",
};

const driverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DRIVER_ACTION_TYPES.SET_DRIVERLATITUDE_LOCATION:
      return {
        ...state,
        driverLatitude: action.payload,
      };
    case DRIVER_ACTION_TYPES.SET_DRIVERLONGITUDE_LOCATION:
      console.log(action.payload);
      return {
        ...state,
        driverLongitude: action.payload,
      };

    default:
      return state;
  }
};

export default driverReducer;
