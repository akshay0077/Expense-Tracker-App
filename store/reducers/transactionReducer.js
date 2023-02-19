import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../actions/types";

const initialState = {
  transactions: [
    { addedtime: 1576590342000, id: 2, reciver: "Rahul", title: "Amala Soup", price: -40 },
    { addedtime: 1576590342000, id: 3, reciver: "Mehul", title: "Paypal Income", price: 400 },
    { addedtime: 1274174256000, id: 4, reciver: "Shubham", title: "Bank Credit", price: 2000 },
    { addedtime: 1274174256000, id: 5, reciver: "Mohan", title: "Bought Garri", price: -60 },
    { addedtime: 1274174256000, id: 6, reciver: "Akram", title: "Transport fare", price: -10 },
    { addedtime: 779879856000, id: 7, reciver: "Raghu", title: "Ewedu Soup", price: -20 },
    { addedtime: 779879856000, id: 9, reciver: "plavi", title: "Funded my wallet", price: -200 },
    { addedtime: 779879856000, id: 10, reciver: "Shree", title: "Salary", price: 2000 },
    { addedtime: 1613682000000, id: 11, reciver: "Priya", title: "Give out", price: -10 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};
