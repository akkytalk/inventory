import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../Custom/CustomInput";
import * as Yup from "yup";
import { postShipinventory } from "../../../../redux/Creators/ShipinvetoryCreators";
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
import CustomSelect from "../../Custom/CustomSelect";

const mapStateToProps = state => {
  return {
    login: state.login,
    shipinventory: state.shipinventory,
    addShipinventory: state.addShipinventory
  };
};

const mapDispatchToProps = dispatch => ({
  postShipinventory: data => {
    dispatch(postShipinventory(data));
  }
});

class AddShipInventory extends Component {
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
    if (this.props.addShipinventory.shipinventory.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    const id = props.match.params.id;
    let data = {
      token: token,
      shipment_id: id,
      product_name: values.product_name,
      quantity: values.quantity
    };
    props.postShipinventory(data);
    setSubmitting(false);
    return;
  };

  render() {
    const productdata = this.props.product.productorder;
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" /> Add Product Inventory
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Invetory</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                product_name: "",
                quantity: ""
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col mde={6}>
                      <Label for="product_name">Product Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="product_name"
                          id="product_name"
                          placeholder="Enter Category Name"
                        >
                          <option disabled>Select Product</option>
                          <option hidden>Select Product</option>
                          {productdata
                            ? productdata.map((product, index) => (
                                <option
                                  key={index}
                                  value={product.product_name}
                                >
                                  {product.product_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                    <Col mde={6}>
                      <Label for="quantity">Product Quantity</Label>
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
                          placeholder="Enter Product Quantity"
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
  connect(mapStateToProps, mapDispatchToProps)(AddShipInventory)
);
