 
import React, { useEffect } from 'react'
import {Button,   Card,   Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart ,removeFromCart} from '../actions/cartAction';
import Message from '../components/Message';
 

const CartScreen = ({match , location , history }) => {
     const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1] ) :1 
     const dispatch = useDispatch( )

     useEffect(()=>{

        if(productId){
            dispatch(addToCart(productId,qty ))
        }
    
     },[dispatch, productId,qty])
     

     const cart = useSelector(state => state.cart)
     const { cartItems} = cart;
     console.log(cartItems);

     const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
     };
     
     const checkout=()=>{
      history.push('/login?redirect=shipping')
     }
    return (
      <>
        <Row>
          <Col md={8}>
            <h1> Shopping Cart </h1>

            {cartItems.length === 0 ? (
              <Message>
                {" "}
                Your Cart is Empty !<Link to="/"> Go BAck</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>

                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>
                          {item.name}{" "}
                        </Link>
                      </Col>

                      <Col md={2}> {item.price} </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>

                        <Button className='center'
                        type="button" 
                        variant="light"
                        
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash   text-danger" aria-hidden="true"></i>
                      </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card> 
              <ListGroup variant='flush'>
                        <ListGroupItem>
                           <h2> Subtotal ({cartItems.reduce((acc ,item)=> acc + item.qty , 0)}) items</h2>
                           <br />
                           <h4> Price {cartItems.reduce((acc,item) => acc +item.qty * item.price ,0).toFixed(2)}</h4>
                          


                        </ListGroupItem>  
                    
              </ListGroup>

              <Button className='btn-block' disabled={cartItems.length ===0} onClick={checkout}> Proceed to Checkout </Button>
            </Card>
          </Col>
        </Row>
      </>
    );
}

export default CartScreen
