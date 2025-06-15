import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { loginAPI } from "../API/Api.js"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await loginAPI({ email, password });

      if (response.token) {
        alert("Login successful!");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
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
                LOGIN
              </h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleFormSubmit}>
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
                  Login
                </Button>
              </Form>

              <div 
                className="mt-3 text-center" 
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif"
                }}
              >
                <span>New user? </span>
                <Link 
                  to="/register" 
                  style={{ 
                    color: "#FFB200",
                    textDecoration: "none",
                    fontWeight: "600"
                  }}
                >
                  Register here
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;