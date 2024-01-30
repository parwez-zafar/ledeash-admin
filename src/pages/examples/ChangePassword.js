
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faLockOpen, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Routes } from "../../routes";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const history = useHistory();
    const [Loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });



    // console.log(formData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const formHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const jwt = localStorage.getItem('jwt');
        // console.log(jwt);


        try {
            const response = await axios.post('https://leadesh-whatsapp.onrender.com/api/password',
                {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                },
                {
                    headers: {
                        'jwt': `${jwt}`,
                        'Content-Type': 'application/json',
                    }
                }


            );
            // console.log("response ", response);
            if (response.status === 200) {
                // Display success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed Successfully',
                    text: 'Your password has been changed successfully!',
                }).then((result) => {
                    if (result.isConfirmed) {

                        history.push(Routes.Presentation.path);
                        //   history.push(Routes.Dashboard.path);
                    }
                });

                // Redirect to the dashboard
            } else {
                // Handle other scenarios if needed
                Swal.fire({
                    icon: 'error',
                    title: 'Password Change Failed',
                    text: 'There was an issue changing your password. Please try again.',
                });
            }
        }
        catch (err) {
            console.log("error is ", err);
            Swal.fire({
                icon: 'error',
                title: 'Password Change Failed',
                text: 'There was an error changing your password. Please try again.',
            });
        }

        setLoading(false)
    }
    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to Dashboard
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3 className="mb-4">
                                    Change Password
                                </h3>
                                <Form onSubmit={formHandler}>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>Old Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLockOpen} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="old password"
                                                name="oldPassword"
                                                value={formData.oldPassword}
                                                onChange={handleInputChange}
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                                title="The password should have 1 upper-case letter, 1 lower-case letter, 1 number, 1 special character and at least 8 characters."
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLockOpen} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="new password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                                title="The password should have 1 upper-case letter, 1 lower-case letter, 1 number, 1 special character and at least 8 characters."
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    {/* <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Confirm Password" />
                      </InputGroup>
                    </Form.Group> */}
                                    <Button variant="primary" type="submit" className="w-100">
                                        {
                                            Loading ? <>Loading...</> : <> Change Password </>
                                        }
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default ChangePassword


