import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getDeliveryUser } from "../../../redux/Creators/UserCreators";
import AddShipment from "./AddShipment";
import {
  getShipmentPage,
  deleteShipment
} from "../../../redux/Creators/ShipmentCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Col,
  Row,
  Button
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    user: state.user,
    shipment: state.shipment,
    addShipment: state.addShipment
  };
};

const mapDispatchToProps = dispatch => ({
  getShipmentPage: data => {
    dispatch(getShipmentPage(data));
  },
  deleteShipment: data => {
    dispatch(deleteShipment(data));
  },
  getDeliveryUser: data => {
    dispatch(getDeliveryUser(data));
  }
});

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: null,
      page: 0,
      pageSize: 10,
      filtered: []
    };
  }

  componentDidMount() {
    this.fetchDeliverUser();
  }

  async fetchData(state, instance) {
    const token = this.props.login.login.access_token;
    let pageno = state.page + 1;
    let pageSize = 10;

    if (state.pageSize) {
      pageSize = state.pageSize;
    }

    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token
    };

    await this.props.getShipmentPage(data);
  }

  async fetchDeliverUser() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getDeliveryUser(data);
  }

  //   async handleDelete(data, event) {
  //     event.preventDefault();
  //     const token = this.props.login.login.access_token;
  //     data.token = token;
  //     await this.props.removeStock(data);
  //   }

  componentDidUpdate() {
    if (this.props.addShipment.shipment.length > 0) {
      this.props.deleteShipment("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addShipment.delete.length > 0) {
      this.props.deleteShipment("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addShipment.edit.length > 0) {
      this.props.deleteShipment("");
      this.fetchData(this.state, "aaaa");
    }
  }

  handleRoute = e => {
    this.setState({
      redirect: true,
      id: e.id
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect to={`/shipinventory/${this.state.id}`} {...this.props} />
      );
    }
  };

  render() {
    console.log(this.props);
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Truck Number",
            accessor: "truck_no" // String-based value accessors!
          },
          {
            Header: "Leaving Time",
            accessor: "leaving_time" // String-based value accessors!
          },
          {
            Header: "Return Time",
            accessor: "return_time" // String-based value accessors!
          },
          {
            Header: "Delivery Status",
            accessor: "end_of_day",
            Cell: row => (
              <span>{row.value === "1" ? "Completed" : "InComplete"}</span>
            )
          }
        ]
      },
      {
        Header: "Action",
        columns: [
          // {
          //   Header: "Edit",
          //   maxWidth: 60,
          //   Cell: ({ row }) => (
          //     <Container>
          //       <Row>
          //         <Col>
          //           <EditInventory id={row._original} />
          //         </Col>
          //       </Row>
          //     </Container>
          //   )
          // },
          {
            Header: "Open",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <Button
                      color="warning"
                      size="sm"
                      onClick={e => this.handleRoute(row._original, e)}
                    >
                      <i className="fa fa-folder-open" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            )
          }
        ]
      }
    ];

    return (
      <Card>
        {this.renderRedirect()}
        <CardHeader className="bg-primary text-white">
          <i className="far fa-sticky-note" /> <strong>Shipments</strong>
          <AddShipment {...this.props} />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.shipment.isLoading}
            data={this.props.shipment.shipment.data}
            pages={this.props.shipment.shipment.last_page}
            onFetchData={(state, instance) => this.fetchData(state, instance)}
            defaultPageSize={10}
            // filterable
            className="-highlight"
            page={this.state.page}
            pageSize={this.state.pageSize}
            filtered={this.state.filtered}
            // Callbacks
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })
            }
          />
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Inventory)
);
