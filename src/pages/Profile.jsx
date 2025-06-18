import { useEffect, useState } from "react";
import { getUserInfo } from "../API/Api"; // Ensure this path is correct for your API utility
import { Container, Card, Spinner, Alert } from "react-bootstrap"; // Added Alert for error display

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any error messages

  const fetchUser = async () => {
    setLoading(true); // Start loading
    setError(null);   // Clear previous errors
    try {
      // Call the API function to get user info
      const response = await getUserInfo();

      if (response.success) {
        setLoggedUser(response.loggedUser); // Update state with fetched user data
      } else {
        // Handle cases where the API call was not successful (e.g., token missing, invalid)
        setError(response.message || "Failed to load profile. Please log in again.");
        setLoggedUser(null); // Ensure user data is cleared if fetch failed
      }
    } catch (err) {
      // Catch network errors or unexpected errors from the API function
      console.error("Error fetching user in Profile.jsx:", err);
      setError("An unexpected error occurred while fetching your profile. Please try again.");
      setLoggedUser(null);
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Run once on component mount

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh", // Occupy most of the viewport height
        backgroundColor: "#F3F3F3", // Light grey background for the page
        padding: "20px", // Add some padding around the content
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "550px", // Increased max-width for better content display
          padding: "2.5rem", // More generous padding inside the card
          backgroundColor: "#FFFFFF", // White background for the card
          border: "1px solid #E0E0E0", // A very subtle grey border
          borderRadius: "1rem", // Rounded corners for a modern feel
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)", // A softer, modern shadow
          fontFamily: "'Open Sans', sans-serif", // Consistent font family
          color: "#333333", // Default text color for the card
        }}
      >
        <h3
          style={{
            color: "#2495FD", // Primary blue for the main heading
            textAlign: "center",
            marginBottom: "1rem", // Space below title
            fontWeight: "700", // Bolder title
            fontSize: "2.2rem", // Larger font size for impact
          }}
        >
          Your Profile
        </h3>
        <p className="text-center mb-4" style={{ color: "#666666", fontSize: "1.05rem" }}>
          View your account information below.
        </p>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" style={{ color: "#2495FD" }} />
            <p className="mt-2 text-muted">Loading profile...</p>
          </div>
        ) : error ? (
          // Display error message if there was a problem fetching the user
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : loggedUser ? (
          // Display user details if successfully loaded
          <div className="mt-3">
            <p className="mb-2" style={{ fontSize: "1.1rem" }}>
              <strong style={{ color: "#2495FD" }}>Name:</strong>{" "}
              <span style={{ color: "#333333" }}>{loggedUser.name}</span>
            </p>
            <p className="mb-2" style={{ fontSize: "1.1rem" }}>
              <strong style={{ color: "#2495FD" }}>Email:</strong>{" "}
              <span style={{ color: "#333333" }}>{loggedUser.email}</span>
            </p>
            <p className="mb-2" style={{ fontSize: "1.1rem" }}>
              <strong style={{ color: "#2495FD" }}>Admin Status:</strong>{" "}
              <span style={{ color: "#333333" }}>
                {loggedUser.isAdmin ? "Yes" : "No"}
              </span>
            </p>
            {/* You can add more profile details here if your backend sends them */}
            {/* For example:
            <p className="mb-2" style={{ fontSize: "1.1rem" }}>
              <strong style={{ color: "#2495FD" }}>Joined On:</strong>{" "}
              <span style={{ color: "#333333" }}>{new Date(loggedUser.createdAt).toLocaleDateString()}</span>
            </p>
            */}
          </div>
        ) : (
          // Fallback message if no user is loaded and no specific error
          <Alert variant="info" className="text-center">
            No profile data available. Please ensure you are logged in.
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default Profile;