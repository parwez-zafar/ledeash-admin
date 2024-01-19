import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Select from "react-select";
import axios from "axios";
// import Axios from "../../axios"
// import Cookies from "js-cookie";
;
// import Axios from "../../axios";

const hardcodedCountryCodes = [
  { label: "India (+91)", value: "+91" },
];


const SignIn = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    countryCode: hardcodedCountryCodes[0],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fullMobile = formData.countryCode.value + formData.mobile;
    console.log(fullMobile);

    const requestData = {
      password: formData.password,
      number: fullMobile
    };
    console.log(requestData);

    try {
      const response = await axios.post("https://leadesh-whatsapp.onrender.com/api/signin", requestData);
      // const jwtToken = response.headers['Jwt'];
      // console.log('Response Headers:', response.headers);

      // console.log("response is ", response); 
      const jwt = response.data.jwt;
      if (response.status === 200) {
        // console.log("JWT Token is ", jwt);
        localStorage.setItem("jwt", jwt);
        // Cookies.set('jwt', jwt)   

        // history.push('/#download');
        // console.log('JWT Token:', jwt);
        history.push(Routes.Presentation.path);
      }
    } catch (error) {
      alert("Wrong username or password");
      console.log("Wrong username or password");
      console.error("Error during sign-in:", error);
      setFormData({
        mobile: "",
        password: "",
        countryCode: hardcodedCountryCodes[0],
      });
    }


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryCodeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      countryCode: selectedOption
    }));
  };

  const checkLogin = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      history.push(Routes.Presentation.path)
    }
  }
  useEffect(() => {

    checkLogin();
  }, [])

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to Main page
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleFormSubmit}>


                  <div className="d-flex mb-4  ">
                    <Form.Group id="name" >
                      <Form.Label>Country code</Form.Label>
                      <div className="mx-1 py-1" >
                        <InputGroup>
                          {/* <InputGroup.Text className="border border-primary">
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text> */}
                          <Select
                            options={hardcodedCountryCodes}
                            value={formData.countryCode}
                            onChange={handleCountryCodeChange}
                            isSearchable={false}
                            className="country-code-select"
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <Form.Group id="mobile">
                      <Form.Label>Your Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="tel"
                          placeholder="1234567890"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"  // Set a title for the pattern
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>





                  {/* <Form.Group id="name" className="mb-4">
                    <Form.Label>Country code</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon />
                      </InputGroup.Text>
                      <Select
                        options={hardcodedCountryCodes}
                        value={formData.countryCode}
                        onChange={handleCountryCodeChange}
                        isSearchable={false}
                        className="country-code-select"
                      />
                    </InputGroup>
                  </Form.Group> */}
                  {/* <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Mobile Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="tel"
                        placeholder="1234567890"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"  // Set a title for the pattern
                      />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox">
                      <FormCheck.Input id="defaultCheck5" className="me-2" />
                      <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                    </Form.Check>
                    <Card.Link as={Link} to={Routes.ResetPassword.path} className="small text-end">Lost password?</Card.Link>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                {/* <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};


export default SignIn