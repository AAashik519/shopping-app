import React, { useState } from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {saveShippingAddress} from '../actions/cartAction'
import CheckOut from '../components/CheckOut'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch= useDispatch()

    const [address, setAddress]= useState( shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler=(e)=>{
        e.preventDefault()
        //dispatch
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')


    }

    return (
      <Container onSubmit={submitHandler}>
        <CheckOut step1 step2 />

        <Form>  
          
          <Form.Group controlId='address'>
            <Form.Label> Address</Form.Label>
            <Form.Control type="text" 
            placeholder='Enter Address'
             value={address} 
             onChange={ e=> setAddress(e.target.value)} 
             /> 
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" 
            placeholder='Enter your city'
             value={city} 
             onChange={ e=> setCity(e.target.value)} 
             />  
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" 
            placeholder='Enter Your postal Code'
             value={postalCode} 
             onChange={ e=>setPostalCode(e.target.value)} 
             />  
          </Form.Group>

          <Form.Group controlId='Country'>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" 
            placeholder='Enter your country'
             value={country} 
             onChange={ e=> setCountry(e.target.value)} 
             />  
          </Form.Group>
          <br />
          <Button type='submit' variant='primary'> Continue </Button>


          </Form>
      </Container>
    )
}

export default ShippingScreen
