import React from "react";
import { addProductActionCreator, textChangeActionCreator, showFilterProductsAC, getProductsAC } from "../../redux/cart-reducer";
import Cart from "./Cart"
import {connect} from "react-redux"


let mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    searchingText: state.cart.searchingText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addProduct: () => {
      dispatch(addProductActionCreator());
    },
    textChange: (e) => {
      dispatch(textChangeActionCreator(e))
    },
    showFilterProducts: () => {
      dispatch(showFilterProductsAC())
    },
    getProducts: (products) => {
      dispatch(getProductsAC(products))
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer;
