import { DRIVER_ACTION_TYPES } from "./driver.actionTypes";

export const setDriverLatitudeLocation = (driverlatitude) => ({
  type: DRIVER_ACTION_TYPES.SET_DRIVERLATITUDE_LOCATION,
  payload: driverlatitude,
});

export const setDriverLongitudeLocation = (driverlongitude) => ({
  type: DRIVER_ACTION_TYPES.SET_DRIVERLONGITUDE_LOCATION,
  payload: driverlongitude,
});
