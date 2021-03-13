import React, { Component } from "react";
import { Card, CardBody, Table } from "reactstrap";
import Print from "../Print";

class DeliveryProduct extends Component {
  render() {
    const data = this.props.delivery;
    console.log(this.props);
    return (
      <Card>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Sale Rate</th>
                <th>GST</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.shipment_inventory
                  ? data.shipment_inventory.map((data, index) => {
                      if (data.product_id != null) {
                        return (
                          <tr key={index}>
                            <td>
                              {data.product ? data.product.product_name : null}
                            </td>
                            <td>{data ? data.quantity : null}</td>
                            <td>
                              {data.product ? data.product.sale_rate : null}
                            </td>
                            <td>
                              {data.product ? data.product.gst_rate : null}
                            </td>
                          </tr>
                        );
                      }
                    })
                  : null
                : null}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default DeliveryProduct;
