import React, { useState, useEffect } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Card,
  OverlayTrigger,
  Tooltip,
  Alert,
  Image,
  Modal,
  Row,
  Col,
  Spinner,
  Badge // Re-import Badge as it's useful for total count
} from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlusCircle } from "react-icons/fa"; // Added FaPlusCircle for Add button
import { getAllProperties } from "../../API/Api";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import DeleteProperty from "./DeleteProperty";
import PropertyCard from "../Property/PropertyCard"; // Import PropertyCard

// --- Re-designed Component: PropertyDetailModal ---
const PropertyDetailModal = ({ show, onHide, property }) => {
  // Function to format price for better readability (reused from PropertyCard)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#2495FD', color: '#FFFFFF', borderBottom: '1px solid #1A7CE1' }}>
        <Modal.Title style={{ fontWeight: '600' }}>{property?.title || 'Property Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#F8F8F8', color: '#333333', padding: '2rem' }}>
        {property ? (
          <Row> {/* Use Bootstrap Row and Col for layout */}
            <Col md={6} className="mb-4 mb-md-0"> {/* Margin bottom on small screens */}
              {property.image ? (
                <Image
                  src={`http://localhost:8000/uploads/${property.image}`}
                  alt={property.title}
                  fluid
                  className="rounded shadow-sm"
                  style={{ border: '2px solid #2495FD', objectFit: 'cover', height: '300px', width: '100%' }} // Stronger border, fixed height
                />
              ) : (
                <div style={{
                  height: '300px', // Match image height
                  backgroundColor: '#E0E0E0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.8rem',
                  color: '#666666',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}>
                  <FaImage style={{ fontSize: '4rem', marginBottom: '1rem', color: '#888888' }} />
                  No Image Available
                </div>
              )}
            </Col>
            <Col md={6}>
              <h5 style={{ color: '#2495FD', marginBottom: '1.2rem', fontWeight: 'bold' }}>Property Information</h5>
              <p className="mb-2"><strong>Price:</strong> {formatPrice(property.price)}</p>
              <p className="mb-2"><strong>Type:</strong> <Badge pill bg={property.type === 'For Sale' ? 'success' : 'info'} style={{ fontSize: '0.9em' }}>{property.type}</Badge></p>
              <p className="mb-2"><strong>City:</strong> {property.city}</p>
              <p className="mb-2"><strong>Address:</strong> {property.address}</p>
              <p className="mb-2"><strong>Bedrooms:</strong> {property.bedroom || 'N/A'}</p>
              <p className="mb-2"><strong>Bathrooms:</strong> {property.bathroom || 'N/A'}</p>
              <p className="mb-2"><strong>Size:</strong> {property.size ? `${property.size} sqft` : 'N/A'}</p> {/* Added sqft */}
              <p className="mb-2"><strong>Year Built:</strong> {property.year || 'N/A'}</p>
              <p className="mb-0"><strong>Garage:</strong> {property.garage !== null ? property.garage : 'N/A'}</p>
            </Col>
            <Col xs={12} className="mt-4">
              <h5 style={{ color: '#2495FD', marginBottom: '1rem', fontWeight: 'bold' }}>Description</h5>
              <p style={{ lineHeight: '1.6' }}>{property.description || 'No description provided.'}</p>
            </Col>
          </Row>
        ) : (
          <p className="text-center text-muted">No property selected for details.</p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#F8F8F8', borderTop: '1px solid #E0E0E0' }}>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            backgroundColor: '#6C757D',
            borderColor: '#6C757D',
            color: '#FFFFFF',
            borderRadius: '0.5rem',
            padding: '0.6rem 1.5rem',
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
// --- End of Re-designed Component ---

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((prop) =>
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prop.description && prop.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getAllProperties();
      if (response.success) {
        setProperties(response.properties);
      } else {
        showAlert("danger", response.message || "Failed to fetch properties.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      showAlert("danger", "An error occurred while fetching properties.");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 3000);
  };

  const handleActionComplete = (success, message) => {
    showAlert(success ? "success" : "danger", message);
    if (success) {
      fetchProperties();
      setShowAddModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedPropertyId(id);
    setShowDeleteModal(true);
  };

  const handleViewDetailsClick = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  return (
    <>
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050, width: 'fit-content' }}
        >
          {alert.message}
        </Alert>
      )}

      <div
        className="container p-4 rounded" // Added Bootstrap padding and rounded corners
        style={{
          backgroundColor: "#F3F3F3", // Light background for the main content area
          minHeight: "calc(100vh - 70px)", // Ensures it takes up most of the viewport height
          color: "#333333", // Default text color
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <Card className="p-4 mb-4 shadow-lg" style={{ backgroundColor: "#FFFFFF", borderRadius: "1rem", border: '1px solid #E0E0E0' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3"> {/* Added flex-wrap and gap for responsiveness */}
            <h2 style={{ color: "#2495FD", fontWeight: "700", fontSize: "2.5rem", margin: 0 }}>Properties</h2> {/* Removed default margin */}
            <Button
              style={{
                backgroundColor: "#2495FD",
                color: "#FFFFFF",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.8rem 1.8rem",
                fontSize: "1.05rem",
                transition: "background-color 0.2s ease",
                display: 'flex', // For icon and text alignment
                alignItems: 'center'
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#1A7CE1'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#2495FD'; }}
              onClick={handleAddClick}
            >
              <FaPlusCircle className="me-2" /> Add New Property
            </Button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h6 style={{ color: "#666666", margin: 0 }}>
              Total Properties:{" "}
              <Badge bg="primary" style={{ backgroundColor: "#2495FD", color: "#FFFFFF", fontSize: "1rem", padding: '0.4em 0.8em' }}>
                {filteredProperties.length}
              </Badge>
            </h6>

            <InputGroup className="flex-grow-1" style={{ maxWidth: '400px' }}> {/* Max width for search bar */}
              <InputGroup.Text style={{ backgroundColor: "#2495FD", color: "#FFFFFF", border: '1px solid #2495FD', borderRadius: '0.5rem 0 0 0.5rem' }}> {/* Rounded left side */}
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search properties by title, city, type, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ backgroundColor: "#F8F8F8", color: "#333333", border: "1px solid #CCCCCC", borderRadius: '0 0.5rem 0.5rem 0' }} 
              />
            </InputGroup>
          </div>

          {/* Conditional rendering based on loading, empty states, and data */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading properties...</span>
              </Spinner>
              <p className="mt-2 text-muted">Fetching properties...</p>
            </div>
          ) : filteredProperties.length === 0 && !searchTerm ? (
            <Alert variant="info" className="text-center py-4" style={{ backgroundColor: '#EBF6FF', color: '#2495FD', border: '1px solid #2495FD', borderRadius: '0.8rem' }}>
              <p className="mb-0">No properties added yet. Click "Add New Property" to get started!</p>
            </Alert>
          ) : filteredProperties.length === 0 && searchTerm ? (
            <Alert variant="warning" className="text-center py-4" style={{ backgroundColor: '#FFFBEA', color: '#FFA500', border: '1px solid #FFA500', borderRadius: '0.8rem' }}>
              <p className="mb-0">No properties found matching "{searchTerm}".</p>
            </Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4"> {/* Responsive grid for cards */}
              {filteredProperties.map((property) => (
                <Col key={property.id}>
                  <PropertyCard property={property}>
                    {/* Action buttons inside PropertyCard */}
                    <div className="d-flex justify-content-center"> {/* Centered buttons */}
                      <OverlayTrigger overlay={<Tooltip>View Details</Tooltip>}>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => handleViewDetailsClick(property)}
                          style={{ backgroundColor: '#17A2B8', borderColor: '#17A2B8', color: '#FFFFFF', borderRadius: '0.4rem' }}
                        >
                          <FaEye />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Edit Property</Tooltip>}>
                        <Button
                          size="sm"
                          variant="primary"
                          className="me-2"
                          onClick={() => handleEditClick(property)}
                          style={{ backgroundColor: '#2495FD', borderColor: '#2495FD', color: '#FFFFFF', borderRadius: '0.4rem' }}
                        >
                          <FaEdit />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Delete Property</Tooltip>}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteClick(property.id)}
                          style={{ backgroundColor: '#DC3545', borderColor: '#DC3545', color: '#FFFFFF', borderRadius: '0.4rem' }}
                        >
                          <FaTrash />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </PropertyCard>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      </div>

      {/* Modals for Add, Edit, Delete, and Details */}
      <AddProperty
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onPropertyAdded={handleActionComplete}
      />

      <EditProperty
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        property={selectedProperty}
        onPropertyUpdated={handleActionComplete}
      />

      <DeleteProperty
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        propertyId={selectedPropertyId}
        onPropertyDelete={handleActionComplete}
      />

      <PropertyDetailModal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        property={selectedProperty}
      />
    </>
  );
};

export default Property;