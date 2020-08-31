import Products from "./Products";
import {connect} from "react-redux";


const mapStatetoProps = (state) => {
  return {
    products: state.cart.products,
  }
}


const ProductsContainer = connect(mapStatetoProps)(Products)

export default ProductsContainer;
