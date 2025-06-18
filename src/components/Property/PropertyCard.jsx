import React from 'react';
import { Card, Badge } from 'react-bootstrap';
// Import FaImage for the "No Image Available" placeholder
import { FaImage } from 'react-icons/fa'; 

const PropertyCard = ({ property, children }) => {
  // Function to format price for better readability
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Or 'USD' if your prices are in dollars
      minimumFractionDigits: 0, // No decimal places for whole numbers
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Define shadows as constants for consistency
  const defaultShadow = '0 2px 4px rgba(0,0,0,0.08)'; // Softer default shadow
  const hoverShadow = '0 10px 20px rgba(0,0,0,0.2)'; // More pronounced shadow on hover

  return (
    <Card
      className="h-100" // Ensures all cards in a row have the same height
      style={{
        borderRadius: '0.8rem', // Slightly larger border-radius
        overflow: 'hidden', // Ensures content respects border-radius
        border: '1px solid #E5E5E5', // Softer border color
        boxShadow: defaultShadow, // Apply initial shadow
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Smooth transitions
        cursor: 'pointer', // Indicates interactivity
      }}
      // Hover effects for a subtle lift and deeper shadow
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'; // Lift the card slightly
        e.currentTarget.style.boxShadow = hoverShadow; // Apply deeper shadow
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'; // Restore original position
        e.currentTarget.style.boxShadow = defaultShadow; // Restore original shadow
      }}
    >
      {/* Property Image or Placeholder */}
      {property.image ? (
        <Card.Img
          variant="top"
          src={`http://localhost:8000/uploads/${property.image}`} // Ensure this matches your backend upload path
          alt={property.title}
          style={{ height: '220px', objectFit: 'cover', borderBottom: '1px solid #F0F0F0' }} // Taller image, softer bottom border
        />
      ) : (
        <div
          style={{
            height: '220px', // Match the height of actual images
            backgroundColor: '#F8F8F8', // Very light grey background for placeholder
            display: 'flex',
            flexDirection: 'column', // Stack icon and text vertically
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B0B0B0', // Softer grey text
            fontSize: '1.1rem', // Adjusted font size
            fontWeight: 'bold',
            borderBottom: '1px solid #F0F0F0',
            fontStyle: 'italic',
          }}
        >
          <FaImage style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#C0C0C0' }} /> {/* Larger, subtle icon */}
          No Image
        </div>
      )}

      <Card.Body className="d-flex flex-column p-4"> {/* Increased padding inside card body */}
        {/* Title and Type Badge */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title 
            className="mb-0 flex-grow-1" // Allows title to take available space
            style={{ 
              color: '#2C3E50', // Dark charcoal/blue for title
              fontWeight: 'bold', 
              fontSize: '1.4rem', // Slightly adjusted font size
              lineHeight: '1.3' // Improved line height for multi-line titles
            }}
          >
            {property.title}
          </Card.Title>
          <Badge
            pill // Pill shape for the badge
            style={{
              backgroundColor: property.type === 'For Sale' ? '#28A745' : '#17A2B8', // Green for sale, Teal for rent
              color: '#FFFFFF',
              padding: '0.45em 0.8em', // Fine-tuned padding for a balanced look
              fontSize: '0.8em', // Slightly smaller font for the badge
              whiteSpace: 'nowrap', // Prevents badge text from wrapping
              marginLeft: '0.75rem', // More space from the title
              alignSelf: 'flex-start', // Aligns badge to the top in a flex container
            }}
          >
            {property.type}
          </Badge>
        </div>

        {/* Price and City */}
        <Card.Text className="mb-3"> {/* Increased bottom margin */}
          <strong style={{ color: '#007bff', fontSize: '1.25rem' }}>{formatPrice(property.price)}</strong> {/* Bootstrap primary blue for price */}
          <span className="text-muted ms-2" style={{ fontSize: '0.9rem' }}>in {property.city}</span> {/* Slightly smaller text for city, muted color */}
        </Card.Text>

        {/* Short Description (uncomment to enable) */}
        {/* Displays a truncated description if available, otherwise a placeholder */}
        {property.description ? (
            <Card.Text className="text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.85rem' }}>
                {property.description.substring(0, 120) + (property.description.length > 120 ? '...' : '')}
            </Card.Text>
        ) : (
            <Card.Text className="text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                No detailed description provided.
            </Card.Text>
        )}

        {/* Children (for action buttons like Edit, Delete, View Details) */}
        <div className="mt-auto pt-3 border-top" style={{ borderColor: '#E0E0E0' }}> {/* Pushes children to the bottom, with a subtle top border */}
          {children}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;