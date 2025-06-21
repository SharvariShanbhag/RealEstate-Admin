import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Table, Button, Card, Badge, Modal, Form } from 'react-bootstrap';
import { getGeneralInquiries, updateGeneralInquiryStatus } from '../../API/Api'; // Adjust path
import './InquiryList.css'; // Import the CSS file

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Resolved', 'Archived'

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getGeneralInquiries();
            setInquiries(data);
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            setError('Failed to load inquiries. Please check your network or server connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInquiry(null);
    };

    const handleUpdateStatus = async (inquiryId, newStatus) => {
        if (window.confirm(`Are you sure you want to change the status of this inquiry to "${newStatus}"?`)) {
            try {
                await updateGeneralInquiryStatus(inquiryId, newStatus);
                fetchInquiries(); // Re-fetch to update the list
                if (selectedInquiry && selectedInquiry._id === inquiryId) {
                    setSelectedInquiry(prev => ({ ...prev, status: newStatus })); // Update modal data too
                }
                alert(`Inquiry status updated to ${newStatus}.`);
            } catch (err) {
                console.error('Error updating inquiry status:', err);
                alert('Failed to update inquiry status.');
            }
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        if (statusFilter === 'All') return true;
        return inquiry.status === statusFilter;
    });

    if (loading) {
        return (
            <div className="inquiry-list-container text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading inquiries...</span>
                </Spinner>
                <p className="mt-2">Loading inquiries...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inquiry-list-container py-4">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="inquiry-list-container">
            <h2 className="mb-4">General Inquiries</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Group controlId="statusFilter">
                    <Form.Label className="me-2">Filter by Status:</Form.Label>
                    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Archived">Archived</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="outline-primary" onClick={fetchInquiries}>Refresh Inquiries</Button>
            </div>

            {filteredInquiries.length === 0 ? (
                <Alert variant="info">No {statusFilter === 'All' ? '' : statusFilter.toLowerCase()} inquiries found.</Alert>
            ) : (
                <Table striped bordered hover responsive className="inquiry-table shadow-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message Snippet</th>
                            <th>Status</th>
                            <th>Received On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.map((inquiry, index) => (
                            <tr key={inquiry._id}>
                                <td>{index + 1}</td>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.phone || 'N/A'}</td>
                                <td>{inquiry.message.substring(0, 50)}{inquiry.message.length > 50 ? '...' : ''}</td>
                                <td>
                                    <Badge bg={
                                        inquiry.status === 'Pending' ? 'warning' :
                                        inquiry.status === 'Resolved' ? 'success' :
                                        'secondary'
                                    }>
                                        {inquiry.status}
                                    </Badge>
                                </td>
                                <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => handleViewDetails(inquiry)} className="me-1">
                                        View
                                    </Button>
                                    {inquiry.status === 'Pending' && (
                                        <Button variant="success" size="sm" onClick={() => handleUpdateStatus(inquiry._id, 'Resolved')}>
                                            Resolve
                                        </Button>
                                    )}
                                    {inquiry.status === 'Resolved' && (
                                        <Button variant="secondary" size="sm" onClick={() => handleUpdateStatus(inquiry._id, 'Pending')} className="ms-1">
                                            Re-open
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Inquiry Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Inquiry Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInquiry && (
                        <Card>
                            <Card.Body>
                                <p><strong>Name:</strong> {selectedInquiry.name}</p>
                                <p><strong>Email:</strong> {selectedInquiry.email}</p>
                                <p><strong>Phone:</strong> {selectedInquiry.phone || 'N/A'}</p>
                                <p><strong>Message:</strong></p>
                                <p className="inquiry-message-full">{selectedInquiry.message}</p>
                                <p><strong>Status:</strong> <Badge bg={
                                    selectedInquiry.status === 'Pending' ? 'warning' :
                                    selectedInquiry.status === 'Resolved' ? 'success' :
                                    'secondary'
                                }>{selectedInquiry.status}</Badge></p>
                                <p><strong>Submitted On:</strong> {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedInquiry && selectedInquiry.status === 'Pending' && (
                        <Button variant="success" onClick={() => handleUpdateStatus(selectedInquiry._id, 'Resolved')}>Mark as Resolved</Button>
                    )}
                     {selectedInquiry && selectedInquiry.status === 'Resolved' && (
                        <Button variant="secondary" onClick={() => handleUpdateStatus(selectedInquiry._id, 'Pending')}>Mark as Pending</Button>
                    )}
                    <Button variant="dark" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InquiryList;