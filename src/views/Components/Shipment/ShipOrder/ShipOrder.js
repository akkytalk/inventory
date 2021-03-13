import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddShipOrder from "./AddShipOrder";
import { Card, CardHeader, CardBody } from "reactstrap";
import { getOrder } from "../../../../redux/Creators/OrderCreators";
import {
  showShipinventoryOrder,
  deleteShipinventory
} from "../../../../redux/Creators/ShipinvetoryCreators";

const mapStateToProps = state => {
  return {
    login: state.login,
    shipinventory: state.shipinventory,
    addShipinventory: state.addShipinventory,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => ({
  showShipinventoryOrder: data => {
    dispatch(showShipinventoryOrder(data));
  },
  getOrder: data => {
    dispatch(getOrder(data));
  },
  deleteShipinventory: data => {
    dispatch(deleteShipinventory(data));
  }
});

class ShipOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      filtered: []
    };
  }

  componentDidMount() {
    this.fetchOrder();
  }

  async fetchOrder() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getOrder(data);
  }

  async fetchData(state, instance) {
    const token = this.props.login.login.access_token;
    const id = this.props.match.params.id;
    let pageno = state.page + 1;
    let pageSize = 10;

    if (state.pageSize) {
      pageSize = state.pageSize;
    }

    let data = {
      id: id,
      pageno: pageno,
      pageSize: pageSize,
      token: token
    };

    await this.props.showShipinventoryOrder(data);
  }

  // async handleDelete(data, event) {
  //   event.preventDefault();
  //   const token = this.props.login.login.access_token;
  //   data.token = token;
  //   await this.props.removeStock(data);
  // }

  componentDidUpdate() {
    if (this.props.addShipinventory.shipinventory.length > 0) {
      this.props.deleteShipinventory("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addShipinventory.delete.length > 0) {
      this.props.deleteShipinventory("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addShipinventory.edit.length > 0) {
      this.props.deleteShipinventory("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Order Number",
            accessor: "order.order_no" // String-based value accessors!
          },
          {
            Header: "Order Date",
            accessor: "order.order_date" // String-based value accessors!
          },
          {
            Header: "Customer Name",
            accessor: "order.customer_name" // String-based value accessors!
          },
          {
            Header: "Total Amount",
            accessor: "order.total_tax_amount" // String-based value accessors!
          }
        ]
      }
      // {
      //   Header: "Action",
      //   columns: [
      //     {
      //       Header: "Edit",
      //       maxWidth: 60,
      //       Cell: ({ row }) => (
      //         <Container>
      //           <Row>
      //             <Col>
      //               <EditInventory id={row._original} />
      //             </Col>
      //           </Row>
      //         </Container>
      //       )
      //     },
      //     {
      //       Header: "Delete",
      //       maxWidth: 60,
      //       Cell: ({ row }) => (
      //         <Container>
      //           <Row>
      //             <Col>
      //               <Button
      //                 color="danger"
      //                 size="sm"
      //                 id="delete"
      //                 onClick={e => this.handleDelete(row._original, e)}
      //               >
      //                 <i className="fas fa-ban" />
      //               </Button>
      //             </Col>
      //           </Row>
      //         </Container>
      //       )
      //     }
      //   ]
      // }
    ];

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="far fa-sticky-note" />{" "}
          <strong>Shipment Inventory</strong>
          <AddShipOrder {...this.props} />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.shipinventory.isLoading}
            data={this.props.shipinventory.shipinventoryorder.data}
            pages={this.props.shipinventory.shipinventoryorder.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(ShipOrder)
);
