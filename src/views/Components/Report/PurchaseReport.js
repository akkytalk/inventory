import React, { Component } from "react";
import CustomInput from "../Custom/CustomInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { getPurchaseReport } from "../../../redux/Creators/ReportCreators";
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Button,
  Table
} from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login,
    report: state.report
  };
};

const mapDispatchToProps = dispatch => ({
  getPurchaseReport: data => {
    dispatch(getPurchaseReport(data));
  }
});

class PurchaseReport extends Component {

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    const token = props.login.login.access_token;

    let data = {
      token: token,
      from_date: values.from_date,
      to_date: values.to_date
    };
    
    props.getPurchaseReport(data);
    // alert("Form Submitted");
    setSubmitting(false);
    return;
  };

  _exporter;
  export = () => {
    this._exporter.save();
  };

  render() {
    const data = this.props.report.purchasereport;
    
    return (
      <Card>
        <CardHeader>
          <h5>
            <i className="fas fa-excel" /> Purchase Report
          </h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Formik
                initialValues={{
                  from_date: "",
                  to_date: ""
                }}
                validate={values => {
                  let errors = [];

                  if (!values.email) errors.email = "Email Address Required";

                  //check if my values have errors
                  return errors;
                }}
                onSubmit={this.handleSubmit}
                render={formProps => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col>
                          <Label for="name">Date</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-file-excel" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="from_date"
                              id="from_date"
                              placeholder="Enter Barcode Number"
                            />
                            <Field
                              component={CustomInput}
                              type="date"
                              name="to_date"
                              id="to_date"
                              placeholder="Enter Barcode Number"
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                type="submit"
                                disabled={formProps.isSubmitting}
                                color="success"
                                block
                              >
                                Submit
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-dark text-white">
                  <strong>Register Report</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Button className="k-Button" onClick={this.export}>
                        Export Report
                      </Button>
                    </Col>
                  </Row>

                  <ExcelExport
                    data={data}
                    fileName="Purchase Report.xlsx"
                    ref={exporter => {
                      this._exporter = exporter;
                    }}
                  >
                    <ExcelExportColumn
                      field="product.product_name"
                      title="Product Name"
                      width={300}
                    />
                    <ExcelExportColumn
                      field="product.sale_rate"
                      title="Sale Price"
                      width={100}
                    />
                    <ExcelExportColumn
                      field="supplier.supplier_name"
                      title="Supplier Name"
                      width={200}
                    />
                    <ExcelExportColumn
                      field="supply_price"
                      title="Cost Price"
                      width={100}
                    />
                    <ExcelExportColumn
                      field="quantity"
                      title="Quantity"
                      width={100}
                    />
                    <ExcelExportColumn
                      field="total_price"
                      title="Total Price"
                      width={100}
                    />
                  </ExcelExport>

                  {data ? (
                    <React.Fragment>
                      <Table>
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Product Name</th>
                            <th>Sale Price</th>
                            <th>Supplier Name</th>
                            <th>Cost Price</th>
                            <th>Quatity</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data
                            ? data.map((product, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{product.product ? product.product.product_name : null}</td>
                                  <td>{product.product ? product.product.sale_rate : null}</td>
                                  <td>{product.supplier ? product.supplier.supplier_name : null}</td>
                                  <td>{product.supply_price}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.total_price}</td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </Table>
                    </React.Fragment>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PurchaseReport)
);
