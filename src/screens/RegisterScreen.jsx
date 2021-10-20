import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
 
import Message from "../components/Message";
import Loader from "../components/Spinner";

import { register } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const RegisterScreen = ({location ,history}) => {

    const [name , setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message , setMessage]= useState('')

const redirect = location.search ? location.search.split('=')[1] :"/" ;

const dispatch = useDispatch()
const   userRegister=  useSelector( state => state.userRegister)
const {loading, error, userInfo } =  userRegister

  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])


  const submitHandler =(e)=>{
    e.preventDefault()
    //dispatch 
    if(password !== confirmPassword){
        setMessage('password dose not match')
    }
    else{

        dispatch( register(name,email,password))
    }
  }
  return (
    <> 
      <FormContainer>
          <h1>Register</h1>
              {error && <Message variant="danger">{error} </Message>}
              { loading && <Loader />}
              { message && <Message variant='danger'>{ message} </Message>}
            <Form onSubmit= { submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" value={name}  onChange={(e) => setName(e.target.value) }  />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value) }  />
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password}  onChange={(e) => setPassword(e.target.value) }  />
                </Form.Group>

                <Form.Group controlId='ConfirmPassword'>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder=" Re-enter Password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value) }  />
                </Form.Group>
                <br />
                 <Button type='submit' varient= 'primary'> Register </Button>
            

            </Form>
           
            <Row>
                <Col>
                 Have an account? <Link to ={redirect ? `login?redirect =${redirect}` :'/ login'}>  Login</Link>
                </Col>
            </Row>

      </FormContainer>
    </>
  );
};

export default  RegisterScreen;
