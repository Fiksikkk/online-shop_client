import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, []);

  return (
    <Container className="mt-3">
      <Form className="d-flex align-items-center">
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img} />
        </Col>
        <Col md={4}>
          <h2>{product.name}</h2>
        </Col>
        <Col md={4}>
          <Card>
            <h3>{product.price}</h3>
            <Button variant={"outline-dark"}>Add to cart</Button>
          </Card>
        </Col>
      </Form>
      <Form className="d-flex flex-column m-3">
        <h1>Description</h1>
        {product.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Form>
    </Container>
  );
};

export default ProductPage;
