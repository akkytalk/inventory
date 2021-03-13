import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";
import * as Yup from "yup";
import { postShipment } from "../../../redux/Creators/ShipmentCreators";
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
    shipment: state.shipment,
    addShipment: state.addShipment
  };
};

const mapDispatchToProps = dispatch => ({
  postShipment: data => {
    dispatch(postShipment(data));
  }
});

class AddShipment extends Component {
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
      if (this.props.addShipment.shipment.length > 0) {
        this.setState({
          modal: false
        });
      }
    }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      user_id: values.user_id,
      truck_no: values.truck_no,
      leaving_time: values.leaving_time,
      return_time: values.return_time
    };
    props.postShipment(data);
    setSubmitting(false);
    return;
  };

  render() {
    const deliveryuser = this.props.user.deliveryuser;
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" /> Add Shipment
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Shipment</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                user_id: "",
                truck_no: "",
                leaving_time: "",
                return_time: ""
              }}
              onSubmit={this.handleSubmit}
              //   validationSchema={Yup.object().shape({
              //     category_name: Yup.string().required(
              //       "Name of Category is required"
              //     )
              //   })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="truck_no">Truck No.</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="truck_no"
                          id="truck_no"
                          placeholder="Enter Truck Number"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="user_id">User for delivery</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomSelect}
                          name="user_id"
                          id="user_id"
                          placeholder="Enter Category Name"
                        >
                          <option disabled>Select Delivery User</option>
                          <option hidden>Select Delivery User</option>
                          {deliveryuser
                            ? deliveryuser.map((delivery, index) => (
                                <option key={index} value={delivery.id}>{delivery.name}</option>
                              ))
                            : null}
                        </Field>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="leaving_time">Leaving Time</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="leaving_time"
                          id="leaving_time"
                          placeholder="Enter Leaving Time"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="return_time">Return Time</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="return_time"
                          id="return_time"
                          placeholder="Enter Return Time"
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
  connect(mapStateToProps, mapDispatchToProps)(AddShipment)
);
