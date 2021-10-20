import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
 

function App() {
  return (
    <Router>
    
    <Header />
    <Switch>
    <main className='my-3'>
      <Container>
        
        <Route exact path ='/' component={HomeScreen}  />  
        <Route exact path ='/login' component={LoginScreen}  />  
        <Route exact path ='/register' component={RegisterScreen}  />  
        <Route exact path='/product/:id'  component={ProductDetails}/>
        <Route exact path='/cart/:id?'  component={CartScreen}/>
        <Route exact path='/profile'  component={ProfileScreen}/>
        <Route exact path='/shipping'  component={ShippingScreen}/>
        <Route exact path='/payment'  component={PaymentScreen}/>
        <Route exact path='/placeorder'  component={PlaceOrderScreen}/>
        
      </Container>

    </main>
        <Footer />
        </Switch>
    </Router>
  );
}

export default App;
