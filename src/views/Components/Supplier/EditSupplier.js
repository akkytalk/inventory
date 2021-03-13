import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editSupplier } from "../../../redux/Creators/SupplierCreators";
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
    addSupplier: state.addSupplier
  };
};

const mapDispatchToProps = dispatch => ({
  editSupplier: data => {
    dispatch(editSupplier(data));
  }
});

class EditSupplier extends Component {
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
    if (this.props.addSupplier.edit.length > 0) {
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
      supplier_name: values.supplier_name,
      address: values.address,
      city: values.city,
      zipcode: values.zipcode,
      state: values.state,
      contact: values.contact,
      opening_balance: values.opening_balance
    };
    props.editSupplier(data);
    setSubmitting(false);
    return;
  };

  render() {
    const data = this.props.id;
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
                supplier_name: data? data.supplier_name : "",
                address: data? data.address : "",
                city: data? data.city : "",
                zipcode: data? data.zipcode : "",
                state: data? data.state : "",
                contact: data? data.contact : "",
                opening_balance: data? data.opening_balance : ""
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="supplier_name">Supplier Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="supplier_name"
                          id="supplier_name"
                          placeholder="Enter Supplier Name"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="address">Supplier Address</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter Supplier Address"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="city">City</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter City"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="zipcode">Zipcode</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder="Enter Zipcode"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="state">State</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="state"
                          id="state"
                          placeholder="Enter State"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="contact">Contact</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="contact"
                          id="contact"
                          placeholder="Enter Contact"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="opening_balance">Opening Balance</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="opening_balance"
                          id="opening_balance"
                          placeholder="Enter Opening Balance"
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditSupplier)
);
