import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../Custom/CustomInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editReversible } from "../../../redux/Creators/ReversibleCreators";
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
    reversible: state.reversible,
    addReversible: state.addReversible
  };
};

const mapDispatchToProps = dispatch => ({
  editReversible: data => {
    dispatch(editReversible(data));
  }
});

class EditReversible extends Component {
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
    if (this.props.addReversible.edit.length > 0) {
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
      product_name: values.product_name,
      client_name: values.client_name,
      no_of_products: values.no_of_products
    };
    props.editReversible(data);
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
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Edit Reversible</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                product_name: data
                  ? data.product
                    ? data.product.product_name
                    : null
                  : null,
                client_name: data
                  ? data.client
                    ? data.client.client_name
                    : null
                  : null,
                no_of_products: data ? data.no_of_products : null
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
                            <i className="far fa-calendar-alt" />
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
                  <Row>
                    <Col md={6}>
                      <Label for="no_of_products">No. Of Products</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="number"
                          name="no_of_products"
                          id="no_of_products"
                          placeholder="Enter No. Of Products"
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
  connect(mapStateToProps, mapDispatchToProps)(EditReversible)
);
