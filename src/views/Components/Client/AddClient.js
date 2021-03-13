import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import { postClient } from "../../../redux/Creators/ClientCreators";
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
    client: state.client,
    addClient: state.addClient
  };
};

const mapDispatchToProps = dispatch => ({
  postClient: data => {
    dispatch(postClient(data));
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
    if (this.props.addClient.client.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      client_name: values.client_name,
      client_address: values.client_address,
      city: values.city,
      zipcode: values.zipcode,
      state: values.state,
      discount: values.discount,
      client_contact: values.client_contact
    };
    props.postClient(data);
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <React.Fragment>
        <Button className="btn-success pull-right" size="sm" onClick={this.toggle}>
        <i className="fa fa-plus"/> {this.props.buttonname ? this.props.buttonname : "Add Client"}
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Client</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                client_name: "",
                client_address: "",
                city: "",
                zipcode: "",
                state: "",
                discount: "",
                client_contact: ""
              }}
              onSubmit={this.handleSubmit}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="client_name">Client Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="client_name"
                          id="client_name"
                          placeholder="Enter Client Name"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="client_address">Client Address</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="client_address"
                          id="client_address"
                          placeholder="Enter Client Address"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="client_contact">Contact</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="client_contact"
                          id="client_contact"
                          placeholder="Enter Contact"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="discount">Client Discount</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="discount"
                          id="discount"
                          placeholder="Enter Client Discount"
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
                            <i className="far fa-sticky-note" />
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
                      <Label for="zipcode">ZipCode</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder="Enter ZipCode"
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
                            <i className="far fa-sticky-note" />
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
                      <Label for="client_gst">GST Number</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="client_gst"
                          id="client_gst"
                          placeholder="Enter GST No."
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
