import React, { Component } from "react";
import { Button, Collapse, Row, Col, Container, Table } from "reactstrap";

class ProductCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {
    const billDetail = this.props.billDetail;

    return (
      <React.Fragment>
        <Button color="link" size="sm" onClick={this.toggle}>
          <i className="fas fa-plus" />
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <table className="w-100 text-dark">
            <thead
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000"
              }}
            >
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {billDetail
                ? billDetail.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {data
                          ? data.product
                            ? data.product.product_name
                            : null
                          : null}
                      </td>
                      <td>{data.quantity}</td>
                      <td>{data.order_rate}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default ProductCollapse;
