import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import {
  postBilling,
  deleteBilling
} from "../../../redux/Creators/BillingCreators";
import { getCategory } from "../../../redux/Creators/CategoryCreators";
import {
  getClient,
  deleteClient
} from "../../../redux/Creators/ClientCreators";
import {
  getProductOrder,
  deleteProduct
} from "../../../redux/Creators/ProductCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddClient from "../Client/AddClient";
import AddProduct from "../Product/AddProduct";
import {
  Row,
  Col,
  Table,
  Card,
  Label,
  Button,
  CardBody,
  FormGroup,
  InputGroup,
  CardHeader,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    client: state.client,
    product: state.product,
    addProduct: state.addProduct,
    addClient: state.addClient,
    category: state.category,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  postBilling: data => {
    dispatch(postBilling(data));
  },
  getClient: data => {
    dispatch(getClient(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getProductOrder: data => {
    dispatch(getProductOrder(data));
  },
  deleteBilling: data => {
    dispatch(deleteBilling(data));
  },
  deleteClient: data => {
    dispatch(deleteClient(data));
  },
  deleteProduct: data => {
    dispatch(deleteProduct(data));
  }
});

class AddBilling extends Component {
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

  componentDidMount() {
    this.fetchClient();
    this.fetchCategory();
    this.fetchProduct();
  }

  fetchClient() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getClient(data);
  }

  fetchCategory() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getCategory(data);
  }

  fetchProduct() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getProductOrder(data);
  }

  componentDidUpdate() {
    if (this.props.addProduct.product.length > 0) {
      this.props.deleteProduct("");
      this.fetchProduct();
    }
    if (this.props.addClient.client.length > 0) {
      this.props.deleteClient("");
      this.fetchClient();
    }
    if (this.props.addBilling.billing.length > 0) {
      this.props.deleteBilling("");
      this.props.history.push("/billing");
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    console.log(values.product_name);
    const token = props.login.login.access_token;
    let data = {
      token: token,
      client_name: values.client_name,
      invoice_no: values.invoice_no,
      invoice_date: values.invoice_date,
      product_name: values.product_name,
      product: values.product
    };
    props.postBilling(data);
    setSubmitting(false);
    return;
  };

  render() {
    const client = this.props.client.clientid;
    const productdata = this.props.product.productorder;
    console.log(productdata);
    return (
      <Card>
        <CardHeader>Add New Bill</CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              client_name: "",
              invoice_no: "",
              invoice_date: "",
              product_name: "",
              product: []
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object().shape({
              client_name: Yup.string().required("Client Name is required")
            })}
          >
            {formProps => (
              <Form>
                <Row>
                  <Col>
                    <AddClient buttonname="Add New Client" />
                  </Col>
                  <Col>
                    <AddProduct
                      buttonname="Add New Product"
                      categorydata={this.props.category.categoryid}
                    />
                  </Col>
                </Row>
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
                      <datalist id="data">
                        {client.map((item, index) => (
                          <option key={index} value={item.client_name} />
                        ))}
                      </datalist>
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
                          <Table style={{ padding: 0 }}>
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Reversible</th>
                                <th>Sale Rate</th>
                                <th>GST</th>
                                <th>CESS</th>
                                <th>Final Rate</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formProps.values.product.map(
                                (product, index) => {
                                  let obj = productdata.find((o, i) => {
                                    let cli = client.find((o, i) => {
                                      if (
                                        formProps.values.client_name ===
                                          o.client_name &&
                                        o.reversible.length !== 0
                                      ) {
                                        var disabler = true;
                                        if (o.reversible) {
                                          o.reversible.map(
                                            (reversible, index) => {
                                              if (reversible.product) {
                                                if (
                                                  product.product_name ===
                                                  reversible.product
                                                    .product_name
                                                ) {
                                                  console.log("reverse");
                                                  disabler = false;
                                                  product.disabler = disabler;
                                                }
                                              }
                                            }
                                          );
                                        }
                                      }
                                    });
                                    if (
                                      product.product_name === o.product_name
                                    ) {
                                      var max = 0;
                                      if (o.stock.length !== 0) {
                                        max = o.stock[0].quantity;
                                        product.maxquantity = max;
                                      }

                                      product.sale_rate = o.sale_rate;
                                      product.gst_rate = o.gst_rate;
                                      if (o.cess_rate != null) {
                                        product.cess_rate = o.cess_rate;
                                      } else {
                                        product.cess_rate = 0;
                                      }
                                      var sale_rate = Number(product.sale_rate);
                                      var quantity = Number(product.quantity);
                                      var gst =
                                        (Number(product.gst_rate) / 100) *
                                        sale_rate;
                                      var cess =
                                        (Number(product.cess_rate) / 100) *
                                        sale_rate;
                                      var final =
                                        (sale_rate + gst + cess) * quantity;
                                      product.final_price = final;
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
                                          id="product_name"
                                          name={`product.${index}.product_name`}
                                          id="product"
                                          placeholder="Enter Product Name"
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
                                          type="number"
                                          min="1"
                                          max={product.maxquantity}
                                          name={`product.${index}.quantity`}
                                          id="product"
                                          placeholder="Enter Quantity"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          component={CustomInput}
                                          disabled={product.disabler}
                                          type="number"
                                          min="1"
                                          name={`product.${index}.reverse`}
                                          id="product"
                                          placeholder="Enter Reverse"
                                        />
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
                                          readOnly
                                          type="text"
                                          name={`product.${index}.final_price`}
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
                                <td></td>
                                <td>Total</td>
                                <td>
                                  <i className="fa fa-rupee-sign" />{" "}
                                  {formProps.values.product.reduce(function(
                                    prev,
                                    cur
                                  ) {
                                    return prev + cur.final_price;
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
                                      reverse: "",
                                      discount: "",
                                      final_price: "",
                                      maxquantity: "",
                                      disabler: true
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
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddBilling)
);
