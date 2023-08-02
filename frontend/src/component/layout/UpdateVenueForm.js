import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from 'react-datepicker';
import { DateRangePicker } from 'react-date-range';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { updateVenue } from "../../actions/venueActions";
import "./update.css"
import { FaPencilAlt } from 'react-icons/fa';



const UpdateVenueForm = ({ selectedVenue, onCancel, onUpdate, onSuccess, close }) => {
  // State to manage the updated form fields

  
  const dispatch = useDispatch();
  const [venueName, setVenueName] = useState(selectedVenue.venueName);
  const [venueAddress, setVenueAddress] = useState(selectedVenue.venueAddress);
  const [venueType, setVenueType] = useState(selectedVenue.venueType);
  const [venueCategory, setVenueCategory] = useState(selectedVenue.venueCategory);
  const [establishmentYear, setEstablishmentYear] = useState(new Date(selectedVenue.establishmentYear));
  const [ownershipType, setOwnershipType] = useState(selectedVenue.ownershipType);
  const [availability, setAvailability] = useState({
    startDate: new Date(selectedVenue.availability[0]),
    endDate: new Date(selectedVenue.availability[1]),
  });

  const [categoryValidationError, setCategoryValidationError] = useState('');
  const [ownershipTypeValidationError, setOwnershipTypeValidationError] = useState('');
  const [availabilityValidationError, setAvailabilityValidationError] = useState('');

  const handleDateChange = (ranges) => {
    setAvailability({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setVenueCategory([...venueCategory, category]);
    } else {
      setVenueCategory(venueCategory.filter((item) => item !== category));
    }
  };

  const venueCategories = [
    'Weddings',
    'Corporate Events',
    'Concerts',
    'Exhibitions',
    'Private Parties',
    'Festivals',
    'Workshops',
    'Seminars',
    // Add other venue categories here
  ];

  const ownershipTypes = [
    'Privately Owned',
    'Chain',
    'Government-Owned',
    // Add other ownership types here
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedVenue.id);

    if (venueCategory.length === 0) {
      setCategoryValidationError('Please select at least one Venue Category.');
      return; // Prevent form submission
    } else {
      setCategoryValidationError(''); // Clear the validation message
    }

    // Check if an Ownership Type is selected
    if (!ownershipType) {
      setOwnershipTypeValidationError('Please select an Ownership Type.');
      return; // Prevent form submission
    } else {
      setOwnershipTypeValidationError(''); // Clear the validation message
    }

    // Check if availability dates are selected
    if (!availability.startDate || !availability.endDate) {
      setAvailabilityValidationError('Please select the availability dates.');
      return; // Prevent form submission
    } else {
      setAvailabilityValidationError(''); // Clear the validation message
    }

  
    const updatedVenue = {
      id: selectedVenue._id,
      venueName,
      venueAddress,
      venueType,
      venueCategory,
      establishmentYear,
      ownershipType,
      availability: [availability.startDate, availability.endDate],
    };
    
    try {
      await dispatch(updateVenue(selectedVenue._id, updatedVenue));
      onSuccess(true);
      close(false);
      // The venue has been successfully updated
      // You can perform any additional actions here if needed
      console.log("Venue updated successfully!");
    } catch (error) {
      // Handle update error
      console.error("Venue update error:", error);
    }
  };

  return (
    <div className="update-venue-form">
    <hr />
      <h2>Update Venue</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="venueName">Venue Name</label>
          <input
            type="text"
            id="venueName"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venueAddress">Venue Address</label>
          <textarea
            id="venueAddress"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="venueType">Venue Type</label>
          <select
            id="venueType"
            value={venueType}
            onChange={(e) => setVenueType(e.target.value)}
            required
          >
            <option value="">Select Venue Type</option>
            <option value="Conference Centre">Conference Centre</option>
            <option value="Hotel">Hotel</option>
            <option value="Outdoor Space">Outdoor Space</option>
            <option value="Banquet Hall">Banquet Hall</option>
            <option value="Stadium">Stadium</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Museum">Museum</option>
          </select>
        </div>

        <div className="form-group">
          <label>Venue Category</label>
          <div>
          {venueCategories.map((category) => (
      <label key={category} className='ck'>
        <input
          type="checkbox"
          value={category}
          checked={venueCategory.includes(category)}
          onChange={handleCategoryChange}
        />
        {category}
      </label>
    ))}
            {/* Add other venue categories here */}
          </div>
          {categoryValidationError && (
            <span className="validation-error">{categoryValidationError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="establishmentYear">Year of Establishment</label>
          <DatePicker
            id="establishmentYear"
            selected={establishmentYear}
            onChange={(date) => setEstablishmentYear(date)}
            showYearPicker
            dateFormat="yyyy"
            required
          />
        </div>

        <div className="form-group">
          <label>Ownership Type:</label>
          {ownershipTypes.map((type) => (
           
      <label key={type} className='ck'>
        <input
          type="radio"
          value={type}
          checked={ownershipType === type}
          onChange={(e) => setOwnershipType(e.target.value)}
        />
        {type}
      </label>
      
    ))}
          {ownershipTypeValidationError && (
            <span className="validation-error">{ownershipTypeValidationError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <DateRangePicker
            className="rdrDefinedRangesWrapper"
            staticRanges={[]}
            inputRanges={[]}
            onChange={handleDateChange}
            ranges={[
              {
                startDate: availability.startDate,
                endDate: availability.endDate,
                key: 'selection',
              },
            ]}
            required
          />
        </div>

        {availabilityValidationError && (
          <span className="validation-error">{availabilityValidationError}</span>
        )}

        <div className="form-buttons">
      <button type="submit" className="save-button">
        <FaPencilAlt className="pencil-icon" />
        Save Changes
      </button>
      <button type="button" className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
      </form>
    </div>
  );
};

export default UpdateVenueForm;
