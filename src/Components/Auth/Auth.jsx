import React from "react";
import style from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import * as axios from "axios";

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.cookie != "isAuthorized=true") {
      axios
        .get("http://test.ru/auth")
        .then((response) => response)
        .then((result) => {
          if (result.isAuthorized) {
            console.log("вы авторизованы");
          } else {
            console.log("пройдите регистрацию");
          }
        });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("text", this.props.value);
    axios
        .post("http://test.ru/auth", formData)
        .then((response) => {
          console.log(response.data);
          this.props.handleSubmit(response.data)
        })
        .catch((error) => {
          console.log(error);
          this.props.handleSubmit(error)
        });
  }


  render() {
    if (document.cookie) {
      return <Redirect to="/cart" />;
    }
    return (
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <div className={style.formRow}>
            <h1 className={style.title}>Вход</h1>
          </div>
          <div className={style.formRow}>
            <input
              onChange={this.props.handleChange}
              type="password"
              value={this.props.value}
              className={style.input}
              placeholder="Пароль"
            />
          </div>
          <div className={style.formRow}>
            <button className={style.button} type="submit">
              <span className={style.buttonText}>Войти</span>
            </button>
          </div>
          {this.props.showError ? (
            <div className={style.error}>
              <span>Неверный пароль</span>
            </div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  }
}

export default Auth;
