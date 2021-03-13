import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Scale from "../../components/loader/Scale";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCount } from "../../redux/Creators/StockCreators";

const mapStateToProps = state => {
  return {
    login: state.login,
    stock: state.stock
  };
};

const mapDispatchToProps = dispatch => ({
  getCount: data => {
    dispatch(getCount(data));
  }
});

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchCount();
  }

  async fetchCount() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getCount(data);
  }

  render() {
    const data = this.props.stock;
    return (
      <div className="row">
        <div className="col-sm-12 col-lg-3">
          <Card outline color="success">
            <CardHeader className="bg-warning text-white">
              <h3 className="mb-0">Today's Sales</h3>
            </CardHeader>
            <CardBody>
              {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.count ? (
                  <h3>{data.count.todaysale}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Amount in Ruppees</h6>
            </CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-lg-3">
          <Card>
            <CardHeader className="bg-success text-white">
              <h3 className="mb-0">Stock Worth</h3>
            </CardHeader>
            <CardBody>
              {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.count ? (
                  <h3>{data.count.stockworth}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Amount in Ruppees</h6>
            </CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-lg-3">
          <Card>
            <CardHeader className="bg-danger text-white">
              <h3 className="mb-0">Month's Sales</h3>
            </CardHeader>
            <CardBody>
              {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.count ? (
                  <h3>{data.count.monthsale}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Amount in Ruppees</h6>
            </CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-lg-3">
          <Card>
            <CardHeader className="bg-info text-white">
              <h3 className="mb-0">Low on Stock</h3>
            </CardHeader>
            <CardBody>
              {data ? (
                data.isLoading ? (
                  <Scale />
                ) : data.count ? (
                  <h3>{data.count.lowstock}</h3>
                ) : null
              ) : null}
            </CardBody>
            <CardFooter>
              <h6>Products</h6>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
