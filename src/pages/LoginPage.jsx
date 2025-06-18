import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar"; // Ensure your Navbar uses the new theme
import { loginAPI } from "../API/Api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await loginAPI({ email, password });

      if (response.token) {
        alert("Login successful!");
        navigate("/"); // Redirect to home on success
      } else {
        // Handle specific error messages from API if available, otherwise a generic one
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Catch network errors or other unexpected issues
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  }

  return (
    <>
      <Navbar /> {/* Your themed Navbar component */}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#F3F3F3", // Light grey background for the whole page
          minHeight: "calc(100vh - 70px)", // Account for navbar height (approx 70px)
          padding: "50px 15px", // Add some vertical padding
        }}
      >
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}> {/* Adjusted column sizes for better responsiveness */}
            <div
              className="p-4 p-md-5 rounded shadow-lg" // Added more padding for larger screens, subtle shadow
              style={{
                backgroundColor: "#FFFFFF", // White background for the form card
                border: "1px solid #2495FD", // Border matching the primary blue
                borderRadius: "15px", // More rounded corners for a modern feel
              }}
            >
              <h3
                className="mb-4 text-center"
                style={{
                  color: "#2495FD", // Blue heading
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "700",
                  fontSize: "2.2rem", // Slightly larger title
                }}
              >
                Welcome Back!
              </h3>
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: "#333333", fontWeight: "600" }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#F8F8F8", // Very light grey input background
                      color: "#333333", // Dark text for input
                      border: "1px solid #CCCCCC", // Softer border for inputs
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label style={{ color: "#333333", fontWeight: "600" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#F8F8F8",
                      color: "#333333",
                      border: "1px solid #CCCCCC",
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 py-2"
                  style={{
                    backgroundColor: "#2495FD", // Primary blue for the button
                    borderColor: "#2495FD",
                    color: "#FFFFFF", // White text on button
                    fontWeight: "bold",
                    fontSize: "1.15rem",
                    borderRadius: "8px",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Login
                </Button>
              </Form>

              <div
                className="mt-4 text-center"
                style={{
                  color: "#555555", // Slightly darker grey for general text
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                <span>Don't have an account? </span>
                <Link
                  to="/register"
                  style={{
                    color: "#2495FD", // Blue for the register link
                    textDecoration: "none",
                    fontWeight: "600",
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