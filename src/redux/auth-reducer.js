import * as axios from "axios";

const HANDLE_CHANGE = "HANDLE_CHANGE";
const HANDLE_SUBMIT = "HANDLE_SUBMIT";

let initialState = {
  value: "",
  password: "",
  redirect: false,
  showError: false,
};

const authReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case HANDLE_CHANGE: {
      stateCopy.value = action.value;
      stateCopy.showError = false;
      return stateCopy;
    }
    case HANDLE_SUBMIT: {

        if(action.data.isAutorise) {
            document.cookie = "isAutorized=true";
            stateCopy.redirect = true;
        } else {
            stateCopy.showError = true;
        }
        stateCopy.value = "";

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const handleChangeAC = (event) => {
  return { type: HANDLE_CHANGE, value: event.target.value };
};

export const handleSubmitAC = (data) => {
  return { type: HANDLE_SUBMIT, data: data};
};

export default authReducer;
