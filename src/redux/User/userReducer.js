import USER_ACTIONTYPES from "./user.actiontypes";

const INITIAL_STATE = {
  currentUser: null,
  latitude: "",
  longitude: "",
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTIONTYPES.SET_CURRENTUSER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case USER_ACTIONTYPES.SET_USERLATITUDE_LOCATION:
    console.log(action.payload); 
    return {
        ...state,
        latitude: action.payload,
      };
    case USER_ACTIONTYPES.SET_USERLONGITUDE_LOCATON:
      return {
        ...state,
        longitude: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
