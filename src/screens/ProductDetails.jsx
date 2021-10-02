import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect , useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productAction";
import Message from "../components/Message";
const ProductDetails = ({history, match }) => {

  const [qty, setQty ] = useState(1)
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);


  const addToCartHandler=() =>{
    history.push(`/cart/${match.params.id}?qty=${qty}  `)
  }

  return (
    <>
      <Link className="btn " to="/">
        {" "}
        <i class="fas fa-long-arrow-alt-left"></i>&nbsp; Go Back{" "}
      </Link>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Row className="my-3">
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3> {product.name} </h3>
              </ListGroupItem>

              <ListGroupItem>
                <p>{product.description} </p>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews `}
                />
              </ListGroupItem>

              <ListGroupItem>
                <strong> price : $ {product.price} </strong>
              </ListGroupItem>
            </ListGroup>
          </Col>



          <Col md={3}>
            <ListGroupItem>
              <Row>
                <Col>Status :</Col>
                <Col>  {product.countInStock > 0 ? "In stock" : " Stock Out"}  </Col>
              </Row>
            </ListGroupItem>
            
            {
              product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col> Qty</Col>
                    <Form.Control as="select" value={qty}  onChange={ (e) => setQty(e.target.value)}>
                      {
                        [...Array(product.countInStock).keys()].map((x)=>(
                          <option key={x+1} value={x+1}> {x+1}  </option>
                        ))
                      }

                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )
            }

            <ListGroupItem>
            <Button variant="success " onClick={addToCartHandler} disabled={product.countInStock === 0 }> add to cart</Button> 
            </ListGroupItem>
 
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetails;
