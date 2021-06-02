// import HOSPITAL_DATA from "../fakeHospitalData";

export const hospitalDetailsFromCode = (hospitalDetails, hospitalCode) => {
  return hospitalDetails.filter(
    (hospitalDetail) => hospitalDetail.code === hospitalCode
  );
};
