import React, { Component } from "react";
import printJS from "print-js";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Container
} from "reactstrap";

class ViewBilling extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  newPrint() {
    printJS({
      printable: "divToPrint",
      type: "html",
      scanStyles: "true",
      targetStyles: "[*]"
    });
  }

  render() {
    const data = this.props.id;
    console.log(data);
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-print" />
        </Button>
        <Modal
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Generate Bill For Delivery
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>
                  <div
                    id="divToPrint"
                    className="container"
                    style={{
                      width: "3.2in",
                      padding: 0,
                      textAlign: "center"
                    }}
                  >
                    <h5 className="c_name text-dark">
                      {data
                        ? data.company
                          ? data.company.company_name
                          : null
                        : null}
                    </h5>
                    <h6 className="address text-dark">
                      {data
                        ? data.company
                          ? data.company.address
                          : null
                        : null}
                    </h6>
                    <table className="w-100 text-dark">
                      <thead>
                        <tr
                          style={{
                            borderTop: "1px solid #000000",
                            borderBottom: "1px solid #000000"
                          }}
                        >
                          <th scope="col">Name:</th>
                          <th scope="col">{data.client ? data.client.client_name : data.customer_name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Date:</td>
                          <td>{data.created_at}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Bill No.:{data.invoice_no}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-100 text-dark">
                      <thead>
                        <tr
                          style={{
                            borderTop: "1px solid #000000",
                            borderBottom: "1px solid #000000"
                          }}
                        >
                          <th scope="col">Item</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Price</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          ? data.bill_detail
                            ? data.bill_detail.map((product, index) => (
                                <tr key={index}>
                                  <td>
                                    {product.product
                                      ? product.product.product_name
                                      : null}
                                  </td>
                                  <td>{product.quantity}</td>
                                  <td>{product.bill_rate}</td>
                                  <td>{product.bill_amount}</td>
                                </tr>
                              ))
                            : null
                          : null}
                      </tbody>
                    </table>
                    <table className="w-100 text-dark">
                      <thead
                        style={{
                          borderTop: "1px solid #000000",
                          borderBottom: "1px solid #000000"
                        }}
                      >
                        <tr>
                          <th>Total Qty: 1</th>
                          <th>Sub Total</th>
                          <th>{data.total_amount}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{data.total_amount}@ SGST@2.5 %</td>
                          <td>2.5 %</td>
                          <td>
                            {Intl.NumberFormat("en-IN").format(
                              data.gst_total / 2
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>{data.total_amount}@ CGST@2.5 %</td>
                          <td>2.5 %</td>
                          <td>
                            {Intl.NumberFormat("en-IN").format(
                              data.gst_total / 2
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="w-100 text-dark">
                      <tbody
                        style={{
                          borderTop: "1px solid #000000",
                          borderBottom: "1px solid #000000"
                        }}
                      >
                        <tr>
                          <td>Grand Total</td>
                          <td>{data.total_tax_amount}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h6 className="gst_no text-dark">GST 27AAGCB3987J225</h6>
                    <h6 className="thanks text-dark">THANK YOU VISIT AGAIN!</h6>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <Button color="warning" onClick={this.newPrint} block>
                    <i className="fa fa-eye" />
                    Print Bill
                  </Button>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewBilling;
