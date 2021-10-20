import {createStore ,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
 import {productDetailsReducer, productListReducer} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer';
 import { userDetailsReducer  ,userLoginReducer,userRegisterReducer, userUpdateProfileReducer} from './reducers/userReducer'

 import {orderCreateReducer} from './reducers/orderReducer'

const userINfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ) :null ;

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')  ) : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :{};

const reducer = combineReducers({
  productList : productListReducer, 
  productDetails: productDetailsReducer,
  cart : cartReducer,
  userLogin :userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer
  
   
})

const initialState = { 
   cart: { cartItems: cartItemsFromStorage  ,
    shippingAddress: shippingAddressFromStorage},
   userLogin : { userInfo : userINfoFromStorage}
  
};

const middleware = [ thunk];

const store = createStore(
  reducer,
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store ;