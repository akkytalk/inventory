import React, { Component } from "react";
import authbg from "../../assets/images/background/login-register.jpg";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../Components/Custom/CustomInput";
import * as Yup from "yup";
import { postLogin } from "../../redux/Creators/LoginCreators";
import { Button } from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = dispatch => ({
  postLogin: data => {
    dispatch(postLogin(data));
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    let data = {
      email: values.email,
      password: values.password
    };
    
    setSubmitting(true);
    props.postLogin(data);
    return;
  };

  render() {
    if (this.props.login.login != "") {
      return <Redirect to={"/dashboard"} />;
    }
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${authbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="auth-wrapper align-items-center">
          <div className="container" style={{ paddingTop: 35 }}>
            <div className="no-gutters justify-content-center row">
              <div className="bg-white col-md-6 col-lg-4">
                <div className="p-4">
                  <h3 className="font-medium mb-3">Sign In</h3>
                  <Formik
                    initialValues={{
                      email: "",
                      password: ""
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().required("Enter Your Email"),
                      password: Yup.string().required("Enter Your Password")
                    })}
                  >
                    {formProps => (
                      <Form className="mt-3">
                        <label htmlFor="email" className="font-medium">
                          Email
                        </label>
                        <div className="mb-2 input-group input-group-lg">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </div>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="email"
                            id="email"
                            className={
                              "form-control" +
                              (formProps.errors.email && formProps.touched.email
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="yourname@company.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <label htmlFor="email" className="mt-3 font-medium">
                          Password
                        </label>
                        <div className="mb-2 input-group input-group-lg">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ti-pencil" />
                            </span>
                          </div>
                          <Field
                            component={CustomInput}
                            type="password"
                            name="password"
                            id="password"
                            className={
                              "form-control" +
                              (formProps.errors.password &&
                              formProps.touched.password
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="* * * * * *"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="mt-3 mb-3 row">
                          <div className="col-12">
                            <Button
                              type="submit"
                              disabled={formProps.isSubmitting}
                              color="primary"
                              size="lg"
                              block
                            >
                              Log In
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
