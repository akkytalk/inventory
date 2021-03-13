import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import { editShipment } from "../../../redux/Creators/ShipmentCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Table
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    addShipment: state.addShipment
  };
};

const mapDispatchToProps = dispatch => ({
  editShipment: data => {
    dispatch(editShipment(data));
  }
});

class Endofday extends Component {
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
    if (this.props.addShipment.edit.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = () => {
    const token = this.props.login.login.access_token;
    let data = {
      token: token,
      id: this.props.delivery.id
    };
    this.props.editShipment(data);
  };

  render() {
    const data = this.props.delivery;
    console.log(this.props);
    return (
      <React.Fragment>
        <Button
          className="btn-success pull-right"
          size="sm"
          onClick={this.toggle}
        >
          End of day
        </Button>
        <Modal
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>End of Delivery</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h3>Product Remaining</h3>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Sale Rate</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.shipment_inventory
                    ? data.shipment_inventory.map((data, index) => {
                        if (data.product_id != null) {
                          return (
                            <tr key={index}>
                              <td>
                                {data.product
                                  ? data.product.product_name
                                  : null}
                              </td>
                              <td>{data ? data.quantity : null}</td>
                              <td>
                                {data.product ? data.product.sale_rate : null}
                              </td>
                            </tr>
                          );
                        }
                      })
                    : null
                  : null}
              </tbody>
            </Table>
            <Row>
              <Col>
                Are you sure you want to end the day &amp; mark the Delivery as
                completed ?
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button block color="info" onClick={this.toggle}>
                  NO
                </Button>
              </Col>
              <Col>
                <Button block color="danger" onClick={this.handleSubmit}>
                  YES
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Endofday)
);
