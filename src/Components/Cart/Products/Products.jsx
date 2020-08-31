import React from "react";
import style from "./Products.module.css";
import Product from "./Product/Product";

const Products = (props) => {
  console.log(props)

    const ProductElement = props.products.map((product, index) => {
      return (
        <Product
          dispatch={props.dispatch}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          date={product.date}
          key={index}
          prodId={product.prodId}
          id={product.id}
        />
      );
    });

    return (
      <section className={style.table}>
        <header className={style.header}>
          <div className={style.row}>
            <div className={style.body}>
              <div className={style.column}>Название</div>
              <div className={style.column}>Количество(шт)</div>
              <div className={style.column}>Цена(руб)</div>
              <div className={style.column}>Дата и время добавления</div>
              <div className={style.column}></div>
            </div>
          </div>
        </header>
        <div className={style.content}>{ProductElement}</div>
      </section>
    );
}

export default Products;
