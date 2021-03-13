import React, { Component } from "react";
import AddClient from "./AddClient";
import EditClient from "./EditClient";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getClientPage,
  deleteClient,
  removeClient
} from "../../../redux/Creators/ClientCreators";
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
    client: state.client,
    addClient: state.addClient
  };
};

const mapDispatchToProps = dispatch => ({
  getClientPage: data => {
    dispatch(getClientPage(data));
  },
  deleteClient: data => {
    dispatch(deleteClient(data));
  },
  removeClient: data => {
    dispatch(removeClient(data));
  }
});

class Client extends Component {
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

    await this.props.getClientPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeClient(data);
  }

  componentDidUpdate() {
    if (this.props.addClient.client.length > 0) {
      this.props.deleteClient("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addClient.delete.length > 0) {
      this.props.deleteClient("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addClient.edit.length > 0) {
      this.props.deleteClient("");
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
            accessor: "client_name" // String-based value accessors!
          },
          {
            Header: "Client Address",
            accessor: "client_address" // String-based value accessors!
          },
          {
            Header: "Client Contact",
            accessor: "client_contact" // String-based value accessors!
          },
          {
            Header: "Client Discount",
            accessor: "discount" // String-based value accessors!
          },
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
                    <EditClient id={row._original} />
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
          <i className="fas fa-users" /> <strong>Clients</strong>
          <AddClient />
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.client.isLoading}
            data={this.props.client.client.data}
            pages={this.props.client.client.last_page}
            onFetchData={(state, instance) => this.fetchData(state, instance)}
            defaultPageSize={10}
            filterable
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
  )(Client)
);
