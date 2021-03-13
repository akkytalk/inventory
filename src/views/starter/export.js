import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Link to="purchasereport">
              <Button outline color="warning" block >
                Purchase Report
              </Button>
            </Link>
          </div>
          {/* <div className="col-sm-12 col-md-6 col-lg-4">
            <Button outline color="danger" block>
              Financial Report
            </Button>
          </div> */}
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="info" block>
              Inventory Report
            </Button>
          </div>
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="primary" block>
              Itemwise Report
            </Button>
          </div>
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="info" block>
              Return Report
            </Button>
          </div>
          {/* <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="warning" block>
              Stock-Tally Report
            </Button>
          </div> */}
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="success" block>
              Sales Report
            </Button>
          </div>
          <div className="p-1 col-sm-12 col-md-6 col-lg-4">
            <Button outline color="danger" block>
              Transaction Report
            </Button>
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default Export;
