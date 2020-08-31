import React, { useState } from "react";
import style from "../Products.module.css";
import cart from "../../../../assets/cart.png";
import {
  deleteProductActionCreator,
  inputChangeNameAC,
  inputChangeQuantityAC,
  inputChangePriceAC,
  setStartDateAC,
  addIdFromProductAC,
} from "../../../../redux/cart-reducer";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import * as axios from "axios";
registerLocale("ru", ru);

const Product = (props) => {
  const [value, setValue] = useState(showButton());

  const [initialState, setInitialState] = useState({
    name: false,
    quantity: false,
    price: false,
  });

  function showButton() {
    return props.id ? { onCliked: true } : { onCliked: false };
  }

  function saveProduct() {
    if (props.id) {
      const data = {
        name: props.name,
        price: props.price,
        quantity: props.quantity,
        date: props.date,
      };
      console.log(data)
      axios
        .patch(`http://test.ru/products/${props.id}`, JSON.stringify(data))
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            setValue({ onCliked: true });
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let formData = new FormData();

      if (props.date) {
        formData.append("date", Date.parse(props.date));
      } else {
        formData.append("date", "");
      }
      formData.append("name", props.name);
      formData.append("price", props.price);
      formData.append("quantity", props.quantity);
      formData.append("prodId", props.prodId);
      axios
        .post("http://test.ru/products", formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            addIdFromProduct(response.data.id, props.prodId);
            setValue({ onCliked: true });
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const addIdFromProduct = (id, prodId) => {
    props.dispatch(addIdFromProductAC(id, prodId));
  };

  const clickSave = () => {
    saveProduct();
  };

  const deleteProduct = () => {
    axios.delete(`http://test.ru/products/${props.id}`).then((response) => {
      console.log(response);
      props.dispatch(deleteProductActionCreator(props.prodId));
    });
  };

  const showInputName = () => {
    setInitialState({ name: !initialState.name });
  };
  const showInputQuantity = () => {
    setInitialState({ quantity: !initialState.quantity });
  };
  const showInputPrice = () => {
    setInitialState({ price: !initialState.price });
  };

  const inputChangeName = (e) => {
    if (value.onCliked) {
      setValue({ onCliked: false });
    }
    props.dispatch(inputChangeNameAC(e, props.prodId));
  };

  const inputChangePrice = (e) => {
    if (value.onCliked) {
      setValue({ onCliked: false });
    }
    props.dispatch(inputChangePriceAC(e, props.prodId));
  };

  const inputChangeQuantity = (e) => {
    if (value.onCliked) {
      setValue({ onCliked: false });
    }
    props.dispatch(inputChangeQuantityAC(e, props.prodId));
  };

  const setStartDate = (date) => {
    if (value.onCliked) {
      setValue({ onCliked: false });
    }
    props.dispatch(setStartDateAC(date, props.prodId));
  };

  return (
    <div className={style.row}>
      <div className={style.body}>
        <div className={style.column} onClick={showInputName}>
          {" "}
          {initialState.name ? (
            <input
              autoFocus={true}
              onChange={inputChangeName}
              onBlur={showInputName}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  showInputName();
                }
              }}
              value={props.name}
            />
          ) : (
            <span>{props.name}</span>
          )}{" "}
        </div>
        <div className={style.column} onClick={showInputQuantity}>
          {initialState.quantity ? (
            <input
              autoFocus={true}
              onChange={inputChangeQuantity}
              onBlur={showInputQuantity}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  showInputQuantity();
                }
              }}
              value={props.quantity}
            />
          ) : (
            <span>{props.quantity}</span>
          )}
        </div>
        <div className={style.column} onClick={showInputPrice}>
          {initialState.price ? (
            <input
              autoFocus={true}
              onChange={inputChangePrice}
              onBlur={showInputPrice}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  showInputPrice();
                }
              }}
              value={props.price}
            />
          ) : (
            <span>{props.price}</span>
          )}
        </div>
        <div className={style.column}>
          <DatePicker
            selected={props.date}
            onChange={(date) => setStartDate(date)}
            locale="ru"
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
          />
        </div>
        <div className={style.column}>
          <div onClick={deleteProduct} className={style.image}>
            <img src={cart} alt="cart" />
          </div>
          {value.onCliked ? (
            <div></div>
          ) : (
            <button type="button" onClick={clickSave} className={style.save}>
              S
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
