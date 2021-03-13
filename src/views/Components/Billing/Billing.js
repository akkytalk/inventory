import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import ViewBilling from "./ViewBilling";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory } from "../../../redux/Creators/CategoryCreators";
import {
  getClient,
  deleteClient
} from "../../../redux/Creators/ClientCreators";
import {
  getProductOrder,
  deleteProduct
} from "../../../redux/Creators/ProductCreators";
import {
  getBillingPage,
  removeBilling,
  deleteBilling
} from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Container,
  CardHeader
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    client: state.client,
    category: state.category,
    addClient: state.addClient,
    product: state.product,
    addProduct: state.addProduct,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  getClient: data => {
    dispatch(getClient(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getProductOrder: data => {
    dispatch(getProductOrder(data));
  },
  getBillingPage: data => {
    dispatch(getBillingPage(data));
  },
  deleteBilling: data => {
    dispatch(deleteBilling(data));
  },
  deleteClient: data => {
    dispatch(deleteClient(data));
  },
  deleteProduct: data => {
    dispatch(deleteProduct(data));
  },
  removeBilling: data => {
    dispatch(removeBilling(data));
  }
});

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    await this.props.getBillingPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeBilling(data);
  }

  componentDidUpdate() {
    if (this.props.addBilling.billing.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addProduct.product.length > 0) {
      this.props.deleteProduct("");
      this.fetchProduct();
    }
    if (this.props.addClient.client.length > 0) {
      this.props.deleteClient("");
      this.fetchClient();
    }
    if (this.props.addBilling.delete.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addBilling.edit.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Invoice No",
            accessor: "invoice_no" // String-based value accessors!
          },
          {
            Header: "Client Address",
            accessor: "client.client_address" // String-based value accessors!
          },
          {
            Header: "Invoice Date",
            accessor: "invoice_date" // String-based value accessors!
          },
          {
            Header: "Total Amount",
            accessor: "total_tax_amount" // String-based value accessors!
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
          //           <EditBilling {...this.props} id={row._original} />
          //         </Col>
          //       </Row>
          //     </Container>
          //   )
          // },
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
          },
          {
            Header: "Bill Print",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <ViewBilling id={row._original} />
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
          <i className="fas fa-box" /> <strong>Billing</strong>
          <Link to="/addbill">
            <Button className="btn-success pull-right" size="sm">
              Add Bill
            </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.billing.isLoading}
            data={this.props.billing.billing.data}
            pages={this.props.billing.billing.last_page}
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
  connect(mapStateToProps, mapDispatchToProps)(Billing)
);
