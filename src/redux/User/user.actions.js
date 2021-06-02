import USER_ACTIONTYPES from "./user.actiontypes";

export const setCurrentUser = (currentUser) => ({
  type: USER_ACTIONTYPES.SET_CURRENTUSER,
  payload: currentUser,
});

export const setUserLatitudeLocation = (lat) => ({
  type: USER_ACTIONTYPES.SET_USERLATITUDE_LOCATION,
  
  payload: lat,
});

export const setUserLongitudeLocation = (long) => ({
  type: USER_ACTIONTYPES.SET_USERLONGITUDE_LOCATON,
  payload: long,
});

// export const postUserDetails = (latitude, longitude, mobileNumber) => {
//   return (dispatch) => {
//     const user = {
//       location: {
//         coordinates: [latitude, longitude],
//       },
//       number: mobileNumber,
//     };
//   };

//   fetch("http://134.209.158.239:3000/user/add",{
//     method:"POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   })
//   .then()
// };
