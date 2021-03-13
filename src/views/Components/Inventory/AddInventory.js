import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";
import * as Yup from "yup";
import { postStock } from "../../../redux/Creators/StockCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
  InputGroupText
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    supplier: state.supplier,
    stock: state.stock,
    addStock: state.addStock
  };
};

const mapDispatchToProps = dispatch => ({
  postStock: data => {
    dispatch(postStock(data));
  }
});

class AddCategory extends Component {
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
    if (this.props.addStock.stock.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    const warehouse_id = props.match.params.id;
    let data = {
      token: token,
      warehouse_id: warehouse_id,
      supplier_name: values.supplier_name,
      product_name: values.product_name,
      quantity: values.quantity,
      supply_price: values.supply_price,
      total_price: values.total_price,
      amount_paid: values.amount_paid,
    };
    props.postStock(data);
    setSubmitting(false);
    return;
  };

  render() {
    const supplierdata = this.props.supplier;
    const productdata = this.props.product;
    console.log(this.props);
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" /> Add Stock
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Stock</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                supplier_name: "",
                product_name: "",
                quantity: "",
                supply_price: "",
                total_price: "",
                amount_paid: "",
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                product_name: Yup.string().required(
                  "Name of Product is required"
                )
              })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="supplier_name">Supplier Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="supplier_name"
                          id="supplier_name"
                          placeholder="Enter Supplier Name"
                        >
                          <option disabled>Select Supplier</option>
                          <option hidden>Select Supplier</option>
                          {supplierdata
                            ? supplierdata.supplier
                              ? supplierdata.supplierid.map(
                                  (supplier, index) => (
                                    <option
                                      key={index}
                                      value={supplier.supplier_name}
                                    >
                                      {supplier.supplier_name}
                                    </option>
                                  )
                                )
                              : null
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="product_name">Product Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="product_name"
                          id="product_name"
                          list="productdatalist"
                          className={
                            "form-control" +
                            (formProps.errors.product_name &&
                            formProps.touched.product_name
                              ? " is-invalid"
                              : "")
                          }
                          placeholder="Enter Product Name"
                        />
                        <ErrorMessage
                          name="product_name"
                          component="div"
                          className="invalid-feedback"
                        />
                        <datalist id="productdatalist">
                          {productdata
                            ? productdata.productid
                              ? productdata.productid.map((product, index) => (
                                  <option
                                    key={index}
                                    value={product.product_name}
                                  />
                                ))
                              : null
                            : null}
                        </datalist>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="quantity">Quantity</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Supplied Quantity"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="supply_price">Price Per Product</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="supply_price"
                          id="supply_price"
                          placeholder="Enter Price Per Product"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="total_price">Total Price</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="total_price"
                          id="total_price"
                          placeholder="Enter Total Price"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="amount_paid">Amount Paid</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="amount_paid"
                          id="amount_paid"
                          placeholder="Enter Amount Paid"
                        />
                      </InputGroup>
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
  connect(mapStateToProps, mapDispatchToProps)(AddCategory)
);
