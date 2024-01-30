
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faLockOpen, faMobile, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Routes } from "../../routes";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

const MyProfile = () => {
    const history = useHistory();
    const [Loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        mobile: "",
        name: "",
    });



    // console.log(formData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const formHandler = async (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('jwt');
        // console.log(jwt);


        try {
            const response = await axios.post('https://leadesh-whatsapp.onrender.com/api/user',
                {
                    username: formData.name,
                    newNumber: formData.mobile,
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
                    title: 'Profile Updated Successfully',
                    text: 'Your Profile has been Updated successfully!',
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
                    title: 'Profile Update Failed',
                    text: 'There was an issue updating your profile. Please try again.',
                });
            }
        }
        catch (err) {
            console.log("error is ", err);
            Swal.fire({
                icon: 'error',
                title: 'Profile Update Failed',
                text: 'There was an issue updating your profile. Please try again.',
            });
        }
    }
    const getMe = async () => {
        const jwt = localStorage.getItem('jwt');

        try {
            const respose = await axios.get('https://leadesh-whatsapp.onrender.com/api/getMe', {
                headers: {
                    'jwt': `${jwt}`,
                    'Content-Type': 'application/json',
                }
            });

            // console.log(respose.data);
            setFormData({
                mobile: respose.data.number,
                name: respose.data.name,
            });

        }
        catch (err) {
            console.log("error in get user", err);
        }
    }
    useEffect(() => {
        getMe();
    }, [])
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
                                    Profile
                                </h3>
                                <Form onSubmit={formHandler}>
                                    <Form.Group id="name" className="mb-4">
                                        <Form.Label>Name</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group id="mobile" className="mb-4">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faMobile} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                readOnly
                                                type="tel"
                                                placeholder="Your Mobile Number"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                pattern="[0-9]{10}" // Assuming a 10-digit mobile number, adjust as needed
                                                title="Please enter a valid 10-digit mobile number"
                                            />
                                        </InputGroup>
                                    </Form.Group>




                                    <Button variant="primary" type="submit" className="w-100">
                                        {Loading ? <>Loading...</> : <>Update</>}
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

export default MyProfile