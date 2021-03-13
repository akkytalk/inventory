import React, { Component } from "react";
import "react-table/react-table.css";
import EditReversible from "./EditReversible";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getReversiblePage,
  deleteReversible,
  removeReversible
} from "../../../redux/Creators/ReversibleCreators";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    reversible: state.reversible,
    addReversible: state.addReversible
  };
};

const mapDispatchToProps = dispatch => ({
  getReversiblePage: data => {
    dispatch(getReversiblePage(data));
  },
  deleteReversible: data => {
    dispatch(deleteReversible(data));
  },
  removeReversible: data => {
    dispatch(removeReversible(data));
  }
});

class Reversible extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    await this.props.getReversiblePage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeReversible(data);
  }

  componentDidUpdate() {
    if (this.props.addReversible.reversible.length > 0) {
      this.props.deleteReversible("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addReversible.delete.length > 0) {
      this.props.deleteReversible("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addReversible.edit.length > 0) {
      this.props.deleteReversible("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Client Name",
            accessor: "client.client_name" // String-based value accessors!
          },
          {
            Header: "Product Name",
            accessor: "product.product_name" // String-based value accessors!
          },
          {
            Header: "No. Of Products",
            accessor: "no_of_products" // String-based value accessors!
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
                    <EditReversible id={row._original} />
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
          <i className="fas fa-retweet" /> <strong>Reversible</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.reversible.isLoading}
            data={this.props.reversible.reversible.data}
            pages={this.props.reversible.reversible.last_page}
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
  )(Reversible)
);
