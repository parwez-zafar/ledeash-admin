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

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };


  useEffect(() => {
    getOrders();
  }, [])

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = orderDetails?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(orderDetails?.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
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


        <h1 className='text-center mb-1'>Orders</h1>

        <table className="table table-hover table-responsive-xl table-responsive-md">
          <thead>
            <tr>
              <th scope="col" >Id</th>
              <th scope="col">Name</th>
              <th scope="col">start date</th>
              <th scope="col">trial Period End Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              currentRows &&
              currentRows.map((item, index) =>
                <tr key={index} >
                  <th>{item.packageSelected._id}</th>
                  <th>{item.packageSelected.name}</th>
                  <th>{new Date(item.packageSelected.startTime).toLocaleDateString('en-US', options)}</th>
                  <th>{new Date(item.packageSelected.trialPeriodEndTime).toLocaleDateString('en-US', options)}</th>
                  <th> {item.packageSelected.subscriptionStatus}</th>
                </tr>
              )
            }
          </tbody >
        </table >

        <div style={{ cursor: 'pointer' }}>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <div className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </div>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <div className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1} {currentPage === index + 1 && <span className="sr-only">(current)</span>}
                </div>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <div className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </div>
            </li>
          </ul>
        </div>
      </section >
    </>
  );
};
