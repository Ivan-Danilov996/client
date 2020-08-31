const ADD_PRODUCT = "ADD_PRODUCT";
const TEXT_CHANGE = "TEXT_CHANGE";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SHOW_FILTER_PRODUCTS = "SHOW_FILTER_PRODUCTS";
const SHOW_INPUT_NAME = 'SHOW_INPUT_NAME'
const INPUT_CHANGE_NAME = "INPUT_CHANGE_NAME"
const SHOW_INPUT_QUANTITY = "SHOW_INPUT_QUANTITY"
const INPUT_CHANGE_QUANTITY = "INPUT_CHANGE_QUANTITY"
const INPUT_CHANGE_PRICE = "INPUT_CHANGE_PRICE"
const SHOW_INPUT_PRICE = "SHOW_INPUT_PRICE"
const SHOW_INPUT_DATE = "SHOW_INPUT_DATE"
const INPUT_CHANGE_DATE = "INPUT_CHANGE_DATE"
const GET_PRODUCTS = "GET_PRODUCTS"
const SET_START_DATE = "SET_START_DATE"
const ADD_ID_FROM_PRODUCT = 'ADD_ID_FROM_PRODUCT'



let initialState = {
  products: [],
  searchingText: "",
  
};

const cartReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case GET_PRODUCTS: {
      stateCopy.products = [...state.products];
      stateCopy.products = action.products

      stateCopy.products.forEach(product => {
        product.date = parseInt(product.date)
        product.prodId = parseInt(product.prodId)
        product.id = parseInt(product.id)
      })
      Object.assign(initialState, stateCopy);
      return stateCopy;
    }
    case ADD_PRODUCT: {
      let product = {
        id: '',
        name: '',
        price: '',
        quantity: '',
        date: '',
        prodId: Date.now(),
      };
      stateCopy.products = [...state.products];
      stateCopy.products.push(product);

      if (stateCopy.products.length === initialState.products.length) {
        Object.assign(initialState, stateCopy);
        
      } else {
        initialState.products.push(product)
      }
      return stateCopy;
    }
    case ADD_ID_FROM_PRODUCT: {
      stateCopy.products = [...state.products];
      stateCopy.products.forEach(product => {
        if (product.prodId === action.prodId) {
          product.id = action.id
        }
      })
      Object.assign(initialState, stateCopy);
      return stateCopy;
    }
    case TEXT_CHANGE: {
      stateCopy.searchingText = action.newText;


      if (!stateCopy.searchingText) {
        return initialState;
      }
      stateCopy.products = [...initialState.products];
      stateCopy.products = stateCopy.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(stateCopy.searchingText.toLowerCase());
      });


      return stateCopy;
    }
    case DELETE_PRODUCT: {
      stateCopy.products = [...state.products];
      stateCopy.products = stateCopy.products.filter(
        (product) => product.prodId !== action.productId
      );

      if (stateCopy.products.length === initialState.products.length) {
        Object.assign(initialState, stateCopy);
      } else {
        initialState.products = initialState.products.filter(
          (product) => product.prodId !== action.productId
        );
      }
      return stateCopy;
    }

    case SHOW_FILTER_PRODUCTS: {
      if (!stateCopy.searchingText) {
        return initialState;
      }
      stateCopy.products = [...initialState.products];
      stateCopy.products = stateCopy.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(stateCopy.searchingText.toLowerCase());
      });
      return stateCopy;
    }
    case INPUT_CHANGE_NAME: {
      stateCopy.products = stateCopy.products.map((product, index) => {
        if (product.prodId === action.id) {
          product.name = action.newInputText
          initialState.products[index].name = action.newInputText
        }
        return product
      })
      return stateCopy
    }
    case INPUT_CHANGE_QUANTITY: {
      stateCopy.products = stateCopy.products.map((product, index) => {
        if (product.prodId === action.id) {
          product.quantity = action.newInputText
          initialState.products[index].quantity = action.newInputText
        }
        return product
      })
      return stateCopy
    }
    case INPUT_CHANGE_PRICE: {
      stateCopy.products = stateCopy.products.map((product, index) => {
        if (product.prodId === action.id) {
          product.price = action.newInputText
          initialState.products[index].price = action.newInputText
        }
        return product
      })
      return stateCopy
    }
    case INPUT_CHANGE_DATE: {
      stateCopy.products = stateCopy.products.map((product, index) => {
        if (product.prodId === action.id) {
          product.date = action.newInputText
          initialState.products[index].date = action.newInputText
        }
        return product
      })
      return stateCopy
    }
    case SET_START_DATE: {
      stateCopy.products = stateCopy.products.map((product, index) => {
        if (product.prodId === action.id) {
          product.date = action.date
          initialState.products[index].date = action.date
        }
        return product
      })
      return stateCopy
    }
    default: {
      return state;
    }
  }
};

export const addProductActionCreator = () => {
  return { type: ADD_PRODUCT };
};
export const textChangeActionCreator = (e) => {
  return { type: TEXT_CHANGE, newText: e.target.value };
};
export const deleteProductActionCreator = (id) => ({
  type: DELETE_PRODUCT,
  productId: id,
});

export const showFilterProductsAC = () => {
  return { type: SHOW_FILTER_PRODUCTS };
};

export const showInputNameActionCreator = (id) => {
  return {type: SHOW_INPUT_NAME, id: id}
}

export const showInputQuantityActionCreator = (id) => {
  return {type: SHOW_INPUT_QUANTITY, id: id}
}

export const inputChangeNameAC = (e, id) => {
  return {type: INPUT_CHANGE_NAME, newInputText: e.target.value, id: id}
}

export const inputChangeQuantityAC = (e, id) => {
  return {type: INPUT_CHANGE_QUANTITY, newInputText: e.target.value, id: id}
}


export const inputChangePriceAC = (e, id) => {
  return {type: INPUT_CHANGE_PRICE, newInputText: e.target.value, id: id}
}
export const showInputPriceActionCreator = (id) => {
  return {type: SHOW_INPUT_PRICE, id: id}
}
export const showInputDateActionCreator = (id) => {
  return {type: SHOW_INPUT_DATE, id: id}
}
export const inputChangeDateAC = (e, id) => {
  return {type: INPUT_CHANGE_DATE, newInputText: e.target.value, id: id}
}
export const getProductsAC = (products) => {
  return {type: GET_PRODUCTS, products: products}
}

export const setStartDateAC = (date, id) => {
  return {type: SET_START_DATE, date, id}
}

export const addIdFromProductAC = (id, prodId) => {
  return {type: ADD_ID_FROM_PRODUCT, id, prodId}
}

export default cartReducer;
