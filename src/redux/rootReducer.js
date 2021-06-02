import { combineReducers } from "redux";
import HospitalReducer from "./Hospital/hospitalReducer";
// import PatientReducer from "./Patient/patientReducer";
// import DriverReducer from "./Driver/driverReducer";
import RidesReducer from "./Rides/rides.reducer";
import UserReducer from "./User/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import presentRideReducer from "./PresentRide/presentRide.reducer";
import driverReducer from "./Driver/driver.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["User"], //, "Rides", "PresentRide"
};

const rootReducer = combineReducers({
  Hospital: HospitalReducer,
  Rides: RidesReducer,
  User: UserReducer,
  PresentRide: presentRideReducer,
  Driver: driverReducer,
});

export default persistReducer(persistConfig, rootReducer);
