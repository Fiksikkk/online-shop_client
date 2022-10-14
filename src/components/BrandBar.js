import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Form } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
  const { product } = useContext(Context);
  return (
    <Form className="d-flex">
      {product.brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-3"
          style={{ cursor: "pointer" }}
          border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
          onClick={() => product.setSelectedBrand(brand)}
        >
          {brand.name}
        </Card>
      ))}
    </Form>
  );
});

export default BrandBar;
