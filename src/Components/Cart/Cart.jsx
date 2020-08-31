import React from "react";
import style from "./Cart.module.css";
import ProductsContainer from "./Products/ProductsContainer";
import { Redirect } from "react-router-dom";
import * as axios from "axios";
import spinner from "../../assets/Spinner.svg";

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    axios
        .get("http://test.ru/products")
        .then((response) => {
          this.props.getProducts(response.data)
          this.setState({loaded: true})
        })
  }


  render() {
    if (!document.cookie) {
      return <Redirect to="/" />;
    }
  return (
    
    <main className={style.main}>
      <header>
        <h1>Товары</h1>
      </header>
      <section className={style.navBar}>
        <div className={style.navBarContent}>
          <div className={style.search}>
            <input
              value={this.props.searchingText}
              onChange={this.props.textChange}
              type="text"
              placeholder="Поиск"
              onKeyDown={(e)=>{
                if (e.keyCode === 13) {
                  this.props.showFilterProducts()
                }
              }}
            />
          </div>
          <div className={style.addProduct}>
            <button onClick={this.props.addProduct} className={style.addProductBtn}>
              <span>Добавить товар</span>
            </button>
          </div>
        </div>
      </section>
      {this.props.products.length ? (
        <ProductsContainer />
      ) : (
        <div>
        {this.state.loaded ?
        <p>Корзина пуста</p> :
        <img className={style.spinner} src={spinner} />}
        </div>
      )}
    </main>
  );
  }
  
};

export default Cart;
