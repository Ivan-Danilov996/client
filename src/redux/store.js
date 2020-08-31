import cartReducer from "./cart-reducer";

let store = {
  _state: {
    products: [
      {
        id: 1,
        name: "Персики",
        quantity: 300,
        price: 300,
        date: "22.04.1996",
      },
      {
        id: 2,
        name: "Мандарины",
        quantity: 200,
        price: 30,
        date: "22.04.1996",
      },
      {
        id: 3,
        name: "Апельсины",
        quantity: 500,
        price: 9000,
        date: "22.04.1996",
      },
      {
        id: 4,
        name: "Яблоки",
        quantity: 100,
        price: 400,
        date: "22.04.1996",
      },
      {
        id: 5,
        name: "Нектарины",
        quantity: 900,
        price: 5,
        date: "22.04.1996",
      },
    ],
    searchingText: "",
  },

  getState() {
    return this._state;
  },

  _render() {
    console.log("hi");
  },

  subscribe(observer) {
    this._render = observer;
  },

  dispatch(action) {
    this._state = cartReducer(this._state, action);
    this._render(this._state);
  },
};

export default store;
