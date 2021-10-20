import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import CheckOut from "../components/CheckOut";
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMathod] = useState("paypal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <CheckOut step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select payment method </Form.Label>
          <Col>
            <Form.Check
              type="radio"
               label="paypal or credit card"
              id="paypal"
              name="PaymentMethod"
              value="paypal"
              checked
              onChangae={(e) => setPaymentMathod(e.target.value)}
            >
             
            </Form.Check>

            
          </Col>
        </Form.Group>
            <br />
        <Button type="submit" variant="primary">
         
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
