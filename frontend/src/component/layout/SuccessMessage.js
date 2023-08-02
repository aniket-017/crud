import React from 'react';

const SuccessMessage = ({ message, onClose }) => {

  const handleClose = () => {
    // Reload the page
   
    // Call the onClose function to close the success message
    onClose();
    window.location.reload();
  };
  
  return (
    <div className="success-message">
      <p>{message}</p>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default SuccessMessage;
