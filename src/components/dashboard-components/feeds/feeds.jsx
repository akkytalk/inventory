import React from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";

class Feeds extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Dead Stock</CardTitle>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Set Wet Gel</td>
                <td>50</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Feeds;
