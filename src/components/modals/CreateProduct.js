import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createProduct, fetchBrands, fetchTypes } from "../../http/productAPI";

const CreateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const resetProductInfo = () => {
    setName("");
    setPrice(0);
    setInfo([]);
    product.setSelectedType({});
    product.setSelectedBrand({});
  };

  const addProduct = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("brandId", product.selectedBrand.id);
    formData.append("typeId", product.selectedType.id);
    formData.append("img", file);
    formData.append("info", JSON.stringify(info));
    createProduct(formData).then((data) => {
      onHide();
      resetProductInfo();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="nt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map((type) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="nt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Enter product name"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Enter product price"
            type="number"
          />
          <Form.Control
            className="mt-3"
            placeholder="Select product photo"
            type="file"
            onChange={selectFile}
          />
          <hr />
        </Form>
        <Button variant={"outline-dark"} onClick={addInfo}>
          Add new characteristic
        </Button>
        {info.map((i) => (
          <Row className="mt-4" key={i.number}>
            <Col md={4}>
              <Form.Control
                value={i.title}
                onChange={(e) => changeInfo("title", e.target.value, i.number)}
                placeholder="Enter characteristic name"
              />
            </Col>
            <Col md={4}>
              <Form.Control
                value={i.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, i.number)
                }
                placeholder="Enter description"
              />
            </Col>
            <Col md={4}>
              <Button
                variant="outline-danger"
                onClick={() => removeInfo(i.number)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => {
            onHide();
            resetProductInfo();
          }}
        >
          Close
        </Button>
        <Button variant="outline-success" onClick={addProduct}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
