// src/components/AddProperty.jsx
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { createProperty } from '../../API/Api'; // Ensure correct path to your API calls

function AddProperty({ show, onHide, onPropertyAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        city: '',
        description: '',
        type: 'For Sale',
        address: '',
        size: '',
        area: '',
        bedroom: '',
        bathroom: '',
        garage: 0,
        year: '',
        zip_code: '',
        city_area: '',
        state: '',
        country: '',
    });
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!show) {
            setFormData({
                title: '', price: '', city: '', description: '', type: 'For Sale',
                address: '', size: '', area: '', bedroom: '', bathroom: '',
                garage: 0, year: '', zip_code: '', city_area: '', state: '', country: '',
            });
            setImage(null);
            setErrorMsg("");
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNewProperty = async () => {
        setErrorMsg("");

        if (!formData.title.trim() || !formData.price.trim() || !formData.city.trim() ||
            !formData.type.trim() || !formData.address.trim() || !image
        ) {
            setErrorMsg('Please fill in all required fields (Title, Price, City, Type, Address) and select an Image.');
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            // Append only non-empty string values, or 0 for garage if it's 0
            if (formData[key] !== '' || (key === 'garage' && formData[key] === 0)) {
                data.append(key, formData[key]);
            }
        }
        data.append('image', image);

        setIsSubmitting(true);
        try {
            const response = await createProperty(data);

            if (response?.success) {
                onPropertyAdded(true, response.message || 'Property added successfully!');
                onHide();
            } else {
                setErrorMsg(response?.details || response?.message || 'Failed to add Property. Please try again.');
            }
        } catch (error) {
            console.error("Error adding property:", error);
            setErrorMsg(error.response?.data?.details || error.response?.data?.message || 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#2495FD', color: '#FFFFFF', borderBottom: '1px solid #1A7CE1' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: '600' }}>Add New Property</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#F3F3F3', color: '#333333' }}>
                {errorMsg && <Alert variant="danger" className="text-center">{errorMsg}</Alert>}
                <Form>
                    {/* Your form fields go here, same as you provided */}
                    {/* ... (all your Form.Group components for title, price, city, etc.) */}
                     <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Group controlId="formTitle">
                                <Form.Label style={{ fontWeight: '500' }}>Title <span className="text-danger">*</span></Form.Label>
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
                            <Form.Group controlId="formPrice">
                                <Form.Label style={{ fontWeight: '500' }}>Price <span className="text-danger">*</span></Form.Label>
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
                            <Form.Group controlId="formCity">
                                <Form.Label style={{ fontWeight: '500' }}>City <span className="text-danger">*</span></Form.Label>
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
                            <Form.Group controlId="formType">
                                <Form.Label style={{ fontWeight: '500' }}>Type <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                >
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group controlId="formDescription" className="mb-3">
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
                            <Form.Group controlId="formBedroom">
                                <Form.Label style={{ fontWeight: '500' }}>Bedrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="bedroom"
                                    value={formData.bedroom}
                                    onChange={handleChange}
                                    min="0"
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="formBathroom">
                                <Form.Label style={{ fontWeight: '500' }}>Bathrooms</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="bathroom"
                                    value={formData.bathroom}
                                    onChange={handleChange}
                                    min="0"
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="formGarage">
                                <Form.Label style={{ fontWeight: '500' }}>Garage</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="garage"
                                    value={formData.garage}
                                    onChange={handleChange}
                                    min="0"
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Group controlId="formSize">
                                <Form.Label style={{ fontWeight: '500' }}>Size (e.g., "1500 sq ft")</Form.Label>
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
                            <Form.Group controlId="formArea">
                                <Form.Label style={{ fontWeight: '500' }}>Area (e.g., "0.5 acres")</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Group controlId="formYear">
                                <Form.Label style={{ fontWeight: '500' }}>Year Built</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    min="1800"
                                    max={new Date().getFullYear() + 5}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="formZipCode">
                                <Form.Label style={{ fontWeight: '500' }}>Zip Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="zip_code"
                                    value={formData.zip_code}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label style={{ fontWeight: '500' }}>Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                        />
                    </Form.Group>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <Form.Group controlId="formCityArea">
                                <Form.Label style={{ fontWeight: '500' }}>City Area</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city_area"
                                    value={formData.city_area}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="formState">
                                <Form.Label style={{ fontWeight: '500' }}>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="formCountry">
                                <Form.Label style={{ fontWeight: '500' }}>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label style={{ fontWeight: '500' }}>Property Image <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                            style={{ backgroundColor: '#FFFFFF', color: '#333333', border: '1px solid #CCCCCC' }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: '#2495FD', borderTop: '1px solid #1A7CE1' }}>
                <Button variant="primary" onClick={handleNewProperty} disabled={isSubmitting}
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', color: '#2495FD', fontWeight: 'bold', padding: '0.6rem 2rem', borderRadius: '0.5rem', transition: 'background-color 0.2s, color 0.2s', }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#E0E0E0'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#FFFFFF'; }}
                >
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Create Property'}
                </Button>
                <Button variant="secondary" onClick={onHide} disabled={isSubmitting}
                    style={{ backgroundColor: 'transparent', border: '1px solid #FFFFFF', color: '#FFFFFF', padding: '0.6rem 2rem', borderRadius: '0.5rem', transition: 'background-color 0.2s, color 0.2s', }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProperty;