import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
function App() {
  return (
    <Router>
    
    <Header />
    <Switch>
    <main className='my-3'>
      <Container>
        
        <Route exact path ='/' component={HomeScreen}  />  
        <Route exact path='/product/:id'  component={ProductDetails}/>
        <Route exact path='/cart/:id?'  component={CartScreen}/>
        
      </Container>

    </main>
        <Footer />
        </Switch>
    </Router>
  );
}

export default App;
