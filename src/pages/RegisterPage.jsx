import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { registerAPI } from '../API/Api.js';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await registerAPI({ name, email, password });

      if (response.message) {
        alert(response.message);
        navigate("/login");
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <>
      <Navbar />
      <Container
        fluid
        className="py-5 d-flex align-items-center justify-content-center"
        style={{ 
          backgroundColor: "#2A2A2A", 
          minHeight: "100vh",
        }}
      >
        <Row className="justify-content-center w-100">
          <Col md={6} lg={4}>
            <div
              className="p-4 rounded"
              style={{
                backgroundColor: "#1A1A1A",
                boxShadow: "0 0 20px rgba(255, 178, 0, 0.1)",
                border: "1px solid #640D5F"
              }}
            >
              <h3 
                className="mb-4 text-center" 
                style={{ 
                  color: "#FFB200",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "700"
                }}
              >
                REGISTER
              </h3>
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label style={{ color: "#FFFFFF" }}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#3A3A3A",
                      color: "#FFFFFF",
                      border: "1px solid #640D5F",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: "#FFFFFF" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#3A3A3A",
                      color: "#FFFFFF",
                      border: "1px solid #640D5F",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label style={{ color: "#FFFFFF" }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#3A3A3A",
                      color: "#FFFFFF",
                      border: "1px solid #640D5F",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 py-2"
                  style={{
                    backgroundColor: "#FFB200",
                    borderColor: "#FFB200",
                    color: "#640D5F",
                    fontWeight: "bold",
                    fontSize: "1.1rem"
                  }}
                >
                  Register
                </Button>
              </Form>

              <div 
                className="mt-3 text-center" 
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif"
                }}
              >
                <span>Already registered? </span>
                <Link 
                  to="/login" 
                  style={{ 
                    color: "#FFB200",
                    textDecoration: "none",
                    fontWeight: "600"
                  }}
                >
                  Login here
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;