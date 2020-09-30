var initial = [
  {
    name: 'A',
    age: 15
  }
];

const Cart = (state = initial, action) => {
  switch (action.type) {
    case 'ABC':
      return [...state];
    default:
      return [...state];
  }
};

export default Cart;
