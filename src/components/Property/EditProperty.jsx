import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateProperty } from "../../API/Api";

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

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price,
        city: property.city,
        description: property.description,
        type: property.type,
        address: property.address,
        bedroom: property.bedroom,
        bathroom: property.bathroom,
        size: property.size,
        year: property.year,
        garage: property.garage || 0
      });
      setImageFile(null);
      setPreviewImage(property.image ? `http://localhost:7000/uploads/${property.image}` : null);
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
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    const response = await updateProperty(property.id, data);

    if (response.success) {
      onPropertyUpdated(true, "Property updated successfully!");
      onHide();
    } else {
      onPropertyUpdated(false, response.message || "Failed to update property.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#640D5F', color: '#FFB200' }}>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#2A2A2A', color: '#FFFFFF' }}>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </Form.Select>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </Form.Group>

        <div className="row mb-3">
          <div className="col-md-4">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathroom"
              value={formData.bathroom}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Garage</Form.Label>
            <Form.Control
              type="number"
              name="garage"
              value={formData.garage}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>Size (sq ft)</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Change Image (optional)</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleImageChange} 
            accept="image/*"
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </Form.Group>

        {previewImage && (
          <div className="mt-3 text-center">
            <p>Image Preview:</p>
            <Image
              src={previewImage}
              alt="Property preview"
              thumbnail
              style={{ maxHeight: "150px" }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#640D5F' }}>
        <Button
          variant="light"
          style={{
            backgroundColor: '#FFB200',
            border: 'none',
            color: '#640D5F',
            fontWeight: 'bold',
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          variant="secondary"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
          }}
          onClick={onHide}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProperty;