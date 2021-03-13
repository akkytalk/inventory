import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddInventory from "./AddInventory";
import { getSupplier } from "../../../redux/Creators/SupplierCreators";
import { getProduct } from "../../../redux/Creators/ProductCreators";
import {
  showStock,
  deleteStock,
  removeStock
} from "../../../redux/Creators/StockCreators";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    product: state.product,
    supplier: state.supplier,
    stock: state.stock,
    addStock: state.addStock
  };
};

const mapDispatchToProps = dispatch => ({
  showStock: data => {
    dispatch(showStock(data));
  },
  getSupplier: data => {
    dispatch(getSupplier(data));
  },
  getProduct: data => {
    dispatch(getProduct(data));
  },
  deleteStock: data => {
    dispatch(deleteStock(data));
  },
  removeStock: data => {
    dispatch(removeStock(data));
  }
});

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      filtered: []
    };
  }

  componentDidMount(){
    this.fetchSupplier();
    this.fetchProduct();
  }

  async fetchSupplier() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getSupplier(data);
  }
  
  async fetchProduct() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    await this.props.getProduct(data);
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

    await this.props.showStock(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeStock(data);
  }

  componentDidUpdate() {
    if (this.props.addStock.stock.length > 0) {
      this.props.deleteStock("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addStock.delete.length > 0) {
      this.props.deleteStock("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addStock.edit.length > 0) {
      this.props.deleteStock("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Product Name",
            accessor: "product.product_name"
          },
          {
            Header: "Warehouse Name",
            accessor: "warehouse.warehouse_name"
          },
          {
            Header: "Quantity",
            accessor: "quantity"
          }
        ]
      },
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
          <i className="far fa-sticky-note" /> <strong>Inventory</strong>
          <AddInventory {...this.props}/>
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.stock.isLoading}
            data={this.props.stock.stock.data}
            pages={this.props.stock.stock.last_page}
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
  )(Inventory)
);
