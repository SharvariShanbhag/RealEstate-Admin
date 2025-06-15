import { useEffect, useState } from "react";
import { getUserInfo } from "../API/Api.js";
import { Container, Card, Spinner } from "react-bootstrap";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await getUserInfo();
      setLoggedUser(response.loggedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        backgroundColor: "#2A2A2A",
        color: "#FFFFFF",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          backgroundColor: "#640D5F",
          border: "2px solid #FFB200",
          borderRadius: "1rem",
          boxShadow: "0 0 10px #FFB200",
        }}
      >
        <h3 style={{ color: "#FFB200", textAlign: "center" }}>Your Profile</h3>
        <p className="text-center mb-4" style={{ color: "#FFFFFF" }}>
          View your account information
        </p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : loggedUser ? (
          <>
            <p>
              <strong style={{ color: "#FFB200" }}>Name:</strong>{" "}
              <span style={{ color: "white" }}>{loggedUser.name}</span>
            </p>
            <p>
              <strong style={{ color: "#FFB200" }}>Email:</strong>{" "}
              <span style={{ color: "white" }}>{loggedUser.email}</span>
            </p>
            <p>
              <strong style={{ color: "#FFB200" }}>Admin:</strong>{" "}
              <span style={{ color: "white" }}>
                {loggedUser.isAdmin ? "Yes" : "No"}
              </span>
            </p>
          </>
        ) : (
          <p style={{ color: "#D91656" }}>Failed to load profile.</p>
        )}
      </Card>
    </Container>
  );
};

export default Profile;