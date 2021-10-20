import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { createOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import CheckOut from "../components/CheckOut";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
const PlaceOrderScreen = ({history}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const {  order, success, error } = orderCreate;
  const addDecimal =(num)=>{
    return(Math.round(num*1).toFixed(2))
  }
  const placeOrderHandler=()=>{
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
         shippingAddress: cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice


      })
    )
  }

    useEffect(()=>{
        if(success){
          history.push(`/order/${order._id}`)
        }
    },[history, success])

  cart.itemPrice = addDecimal(cart.cartItems.reduce ((acc ,item)=> acc + item.price * item.qty , 0))
  cart.shippingPrice = addDecimal(cart.cartItems > 500 ? 0 : 50)
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemPrice).toFixed(2)))
  cart.totalPrice= Number(cart.itemPrice) + Number(cart.shippingPrice ) + Number(cart.taxPrice)

  return (
    <>
      <CheckOut step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping </h2>
              <p>
                
                <strong> Address:</strong>
                {cart.shippingAddress.address} ,{cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode} ,
                {cart.shippingAddress.country} ,
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong>Payment Method : </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message> Your cart is empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {" "}
                            {item.name}{" "}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X $ {item.price} =$ {item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>

                <Row>
                  <Col> Items</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
               </Row>

              </ListGroup.Item>
                    <ListGroup.Item> 
                      {error &&  <Message variant='danger'>{error} </Message> }
                     </ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>   Place Order </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
