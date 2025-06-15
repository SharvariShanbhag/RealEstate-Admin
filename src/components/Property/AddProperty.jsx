import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createProperty } from '../../API/Api';

function AddProperty({ show, onHide, onPropertyAdded, ...props }) {
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
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewProperty = async () => {
    if (!formData.title.trim() || !image) {
      alert('Please provide both Property title and image.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('image', image);

    setIsSubmitting(true);
    try {
      const response = await createProperty(data);

      if (response?.success) {
        onPropertyAdded?.();
        onHide?.();
        setFormData({
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
        setImage(null);
      } else {
        alert(response?.message || 'Failed to add Property');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the Property.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="custom-modal"
    >
      <Modal.Header
        closeButton
        className="border-0"
        style={{ backgroundColor: '#640D5F', color: '#FFB200' }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Property
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#2A2A2A', color: '#FFFFFF' }}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Bedrooms</label>
            <input
              type="number"
              className="form-control"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Bathrooms</label>
            <input
              type="number"
              className="form-control"
              name="bathroom"
              value={formData.bathroom}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Size (sq ft)</label>
            <input
              type="text"
              className="form-control"
              name="size"
              value={formData.size}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Year Built</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', border: '1px solid #640D5F' }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0" style={{ backgroundColor: '#640D5F' }}>
        <Button
          variant="light"
          style={{
            backgroundColor: '#FFB200',
            border: 'none',
            color: '#640D5F',
            fontWeight: 'bold',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
          }}
          onClick={handleNewProperty}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>

        <Button
          variant="secondary"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
          }}
          onClick={onHide}
          disabled={isSubmitting}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProperty;