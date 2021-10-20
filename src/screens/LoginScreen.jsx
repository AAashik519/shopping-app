import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
 
import Message from "../components/Message";
import Loader from "../components/Spinner";

import { login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoginScreen = ({location ,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const redirect = location.search ? location.search.split('=')[1] :"/" ;

const dispatch = useDispatch()
const userLogin= useSelector( state => state.userLogin)
const {loading, error, userInfo } = userLogin

  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])


  const submitHandler =(e)=>{
    e.preventDefault()
    //dispatch
    dispatch(login(email,password))
  }
  return (
    <> 
      <FormContainer>
          <h1> SIGN IN</h1>
              {error && <Message variant="danger">{error} </Message>}
              { loading && <Loader />}
            <Form onSubmit= { submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value) }  />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password}  onChange={(e) => setPassword(e.target.value) }  />
                </Form.Group>
                <br />
                 <Button type='submit' varient= 'primary'>Sign In </Button>
            

            </Form>
            <Row>
                <Col>
                New Customer ? <Link to ={redirect ? `register?redirect =${redirect}` :'/register'}> Register</Link>
                </Col>
            </Row>

      </FormContainer>
    </>
  );
};

export default LoginScreen;
