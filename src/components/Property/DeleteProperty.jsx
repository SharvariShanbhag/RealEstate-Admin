import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProperty } from '../../API/Api';

function DeleteProperty({ show, onHide, propertyId, onPropertyDelete }) {
  const handleDeleteProperty = async () => {
    const response = await deleteProperty(propertyId);
    if (response.success) {
      onPropertyDelete(true, 'Property deleted successfully!');
    } else {
      onPropertyDelete(false, response.message || 'Failed to delete Property');
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#640D5F', color: '#FFFFFF' }}>
        <Modal.Title>Delete Property</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#2A2A2A', color: '#FFFFFF' }}>
        Are you sure you want to delete this Property? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#640D5F' }}>
        <Button
          style={{ backgroundColor: '#FFB200', color: '#640D5F', border: 'none' }}
          onClick={handleDeleteProperty}
        >
          Delete
        </Button>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{ backgroundColor: 'transparent', border: '1px solid #FFFFFF', color: '#FFFFFF' }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProperty;