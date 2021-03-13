import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Custom/CustomInput";
import * as Yup from "yup";
import { postCategory } from "../../../redux/Creators/CategoryCreators";
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
import { HotKeys } from "react-hotkeys";

const mapStateToProps = state => {
  return {
    login: state.login,
    category: state.category,
    addCategory: state.addCategory
  };
};

const mapDispatchToProps = dispatch => ({
  postCategory: (data) => {
    dispatch(postCategory(data));
  }
});

const keyMap = {
  ADD_CAT: "ctrl+shift+a",
};

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, konamiTime: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate() {
    if (this.props.addCategory.category.length > 0) {
      this.setState({
        modal: false
      });
    }
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;
    let data = {
      token: token,
      category_name: values.category_name
    };
    props.postCategory(data);
    setSubmitting(false);
    return;
  };
  test(){
    this.setState({ konamiTime: true });
  }

  render() {
    const handlers = {
      ADD_CAT: this.test.bind(this)
    };
    return (
      <React.Fragment>
        <HotKeys keyMap={keyMap} handlers={handlers} />
        <Button className="btn-success pull-right" size="sm" onClick={this.toggle}>
        <i className="fa fa-plus"/> Add Category
        </Button>
        <Modal
          className="modal-info"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Category</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                category_name: ""
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                category_name: Yup.string().required(
                  "Name of Category is required"
                )
              })}
            >
              {formProps => (
                <Form>
                  <Row className="form-group">
                    <Col>
                      <Label for="category_name">Category Name</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="category_name"
                          id="category_name"
                          className={
                            "form-control" +
                            (formProps.errors.category_name &&
                            formProps.touched.category_name
                              ? " is-invalid"
                              : "")
                          }
                          placeholder="Enter Category Name"
                        />
                        <ErrorMessage
                          name="category_name"
                          component="div"
                          className="invalid-feedback"
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
  )(AddCategory)
);
