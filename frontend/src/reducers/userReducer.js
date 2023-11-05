import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_USER_FAIL,
  DELETE_USER_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
  UPDATE_USER_RESET,
  DELETE_USER_RESET,
} from "../constants/userConstant";

export const userReducer = (state = { user: [] }, action) => {
  // Check if user data exists in local storage and use it
  const storedUser = JSON.parse(localStorage.getItem("user"));

  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      // Clear the stored user data on login or registration failure
      localStorage.removeItem("user");

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOAD_USER_FAIL: {
      // Clear the stored user data on load user failure
      localStorage.removeItem("user");

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      };
    }

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        user: null,
      };
    default:
      return {
        ...state,
        user: storedUser, // Use the stored user data
      };
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      // case UPDATE_PASSWORD_REQUEST:
      // case UPDATE_USER_REQUEST:
      // case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      // case UPDATE_PASSWORD_SUCCESS:
      // case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isDeleted: action.payload.success,
    //     message: action.payload.message,
    //   };

    case UPDATE_PROFILE_FAIL:
      // case UPDATE_PASSWORD_FAIL:
      // case UPDATE_USER_FAIL:
      // case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case UPDATE_PROFILE_RESET:
    //   // case UPDATE_PASSWORD_RESET:
    //   // case UPDATE_USER_RESET:
    //   return {
    //     ...state,
    //     isUpdated: false,
    //   };

    case DELETE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
