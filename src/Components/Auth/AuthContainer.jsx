import {connect} from "react-redux"
import Auth from "./Auth"
import { handleChangeAC, handleSubmitAC } from "../../redux/auth-reducer";

let mapStateToProps = (state) => {
  return {
    value: state.auth.value,
    password: state.auth.password,
    redirect: state.auth.redirect,
    showError: state.auth.showError
  }
}

let mapDispatchToProps = (dispatch) => {
  return {

    handleChange: (event) => {
      dispatch(handleChangeAC(event))
    },

    handleSubmit: (data) => {
      dispatch(handleSubmitAC(data))
    }

  }
}


const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthContainer;


