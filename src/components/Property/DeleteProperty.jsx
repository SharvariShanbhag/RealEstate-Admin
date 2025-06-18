import React, { useState, useEffect } from 'react'; // Added useEffect
import { Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { deleteProperty } from '../../API/Api'; // Ensure correct path to your API utility

function DeleteProperty({ show, onHide, propertyId, onPropertyDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Reset state when modal is shown/hidden
  useEffect(() => {
    if (show) {
      setDeleteError(null); // Clear previous errors when modal opens
    }
  }, [show]);

  const handleDeleteProperty = async () => {
    setIsDeleting(true);
    setDeleteError(null); // Clear any previous error before new attempt

    if (!propertyId) {
      setDeleteError('Error: Property ID not provided for deletion.'); // More specific message
      setIsDeleting(false);
      return;
    }

    try {
      const response = await deleteProperty(propertyId); // This calls your API
      if (response.success) {
        onPropertyDelete(true, 'Property deleted successfully!');
        onHide();
      } else {
        const backendMessage = response.message || 'Failed to delete property.';
        onPropertyDelete(false, backendMessage);
        setDeleteError(`Error: ${backendMessage}`); // Display in modal
      }
    } catch (error) {
      console.error("Error deleting property (frontend catch):", error); // Improved logging
      // More robust error message extraction
      const errorMessage = error.response?.data?.details // If backend sends 'details' (as per your controller)
                           || error.response?.data?.error // If backend sends 'error'
                           || error.response?.data?.message
                           || error.message
                           || 'An unexpected error occurred on the frontend.';
      onPropertyDelete(false, `Deletion failed: ${errorMessage}`); // Inform parent
      setDeleteError(`Error: ${errorMessage}`); // Display in modal
    } finally {
      setIsDeleting(false);
      // Keep modal open if there's an error displayed within it
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#DC3545', color: '#FFFFFF', borderBottom: '1px solid #CC0000' }}>
        <Modal.Title style={{ fontWeight: '600' }}>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#F3F3F3', color: '#333333' }}>
        {deleteError && (
          <Alert variant="danger" className="mb-3">
            {deleteError}
          </Alert>
        )}
        <p>Are you sure you want to delete this property (ID: {propertyId})? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#F3F3F3', borderTop: '1px solid #E0E0E0' }}>
        <Button
          variant="danger"
          onClick={handleDeleteProperty}
          disabled={isDeleting}
          style={{
            backgroundColor: '#DC3545',
            borderColor: '#DC3545',
            color: '#FFFFFF',
            fontWeight: 'bold',
            borderRadius: '0.5rem',
            padding: '0.6rem 1.5rem',
          }}
        >
          {isDeleting ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
              Deleting...
            </>
          ) : 'Delete'}
        </Button>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={isDeleting}
          style={{
            backgroundColor: '#6C757D',
            borderColor: '#6C757D',
            color: '#FFFFFF',
            borderRadius: '0.5rem',
            padding: '0.6rem 1.5rem',
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProperty;