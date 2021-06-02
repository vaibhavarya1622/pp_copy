import { createSelector } from "reselect";

export const selectHospital = (state) => state.Hospital;

export const selectNearByHospitals = createSelector(
  [selectHospital],
  (nearByHospitals) => nearByHospitals.nearbyHospitals
);

export const selectHospitalDetails = createSelector(
  [selectNearByHospitals],
  (hospitalDetails) => hospitalDetails.map((hospitalDetail) => hospitalDetail)
);

export const selectHospitalNames = createSelector(
  [selectHospitalDetails],
  (hospitalDetail) =>
    hospitalDetail.map((aboutHospital) => aboutHospital.hospitalName)
);
