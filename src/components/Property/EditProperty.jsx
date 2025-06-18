import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image, Spinner, Alert } from "react-bootstrap"; // Import Alert and Spinner
import { updateProperty } from "../../API/Api"; // Ensure correct path

function EditProperty({ show, onHide, property, onPropertyUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    description: '',
    type: 'For Sale',
    address: '',
    bedroom: '',
    bathroom: '',
    size: '',
    year: '',
    garage: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // For displaying errors

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        price: property.price || '',
        city: property.city || '',
        description: property.description || '',
        type: property.type || 'For Sale',
        address: property.address || '',
        bedroom: property.bedroom || '',
        bathroom: property.bathroom || '',
        size: property.size || '',
        year: property.year || '',
        garage: property.garage || 0
      });
      setImageFile(null); // Clear image file when a new property is selected
      setPreviewImage(property.image ? `http://localhost:7000/uploads/${property.image}` : null);
      setErrorMsg(""); // Clear errors on property change
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setErrorMsg(""); // Clear previous errors

    if (!formData.title.trim()) {
      setErrorMsg('Property Title cannot be empty.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    setIsSubmitting(true);
    try {
      const response = await updateProperty(property.id, data);

      if (response?.success) {
        onPropertyUpdated(true, "Property updated successfully!");
        onHide(); // Close modal on success
      } else {
        setErrorMsg(response?.message || "Failed to update property. Please try again.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      setErrorMsg(error.response?.data?.message || "An error occurred while updating the property. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: '#2495FD', // Blue header
          color: '#FFFFFF', // White text
          borderBottom: '1px solid #1A7CE1',
        }}
      >
        <Modal.Title style={{ fontWeight: '600' }}>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#F3F3F3', color: '#333333' }}> {/* Light grey body, dark text */}
        {errorMsg && <Alert variant="danger" className="text-center">{errorMsg}</Alert>}
        <Form>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group controlId="editFormTitle">
                <Form.Label style={{ fontWeight: '500' }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="editFormPrice">
                <Form.Label style={{ fontWeight: '500' }}>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group controlId="editFormCity">
                <Form.Label style={{ fontWeight: '500' }}>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="editFormType">
                <Form.Label style={{ fontWeight: '500' }}>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="editFormDescription" className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
            />
          </Form.Group>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Group controlId="editFormBedroom">
                <Form.Label style={{ fontWeight: '500' }}>Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bedroom"
                  value={formData.bedroom}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="editFormBathroom">
                <Form.Label style={{ fontWeight: '500' }}>Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bathroom"
                  value={formData.bathroom}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group controlId="editFormGarage">
                <Form.Label style={{ fontWeight: '500' }}>Garage</Form.Label>
                <Form.Control
                  type="number"
                  name="garage"
                  value={formData.garage}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group controlId="editFormSize">
                <Form.Label style={{ fontWeight: '500' }}>Size (sq ft)</Form.Label>
                <Form.Control
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="editFormYear">
                <Form.Label style={{ fontWeight: '500' }}>Year Built</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="editFormAddress" className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
            />
          </Form.Group>

          <Form.Group controlId="editFormImage" className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Change Image (optional)</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
            />
          </Form.Group>

          {previewImage && (
            <div className="mt-3 text-center">
              <p style={{ color: '#666666', marginBottom: '10px' }}>Current Image Preview:</p>
              <Image
                src={previewImage}
                alt="Property preview"
                thumbnail // Add thumbnail for a nice border
                style={{ maxHeight: "150px", border: '1px solid #2495FD' }} // Blue border for image
              />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#2495FD', borderTop: '1px solid #1A7CE1' }}>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={isSubmitting}
          style={{
            backgroundColor: '#FFFFFF', // White button
            borderColor: '#FFFFFF',
            color: '#2495FD', // Blue text
            fontWeight: 'bold',
            padding: '0.6rem 2rem',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#E0E0E0'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#FFFFFF'; }}
        >
          {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update Property'}
        </Button>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={isSubmitting}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
            padding: '0.6rem 2rem',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProperty;