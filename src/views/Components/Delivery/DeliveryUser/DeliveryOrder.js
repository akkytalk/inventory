import React, { Component } from "react";
import { Card, CardBody, Table } from "reactstrap";
import Print from "../Print";
import EditOrder from "../../Order/EditOrder";

class DeliveryOrder extends Component {
  render() {
    const data = this.props.delivery;
    return (
      <Card>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Order Date</th>
                <th>Client Name</th>
                <th>Client Address</th>
                <th>Total Amount</th>
                <th>Bill Genrated</th>
                <th>Bill Print</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.shipment_inventory
                  ? data.shipment_inventory.map((data, index) => {
                      if (data.order_id != null) {
                        return (
                          <tr key={index}>
                            <td>{data.order ? data.order.order_no : null}</td>
                            <td>{data.order ? data.order.order_date : null}</td>
                            <td>
                              {data.order
                                ? data.order.client !== null
                                  ? data.order.client.client_name
                                  : data.order.customer_name
                                : null}
                            </td>
                            <td>
                              {data.order
                                ? data.order.client !== null
                                  ? data.order.client.client_address
                                  : data.order.place_of_supply
                                : null}
                            </td>
                            <td>
                              {data.order ? data.order.total_tax_amount : null}
                            </td>
                            <td>
                              {data.order ? data.order.bill_generated ? data.order.bill_generated : "No" : null}
                            </td>
                            <td>
                              <Print id={data.order} />
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

export default DeliveryOrder;
