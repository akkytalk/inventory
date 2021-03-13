import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="auth-wrapper align-items-center mt-5">
        <div className="container">
          <div className="no-gutters justify-content-center row">
            <div className="bg-dark text-white col-md-6 col-lg-4">
              <div className="p-4">
                <h2 className="display-5">
                  Hi,
                  <br />
                  <span className="text-cyan font-bold">Dude</span>
                </h2>
              </div>
            </div>
            <div className="bg-white col-md-6 col-lg-4">
              <div className="p-4">
                <h3 className="font-medium mb-3">Sign In</h3>
                <form className="mt-3" action="#/dashboard">
                  <label htmlFor="name" className="font-medium">
                    UserName
                  </label>
                  <div className="mb-2 input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="ti-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <div className="mb-2 input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="ti-user" />
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
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
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex no-block align-items-center mb-4 mt-4">
                    <input
                      id="exampleCustomCheckbox"
                      type="checkbox"
                      className="ml-3 custom-control-input"
                    />
                    <label
                      htmlFor="exampleCustomCheckbox"
                      className="custom-control-label"
                    >
                      I agree to all terms
                    </label>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    Already have an account?
                    <a href="#/login" className="text-info ml-1">
                      <b>Sign In</b>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
