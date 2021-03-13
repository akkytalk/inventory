import React from "react";
import { Row, Col } from "reactstrap";
import { SalesSummary, Projects, Feeds } from "components/dashboard-components";
import Top from "./top";
import Export from "./export";

class Starter extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Top />
          </Col>
        </Row>
        <Row>
          <Col>
            <Export />
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={8}>
            <SalesSummary />
          </Col>
          <Col sm={6} lg={4}>
            <Feeds />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Projects />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Starter;
