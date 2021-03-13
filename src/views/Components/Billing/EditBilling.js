import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomInput from "../Custom/CustomInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editBilling } from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText,
  FormGroup,
  Table
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  editBilling: data => {
    dispatch(editBilling(data));
  }
});

class EditBilling extends Component {
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

  componentDidUpdate() {
    if (this.props.addBilling.edit.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    const id = props.id.id;
    let data = {
      token: token,
      id: id,
      client_name: values.client_name,
      invoice_no: values.invoice_no,
      invoice_date: values.invoice_date,
      product_name: values.product_name,
      product: values.product
    };
    props.editBilling(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.id;
    const client = this.props.client.clientid;
    const productdata = this.props.product.productorder;
    console.log(data);
    return (
      <React.Fragment>
        <Button size="sm" className="btn-info pull-right" onClick={this.toggle}>
          <i className="fa fa-pencil-alt" />
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Edit Category</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                client_name: data
                  ? data.client
                    ? data.client.client_name
                    : data.customer_name
                  : "",
                invoice_no: data ? data.invoice_no : "",
                invoice_date: data ? data.invoice_date : "",
                product_name: "",
                product: data ? data.bill_detail : []
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                client_name: Yup.string().required("Client Name is required")
              })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={4}>
                      <Label for="client_name">Client Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="client_name"
                          id="client_name"
                          list="data"
                          className={
                            "form-control" +
                            (formProps.errors.client_name &&
                            formProps.touched.client_name
                              ? " is-invalid"
                              : "")
                          }
                          placeholder="Enter Customer Name"
                        />
                        <ErrorMessage
                          name="client_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="invoice_no">Invoice No.</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="invoice_no"
                            id="invoice_no"
                            placeholder="Enter Invoice No."
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="invoice_date">Invoice Date</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="date"
                            name="invoice_date"
                            id="invoice_date"
                            placeholder="Enter Invoice Date"
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FieldArray
                        name="product"
                        render={arrayHelpers => (
                          <div>
                            <Table>
                              <thead>
                                <tr>
                                  <th>Sr No.</th>
                                  <th>Product Name</th>
                                  <th>Sale Rate</th>
                                  <th>GST</th>
                                  <th>CESS</th>
                                  <th>Quantity</th>
                                  <th>Final Rate</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formProps.values.product.map(
                                  (product, index) => {
                                    let obj = productdata.find((o, i) => {
                                      if (
                                        product.product_name === o.product_name
                                      ) {
                                        product.sale_rate = o.sale_rate;
                                        product.gst_rate = o.gst_rate;
                                        if (o.cess_rate != null) {
                                          product.cess_rate = o.cess_rate;
                                        } else {
                                          product.cess_rate = 0;
                                        }
                                        var sale_rate = Number(
                                          product.sale_rate
                                        );
                                        var quantity = Number(product.quantity);
                                        var gst =
                                          (Number(product.gst_rate) / 100) *
                                          sale_rate;
                                        var cess =
                                          (Number(product.cess_rate) / 100) *
                                          sale_rate;
                                        var final =
                                          (sale_rate + gst) * quantity;
                                        product.total_amount = final;
                                      }
                                    });
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="text"
                                            list="productdatalist"
                                            name={`product.${index}.product_name`}
                                            id="product"
                                          />
                                          <datalist id="productdatalist">
                                            {productdata.map((item, index) => (
                                              <option
                                                key={index}
                                                value={item.product_name}
                                              />
                                            ))}
                                          </datalist>
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            readOnly
                                            type="text"
                                            name={`product.${index}.sale_rate`}
                                            id="product"
                                            placeholder="Enter Rate"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            readOnly
                                            type="text"
                                            name={`product.${index}.gst_rate`}
                                            id="product"
                                            placeholder="Enter Rate"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            readOnly
                                            type="text"
                                            name={`product.${index}.cess_rate`}
                                            id="product"
                                            placeholder="Enter Rate"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="number"
                                            min="1"
                                            name={`product.${index}.quantity`}
                                            id="product"
                                            placeholder="Enter Quantity"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            readOnly
                                            type="text"
                                            name={`product.${index}.total_amount`}
                                            id="product"
                                            placeholder="Final Price"
                                          />
                                        </td>
                                        <td>
                                          <Button
                                            color="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            <i className="fa fa-trash" />
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>Total</td>
                                  <td>
                                    <i className="fa fa-rupee-sign" />{" "}
                                    {formProps.values.product.reduce(function(
                                      prev,
                                      cur
                                    ) {
                                      return prev + cur.total_amount;
                                    },
                                    0)}
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </Table>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Button
                                    block
                                    color="success"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        product_name: "",
                                        sale_rate: "",
                                        gst_rate: "",
                                        cess_rate: "",
                                        quantity: "",
                                        discount: "",
                                        total_amount: ""
                                      });
                                    }}
                                  >
                                    Add Product
                                  </Button>
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row style={{ justifyContent: "center" }}>
                    <Col md={4}>
                      <Button type="reset" color="danger" block>
                        <b>Reset</b>
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        color="primary"
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditBilling)
);
