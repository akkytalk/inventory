import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";
import { postProduct } from "../../../redux/Creators/ProductCreators";
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
    product: state.product,
    addProduct: state.addProduct
  };
};

const mapDispatchToProps = dispatch => ({
  postProduct: data => {
    dispatch(postProduct(data));
  }
});

class AddProduct extends Component {
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
    if (this.props.addProduct.product.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      category_name: values.category_name,
      product_name: values.product_name,
      hsn_code: values.hsn_code,
      type: values.type,
      weight: values.weight,
      size: values.size,
      color: values.color,
      sale_rate: values.sale_rate,
      gst_rate: values.gst_rate,
      cess_rate: values.cess_rate,
      reversible: values.reversible,
    };
    props.postProduct(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.categorydata;
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" />{" "}
          {this.props.buttonname ? this.props.buttonname : "Add Product"}
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Product</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                category_name: "",
                product_name: "",
                hsn_code: "",
                type: "",
                weight: "",
                size: "",
                color: "",
                sale_rate: "",
                gst_rate: "",
                cess_rate: "",
                revesible: ""
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="category_name">Category Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="category_name"
                          id="category_name"
                          placeholder="Enter Product Name"
                        >
                          <option hidden>Select Category</option>
                          <option disabled>Select Category</option>
                          {data
                            ? data.map((data, index) => (
                                <option key={index}>
                                  {data.category_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="product_name">Product Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="product_name"
                          id="product_name"
                          placeholder="Enter Product Name"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="hsn_code">HSN Code</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="hsn_code"
                          id="hsn_code"
                          placeholder="Enter HSN Code"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="sale_rate">Sale Rate</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="sale_rate"
                          id="sale_rate"
                          placeholder="Enter Sale Rate"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="type">Product Type</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="type"
                          id="type"
                          placeholder="Enter Product Type"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="size">Size</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="size"
                          id="size"
                          placeholder="Enter Product Size"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="weight">Weight</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="weight"
                          id="weight"
                          placeholder="Enter Product Weight"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="color">Color</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="color"
                          id="color"
                          placeholder="Enter Product Color"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="gst_rate">GST Rate</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="gst_rate"
                          id="gst_rate"
                          placeholder="Enter GST Rate"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="cess_rate">CESS</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="cess_rate"
                          id="cess_rate"
                          placeholder="Enter CESS Rate"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="reversible">Is this Product Reversible ?</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="reversible"
                          id="reversible"
                          placeholder="Enter GST Rate"
                        >
                          <option hidden>Select</option>
                          <option disabled>Select</option>
                          <option value="1">Yes</option>
                          <option vlaue="0">No</option>
                        </Field>
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
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
