import React, { useState, useEffect } from "react";
import {
  Table, Badge,
  Button,
  InputGroup,
  FormControl,
  Card,
  OverlayTrigger,
  Tooltip,
  Alert,
  Image,
} from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { getAllProperties } from "../../API/Api";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import DeleteProperty from "./DeleteProperty";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((prop) =>
      prop.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const fetchProperties = async () => {
    const response = await getAllProperties();
    if (response.success) {
      setProperties(response.properties);
      setFilteredProperties(response.properties);
    }
  };

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 3000);
  };

  const handlePropertyUpdated = (success, message) => {
    showAlert(success ? "success" : "danger", message);
    if (success) fetchProperties();
  };

  return (
    <>
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false })}>
          {alert.message}
        </Alert>
      )}

      <div className="container shadow p-3 rounded" style={{ backgroundColor: "#2A2A2A", color: "#FFFFFF" }}>
        <Card className="p-4 mb-4" style={{ backgroundColor: "#3A3A3A", borderRadius: "1rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 style={{ color: "#FFB200" }}>Properties</h2>
            <Button
              style={{ backgroundColor: "#FFB200", color: "#640D5F", fontWeight: "bold", border: "none", borderRadius: "1rem" }}
              onClick={() => setShowAddModal(true)}
            >
              Add Property
            </Button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-white">
              Total Properties{" "}
              <Badge bg="light" text="dark">
                {filteredProperties.length}
              </Badge>
            </h6>

            <InputGroup className="w-50">
              <InputGroup.Text style={{ backgroundColor: "#FFB200", color: "#640D5F" }}>
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ backgroundColor: "#3A3A3A", color: "#FFFFFF", border: "1px solid #640D5F" }}
              />
            </InputGroup>
          </div>

          <Table responsive bordered hover variant="dark" className="align-middle text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Price</th>
                <th>City</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <tr key={property.id}>
                    <td>{index + 1}</td>
                    <td>{property.title}</td>
                    <td>{property.type}</td>
                    <td>${property.price}</td>
                    <td>{property.city}</td>
                    <td>
                      {property.image ? (
                        <Image
                          src={`http://localhost:7000/uploads/${property.image}`}
                          alt={property.title}
                          width="100"
                          height="80"
                          className="rounded border"
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>
                      <OverlayTrigger overlay={<Tooltip>Edit Property</Tooltip>}>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger overlay={<Tooltip>Delete Property</Tooltip>}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setSelectedPropertyId(property.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-muted">
                    No properties available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      {/* Modals */}
      <AddProperty
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onPropertyAdded={() => {
          fetchProperties();
          showAlert("success", "Property added successfully!");
        }}
      />

      <EditProperty
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        property={selectedProperty}
        onPropertyUpdated={handlePropertyUpdated}
      />

      <DeleteProperty
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        propertyId={selectedPropertyId}
        onPropertyDelete={(success, message) => {
          handlePropertyUpdated(success, message);
        }}
      />
    </>
  );
};

export default Property;