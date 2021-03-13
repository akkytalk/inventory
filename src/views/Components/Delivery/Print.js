import React, { Component } from "react";
import printJS from "print-js";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { generateBilling } from "../../../redux/Creators/BillingCreators";
import * as Yup from "yup";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  generateBilling: data => {
    dispatch(generateBilling(data));
  }
});

class Print extends Component {
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

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    console.log(values)
    const token = props.login.login.access_token;
    const id = props.id.id;
    let data = {
        token: token,
        id: id,
        product: values.product
      };
      props.generateBilling(data);
      setSubmitting(false);
      printJS({
        printable: "divToPrint",
        type: "html",
        scanStyles: "true",
        targetStyles: "[*]"
      });
      return;
  };

  render() {
    const data = this.props.id;
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
                          <th scope="col">
                            {data
                              ? data.client
                                ? data.client.client_name
                                : data.customer_name
                              : null}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Date:</td>
                          <td>{data ? data.created_at : null}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Bill No.:{data ? data.order_no : null}</td>
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
                          ? data.order_detail
                            ? data.order_detail.map((product, index) => (
                                <tr key={index}>
                                  <td>
                                    {product.product
                                      ? product.product.product_name
                                      : null}
                                  </td>
                                  <td>{product.quantity}</td>
                                  <td>{product.order_rate}</td>
                                  <td>{product.order_amount}</td>
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
                          <th>{data ? data.total_amount : null}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{data ? data.total_amount : null}@ SGST@2.5 %</td>
                          <td>2.5 %</td>
                          <td>
                            {data
                              ? Intl.NumberFormat("en-IN").format(
                                  data.gst_total / 2
                                )
                              : null}
                          </td>
                        </tr>
                        <tr>
                          <td>{data ? data.total_amount : null}@ CGST@2.5 %</td>
                          <td>2.5 %</td>
                          <td>
                            {data
                              ? Intl.NumberFormat("en-IN").format(
                                  data.gst_total / 2
                                )
                              : null}
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
                          <td>{data ? data.total_tax_amount : null}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h6 className="gst_no text-dark">GST 27AAGCB3987J225</h6>
                    <h6 className="thanks text-dark">THANK YOU VISIT AGAIN!</h6>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    initialValues={{
                      id: data.id,
                      product: data ? data.order_detail : []
                    }}
                    onSubmit={this.handleSubmit}
                  >
                    {formProps => (
                      <Form>
                        <FieldArray
                          name="product"
                          render={arrayHelpers => (
                            <div>
                              {formProps.values.product.map(
                                (product, index) => {
                                  if (product.product.reversible === "1") {
                                    return (
                                      <Row key={index} className="form-group">
                                        <Col>
                                          <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>
                                                <i className="fas fa-box" />
                                              </InputGroupText>
                                            </InputGroupAddon>
                                            <Field
                                              component={CustomInput}
                                              readOnly
                                              type="text"
                                              name={`product.${index}.product_name`}
                                              id="client_name"
                                              placeholder="Enter Customer Name"
                                            />
                                          </InputGroup>
                                        </Col>
                                        <Col>
                                          <FormGroup>
                                            <InputGroup>
                                              <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                  <i className="far fa-calendar-alt" />
                                                </InputGroupText>
                                              </InputGroupAddon>
                                              <Field
                                                component={CustomInput}
                                                type="number"
                                                min="0"
                                                name={`product.${index}.reverse`}
                                                id="product"
                                                placeholder="Reversibles"
                                              />
                                            </InputGroup>
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    );
                                  }
                                }
                              )}
                            </div>
                          )}
                        />
                        <br />
                        <Container>
                          <Row>
                            <Col>
                              <Button
                                type="submit"
                                color="warning"
                                block
                              >
                                <i className="fa fa-eye" />
                                Print Bill
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Print)
);
