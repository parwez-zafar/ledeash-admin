import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { faEye, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { TransactionsTable } from "../components/Tables";
import axios from 'axios'


export default () => {

  const [orderDetails, setOrderDetails] = useState();

  const getOrders = async () => {
    const jwt = localStorage.getItem('jwt');

    try {
      const respose = await axios.get('https://leadesh-whatsapp.onrender.com/api/admin/transactions', {
        headers: {
          'jwt': `${jwt}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(respose.data);
      setOrderDetails(respose.data)
    }
    catch (err) {
      console.log("error in get user", err);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])
  return (
    <>
      {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Transactions</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <TransactionsTable /> */}


      <section>



        <table className="table table-hover table-responsive-xl table-responsive-md">
          <thead>
            <tr>
              <th scope="col" >Id</th>
              <th scope="col">Name</th>
              <th scope="col">start date</th>
              <th scope="col">end date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orderDetails &&
              orderDetails.map((item, index) =>
                <tr key={index} >
                  <th>{item.packageSelected.id}</th>
                  <th>{item.packageSelected.name}</th>
                  <th>{item.packageSelected.startTime}</th>
                  <th> {item.packageSelected.endDate}</th>
                  <th> {item.packageSelected.subscriptionStatus}</th>
                </tr>
              )
            }
          </tbody >
        </table >

        <nav>
          <ul className="pagination">
            <li className="page-item disabled">
              <div className="page-link" to="#" >Previous</div>
            </li>
            <li className="page-item"><div className="page-link" to="#">1</div></li>
            <li className="page-item active">
              <div className="page-link" to="#">2 <span className="sr-only">(current)</span></div>
            </li>
            <li className="page-item"><div className="page-link" to="#">3</div></li>
            <li className="page-item">
              <div className="page-link" >Next</div>
            </li>
          </ul>
        </nav>
      </section >
    </>
  );
};
