import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Spinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDetails ,updateUserprofile} from "../actions/userAction";
 
const ProfileScreen = ({location ,history}) => {
    const [name , setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message , setMessage]= useState('')
 
const dispatch = useDispatch()
const   userDetails =  useSelector( state => state.userDetails);
const {loading, error, user} =  userDetails;
 
const userLogin = useSelector((state) => state.userLogin);
const { userInfo } =  userLogin;

const userUpdateProfile= useSelector( state => state.userUpdateProfile )
const {success} = userUpdateProfile;

  useEffect(()=>{
    if(!userInfo){
        history.push('/login')
    }
    else{
        if(!user.name){
            dispatch( getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  },[history,userInfo, user,dispatch])


  const submitHandler =(e)=>{
    e.preventDefault()
    dispatch(updateUserprofile({id:user._id , name, email,password}))
   
  }
  return (
    <> 
       <Row>
           <Col md={3}> 
           <h1>Update Information </h1>
              {error && <Message variant="danger">{error} </Message>}
              {success && <Message variant='success'> Profile Updated</Message> }
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
                 <Button type='submit' varient= 'primary'> Confirm </Button>
            

            </Form>
           
           
            </Col>
           <Col md={9}>
               <h1> My Orders</h1>
              </Col>
       </Row>
    </>
  );
};

export default   ProfileScreen ;
