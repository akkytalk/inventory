import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import { postWarehouse } from "../../../redux/Creators/WarehouseCreators";
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
    warehouse: state.warehouse,
    addWarehouse: state.addWarehouse
  };
};

const mapDispatchToProps = dispatch => ({
  postWarehouse: data => {
    dispatch(postWarehouse(data));
  }
});

class AddWarehouse extends Component {
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
    if (this.props.addWarehouse.warehouse.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      warehouse_name: values.warehouse_name,
      warehouse_code: values.warehouse_code,
      warehouse_address: values.warehouse_address
    };
    props.postWarehouse(data);
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" /> Add Warehouse
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Warehouse</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                warehouse_name: "",
                warehouse_code: "",
                warehouse_address: ""
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                warehouse_name: Yup.string().required(
                  "Name of Warehouse is required"
                )
              })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="warehouse_name">Warehouse Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="warehouse_name"
                          id="warehouse_name"
                          className={
                            "form-control" +
                            (formProps.errors.warehouse_name &&
                            formProps.touched.warehouse_name
                              ? " is-invalid"
                              : "")
                          }
                          placeholder="Enter Warehouse Name"
                        />
                        <ErrorMessage
                          name="warehouse_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="warehouse_code">Warehouse Code</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="warehouse_code"
                          id="warehouse_code"
                          placeholder="Enter Warehouse Code"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="warehouse_address">Warehouse Address</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="warehouse_address"
                          id="warehouse_address"
                          placeholder="Enter Warehouse Address"
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
  connect(mapStateToProps, mapDispatchToProps)(AddWarehouse)
);
