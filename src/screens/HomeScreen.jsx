 
import React, { useEffect } from 'react'
 
import { Col, Row,   } from 'react-bootstrap'
 import {useDispatch , useSelector  } from 'react-redux'
 import {listProducts} from '../actions/productAction'
import Message from '../components/Message'
import SpinnerCom from '../components/Spinner'
 
import ProductScreen from './ProductScreen'

const HomeScreen = () => {
 
     const dispatch = useDispatch();

    const productList = useSelector(state => state.productList)
    
    const {  loading ,error , products} = productList;
     useEffect(()=>{

       dispatch(listProducts())

     },[dispatch ])
    return (
      <>
        {loading ? (

        <SpinnerCom />

        ) : error ? (
            <Message variant ='danger'> { error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} md={3}>
                <ProductScreen product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
}

export default HomeScreen
