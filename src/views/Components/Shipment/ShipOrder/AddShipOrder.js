import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomCheckbox from "../../Custom/CustomCheckbox";
import { postShipinventory } from "../../../../redux/Creators/ShipinvetoryCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import CustomSelect from "../../Custom/CustomSelect";
import ProductCollapse from "./ProductCollapse";

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

class AddShipOrder extends Component {
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
    console.log(values);
    let data = {
      shipment_id: id,
      token: token,
      orders: values.orders
    };
    props.postShipinventory(data);
    setSubmitting(false);
    return;
  };

  render() {
    const orderdata = this.props.order.orderid;
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          <i className="fa fa-plus" /> Add Order
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
                orders: []
              }}
              onSubmit={this.handleSubmit}
              //   validationSchema={Yup.object().shape({
              //     shipinventory_name: Yup.string().required(
              //       "Name of Category is required"
              //     )
              //   })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col>
                      <table className="w-100 text-dark">
                        <thead
                          style={{
                            borderTop: "1px solid #000000",
                            borderBottom: "1px solid #000000"
                          }}
                        >
                          <tr>
                            <th>Sr No.</th>
                            <th>Select</th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Total Amount</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderdata
                            ? orderdata.map((order, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <CustomCheckbox
                                      name="orders"
                                      value={order.id}
                                    />
                                  </td>
                                  <td>
                                    {order
                                      ? order.client
                                        ? order.client.client_name
                                        : order.customer_name
                                      : null}
                                  </td>
                                  <td>
                                    {order ? order.client ? order.client.client_address : order.place_of_supply : null}
                                  </td>
                                  <td>
                                    {order ? order.total_tax_amount : null}
                                  </td>
                                  <td>
                                    <ProductCollapse
                                      billDetail={order.order_detail}
                                    />
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
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
  connect(mapStateToProps, mapDispatchToProps)(AddShipOrder)
);
