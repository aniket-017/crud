import React, { useState , useEffect } from 'react';
import DatePicker from 'react-datepicker'
import { DateRangePicker } from 'react-date-range';
import './Form.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector,useDispatch } from 'react-redux';
import { createVenue, getAllVenues } from '../../actions/venueActions.js';
import Table from "./table"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SuccessMessage from './SuccessMessage.js'; 


// Rest of the code...


const Page1 = () => {
  const customStyles = {
    background: '#f0f0f0',
    border: 'black'
  
    // Add more custom styles here as needed
  };
  
;
  const dispatch = useDispatch();

  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueType, setVenueType] = useState('');
  const [venueCategory, setVenueCategory] = useState([]);
  const [photosAndVideos, setPhotosAndVideos] = useState(null);
  const [establishmentYear, setEstablishmentYear] = useState(null);
  const [ownershipType, setOwnershipType] = useState('');
  const [availability, setAvailability] = useState([null, null]);

  const [startDate, setStartDate] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false); 

const [categoryValidationError, setCategoryValidationError] = useState('');
const [ownershipTypeValidationError, setOwnershipTypeValidationError] = useState('');
const [availabilityValidationError, setAvailabilityValidationError] = useState('');

  // const handleChange = (date) => {
  //   setStartDate(date);
  //   setAvailability([date]); // Update the availability state
  // };
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);


  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };
  

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setVenueCategory([...venueCategory, category]);
    } else {
      setVenueCategory(venueCategory.filter((item) => item !== category));
    }
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

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

  if (!dateRange[0].startDate || !dateRange[0].endDate) {
    setAvailabilityValidationError('Please select the availability dates.');
    return; // Prevent form submission
  } else {
    setAvailabilityValidationError(''); // Clear the validation message
  }

    const formData = {
      venueName,
      venueAddress,
      venueType,
      venueCategory,
      photosAndVideos,
      establishmentYear,
      ownershipType,
      availability: [dateRange[0].startDate, dateRange[0].endDate],
    };

    
  
    dispatch(createVenue(formData));
    setFormSubmitted(true);
  };

  return (
  
    
    
    
    <div className="venue-form">
    <hr/>
      {formSubmitted ? (
        <SuccessMessage
          message="Form submitted successfully!"
          onClose={() => setFormSubmitted(false)}
        />
      ) : (
        <>
    
      <h2>Venue Form</h2>
     
    
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
          <div className='ck'>
            <label>
              <input
                type="checkbox"
                value="Weddings"
                checked={venueCategory.includes('Weddings')}
                onChange={handleCategoryChange}
              
              />
              Weddings
            </label>
            <label>
              <input
                type="checkbox"
                value="Corporate Events"
                checked={venueCategory.includes('Corporate Events')}
                onChange={handleCategoryChange}
              />
              Corporate Events
            </label>
            <label>
              <input
                type="checkbox"
                value="Concerts"
                checked={venueCategory.includes('Concerts')}
                onChange={handleCategoryChange}
              />
              Concerts
            </label>
            <label>
              <input
                type="checkbox"
                value="Exhibitions"
                checked={venueCategory.includes('Exhibitions')}
                onChange={handleCategoryChange}
              />
              Exhibitions
            </label>
            <label>
              <input
                type="checkbox"
                value="Private Parties"
                checked={venueCategory.includes('Private Parties')}
                onChange={handleCategoryChange}
              />
              Private Parties
            </label>
            <label>
              <input
                type="checkbox"
                value="Festivals"
                checked={venueCategory.includes('Festivals')}
                onChange={handleCategoryChange}
              />
              Festivals
            </label>
            <label>
              <input
                type="checkbox"
                value="Workshops"
                checked={venueCategory.includes('Workshops')}
                onChange={handleCategoryChange}
              />
              Workshops
            </label>
            <label>
              <input
                type="checkbox"
                value="Seminars"
                checked={venueCategory.includes('Seminars')}
                onChange={handleCategoryChange}
              />
              Seminars
            </label>


          </div>
          {categoryValidationError && (
    <span className="validation-error">{categoryValidationError}</span>
  )}
        </div>

        {/* <div className="form-group">
          <label htmlFor="photosAndVideos">Photos and Videos:</label>
          <input
            type="file"
            id="photosAndVideos"
            onChange={(e) => setPhotosAndVideos(e.target.files)}
            multiple
          />
        </div> */}

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
          <label>Ownership Type</label>
          <div className='ck'>
            <label>
              <input
                type="radio"
                value="Privately Owned"
                checked={ownershipType === 'Privately Owned'}
                onChange={(e) => setOwnershipType(e.target.value)}
              />
              Privately Owned
            </label>
            <label>
              <input
                type="radio"
                value="Chain"
                checked={ownershipType === 'Chain'}
                onChange={(e) => setOwnershipType(e.target.value)}
              />
              Chain
            </label>
            <label>
              <input
                type="radio"
                value="Government-Owned"
                checked={ownershipType === 'Government-Owned'}
                onChange={(e) => setOwnershipType(e.target.value)}
              />
              Government-Owned
            </label>
          </div>
          {ownershipTypeValidationError && (
    <span className="validation-error">{ownershipTypeValidationError}</span>
  )}
        </div>

        {/* <div className="form-group">
          <label htmlFor="availability">Availability:</label>
        
          <DatePicker
            id="availability"
            dateFormat="MM-dd-yyyy"
            selected={startDate}
            //  startDate={startDate}

            onChange={handleChange}
            required
          />
        </div> */}

        <div className="form-group">
                <label htmlFor="availability">Availability</label>

                <DateRangePicker

                className='rdrDefinedRangesWrapper  '
                 staticRanges={[]}
                inputRanges={[]}
                  onChange={handleDateChange}
                  // showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
              
                  style={customStyles} 
                  required
                />
              
              </div>  {availabilityValidationError && (
    <span className="validation-error">{availabilityValidationError}</span>
  )}

  {ownershipTypeValidationError && (
    <span className="validation-error">{ownershipTypeValidationError}</span>
  )}

  {categoryValidationError && (
    <span className="validation-error">{categoryValidationError}</span>
  )}
  

        <button type="submit">Submit</button>
      </form>
      </>
      )}
    </div> 
   
    
  );
};

export default Page1;
