import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getWarehousePage,
  deleteWarehouse,
  removeWarehouse
} from "../../../redux/Creators/WarehouseCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import AddWarehouse from "./AddWarehouse";

const mapStateToProps = state => {
  return {
    login: state.login,
    warehouse: state.warehouse,
    addWarehouse: state.addWarehouse
  };
};

const mapDispatchToProps = dispatch => ({
  getWarehousePage: data => {
    dispatch(getWarehousePage(data));
  },
  deleteWarehouse: data => {
    dispatch(deleteWarehouse(data));
  },
  removeWarehouse: data => {
    dispatch(removeWarehouse(data));
  }
});

class Warehouse extends Component {
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

    await this.props.getWarehousePage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeWarehouse(data);
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
        <Redirect
          to={`/inventory/${this.state.id}`}
          {...this.props}
        />
      );
    }
  };

  componentDidUpdate() {
    if (this.props.addWarehouse.warehouse.length > 0) {
      this.props.deleteWarehouse("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addWarehouse.delete.length > 0) {
      this.props.deleteWarehouse("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addWarehouse.edit.length > 0) {
      this.props.deleteWarehouse("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Warehouse Name",
            accessor: "warehouse_name" // String-based value accessors!
          },
          {
            Header: "Warehouse Code",
            accessor: "warehouse_code" // String-based value accessors!
          },
          {
            Header: "Warehouse Address",
            accessor: "warehouse_address" // String-based value accessors!
          }
        ]
      },
      {
        Header: "Action",
        columns: [
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
          <i className="far fa-sticky-note" /> <strong>Warehouse</strong>
          <AddWarehouse />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.warehouse.isLoading}
            data={this.props.warehouse.warehouse.data}
            pages={this.props.warehouse.warehouse.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(Warehouse)
);
