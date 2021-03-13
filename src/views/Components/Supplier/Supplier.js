import React, { Component } from "react";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSupplierPage,
  deleteSupplier,
  removeSupplier
} from "../../../redux/Creators/SupplierCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    supplier: state.supplier,
    addSupplier: state.addSupplier
  };
};

const mapDispatchToProps = dispatch => ({
  getSupplierPage: data => {
    dispatch(getSupplierPage(data));
  },
  deleteSupplier: data => {
    dispatch(deleteSupplier(data));
  },
  removeSupplier: data => {
    dispatch(removeSupplier(data));
  }
});

class Supplier extends Component {
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

    await this.props.getSupplierPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeSupplier(data);
  }

  componentDidUpdate() {
    if (this.props.addSupplier.supplier.length > 0) {
      this.props.deleteSupplier("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addSupplier.delete.length > 0) {
      this.props.deleteSupplier("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addSupplier.edit.length > 0) {
      this.props.deleteSupplier("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Supplier Name",
            accessor: "supplier_name"
          },
          {
            Header: "Supplier Address",
            accessor: "address"
          },
          {
            Header: "City",
            accessor: "city"
          },
          {
            Header: "Contact",
            accessor: "contact"
          }
        ]
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Edit",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <EditSupplier id={row._original} />
                  </Col>
                </Row>
              </Container>
            )
          },
          {
            Header: "Delete",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <Button
                      color="danger"
                      size="sm"
                      id="delete"
                      onClick={e => this.handleDelete(row._original, e)}
                    >
                      <i className="fas fa-ban" />
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
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-box" /> <strong>Supplier</strong>
          <AddSupplier />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.supplier.isLoading}
            data={this.props.supplier.supplier.data}
            pages={this.props.supplier.supplier.last_page}
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Supplier)
);
