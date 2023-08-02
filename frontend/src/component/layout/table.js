import React, { useState, useEffect, useRef } from "react";
import "./VenueData.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllVenues } from "../../actions/venueActions.js";
import { deleteVenue } from "../../actions/venueActions.js";
import { FaPlus, FaSearch } from "react-icons/fa"; // Import the add icon from react-icons
import { useNavigate } from "react-router-dom";
import UpdateVenueForm from "./UpdateVenueForm.js";
import Page1 from "./Page1.js";
import Pagination from "react-js-pagination";

const VenueData = () => {
  const dispatch = useDispatch();

  // const {venues}= useSelector((state) => state.venues);
  const venues = useSelector((state) => state.venue.venues);
  const venue = useSelector((state) => state.venue);
  // Pagination

  const resultPerPage = venue.resultPerPage;
  const venuesCount = venue.venuesCount;
  const count = venue.venuesCount;
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Ref for the Page1 component
  const page1Ref = useRef(null);
  const updateVenueFormRef = useRef(null);

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  // State variable to control the display of Page1
  const [showPage1, setShowPage1] = useState(false);
  // State variables to control the display of UpdateVenueForm and Page1
  //  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [displayPage1, setDisplayPage1] = useState(false);

  // State to control the display of the success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] =
    useState(false);

  // Function to handle closing the success message
  const handleCloseSuccessMessage = () => {
    window.location.reload();
    setShowSuccessMessage(false);
  };
  const handleCloseDeleteSuccessMessage = () => {
    setShowDeleteSuccessMessage(false);
  };

  // Function to handle the update button click
  const handleUpdateClick = (venue) => {
    setDisplayPage1(false);
    setSelectedVenue(venue);
    setDisplayUpdateForm(true);
    // Scroll to the UpdateVenueForm component
    // updateVenueFormRef.current.scrollIntoView({ behavior: 'smooth' });
    updateVenueFormRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  // Function to handle the cancel button in the update form
  const handleCancelUpdate = () => {
    setSelectedVenue(null);
    setDisplayUpdateForm(false);
  };

  // Function to update a venue in the table
  const updateVenue = async (updatedVenue) => {
    // Dispatch the necessary action to update the data
    // For example:
    // dispatch(updateVenue(updatedVenue));
    // Clear the selectedVenue state and hide the update form
    // dispatch(updateVenue(selectedVenue.id, updatedVenue))
    // .then((res) => {
    //   // Handle successful update if needed
    //   console.log("Venue updated successfully:", res);
    // })
    // .catch((error) => {
    //   // Handle update error if needed
    //   console.error("Venue update error:", error);
    // });

    // setShowSuccessMessage(true);
    // setSelectedVenue(null);
    // setDisplayUpdateForm(false);

    try {
      await dispatch(updateVenue(updatedVenue));
      // Show the success message when the venue is updated successfully

      setShowSuccessMessage(true);
      setSelectedVenue(null);
      setDisplayUpdateForm(false);
    } catch (error) {
      console.error("Venue update error:", error);
    }
  };

  const [venues1, setVenues1] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(getAllVenues(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  // Function to add a new venue to the table
  const addVenue = (formData) => {
    setVenues1([...venues1, formData]);
  };

  // const deleteVenueHandler = async (id) => {
  //   // if (window.confirm("Are you sure you want to delete this venue?")) {
  //     await setShowDeleteSuccessMessage(true);
  //     dispatch(deleteVenue(id));

  //     window.location.reload();
  //   // }
  // };

  const deleteVenueHandler = async (id) => {
    await setDisplayUpdateForm(false);
    setSelectedVenue({ _id: id }); // Set the selected venue for deletion
    setShowDeleteSuccessMessage(true); // Show the delete confirmation message
  };

  // Function to handle the venue deletion after user confirmation
  const confirmVenueDeletion = () => {
    // Dispatch the deleteVenue action to delete the venue from the server
    dispatch(deleteVenue(selectedVenue._id))
      .then(() => {
        // Hide the delete confirmation message
        setShowDeleteSuccessMessage(false);
        setSelectedVenue(null);
      })
      .catch((error) => {
        console.error("Venue deletion error:", error);
      });
  };

  // Function to handle cancelling the venue deletion
  const cancelVenueDeletion = () => {
    setShowDeleteSuccessMessage(false);
    setSelectedVenue(null);
  };

  // Function to update a venue in the table
  // const updateVenue = (index, formData) => {
  //   console.log("updated");

  // };

  const navigate = useNavigate();

  const handleAddVenue = () => {
    // Your code for adding a venue to the table/database goes here
    // Once the venue is added successfully, navigate to Page1.js
    // For now, let's simulate navigation to Page1.js after a delay of 1 second
    // setTimeout(() => {Q
    // navigate('/form');
    // Close the UpdateVenueForm if it's open
    setDisplayUpdateForm(false);
    // Show the Page1 component
    setDisplayPage1(true);
    // Scroll to the Page1 component
    // window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page to show the Page1 component
    // }, 100);

    page1Ref.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  // useEffect(() => {
  //   // Scroll to the top of the page when displayUpdateForm or displayPage1 changes
  //   if (displayUpdateForm || displayPage1) {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [displayUpdateForm, displayPage1]);

  return (
    <div className="venue-data">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search Venue by Name,Address,Type,Category,Ownership"
            // value={searchTerm}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* <button type="submit" class="btn btnmodify"> */}
          <FaSearch className="search-icon"></FaSearch>
          {/* </button> */}
        </div>
        <button className="add-btn" onClick={handleAddVenue}>
          <FaPlus /> <span className="addremove">Add </span> &nbsp;Venue
        </button>
      </div>
      {venues.length === 0 ? (
        <p>No venues available.</p>
      ) : (
        <>
          <table className="venue-table">
            <thead>
              <tr>
                <th>Venue Name</th>
                <th>Venue Address</th>
                <th>Venue Type</th>
                <th>Venue Category</th>
                <th>Establishment Year</th>
                <th>Ownership Type</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.venueName}</td>
                  <td>{venue.venueAddress}</td>
                  <td>{venue.venueType}</td>
                  <td>{venue.venueCategory}</td>
                  <td>{new Date(venue.establishmentYear).getFullYear()}</td>
                  <td>{venue.ownershipType}</td>

                  <td>
                    {venue.availability[0].split("T")[0]} To{" "}
                    {venue.availability[1].split("T")[0]}
                  </td>

                  <tr>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteVenueHandler(venue._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdateClick(venue)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                  {/* Other venue details */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render cards for smaller screens */}
          <div className="venue-card-container">
            {venues.map((venue) => (
              <div className="venue-card" key={venue._id}>
                <div className="venue-field">
                  <span>Venue Name: </span>
                  {venue.venueName}
                </div>

                <div className="venue-field">
                  {" "}
                  <span>Address:</span> {venue.venueAddress}
                </div>

                <div className="venue-field">
                  <span>Type: </span>
                  {venue.venueType}
                </div>
                <div className="venue-field">
                  <span>Category:</span> {venue.venueCategory}
                </div>
                <div className="venue-field">
                  <span>Ownership:</span> {venue.ownershipType}
                </div>
                <div className="venue-field">
                  <span>Establishment Year:</span>{" "}
                  {new Date(venue.establishmentYear).getFullYear()}
                </div>
                <div className="venue-field">
                  <span> Availability: </span>
                  {venue.availability[0].split("T")[0]} To{" "}
                  {venue.availability[1].split("T")[0]}
                </div>
                <div className="venue-card-actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteVenueHandler(venue._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(venue)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={venuesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          <div ref={updateVenueFormRef}>
            {displayUpdateForm && selectedVenue && (
              <UpdateVenueForm
                selectedVenue={selectedVenue}
                onCancel={handleCancelUpdate}
                onUpdate={updateVenue}
                onSuccess={setShowSuccessMessage}
                close={setDisplayUpdateForm}
              />
            )}
          </div>

          {/* Show the success message */}
          {showSuccessMessage && (
            <div className="success-message">
              <p>Updated successfully!</p>
              <button
                className="close-button"
                onClick={handleCloseSuccessMessage}
              >
                Close
              </button>
            </div>
          )}

          {/* Show the delete success message */}
          {/* Show the delete confirmation message */}
          {showDeleteSuccessMessage && (
            <div className="delete-success-message">
              <p>Are you sure you want to delete this venue?</p>
              <button className="yes-button" onClick={confirmVenueDeletion}>
                Yes
              </button>
              <button className="no-button" onClick={cancelVenueDeletion}>
                No
              </button>
            </div>
          )}

          <div ref={page1Ref}>
            {/* Conditionally render Page1 */}
            {displayPage1 && <Page1 />}
          </div>
        </>
      )}
    </div>
  );
};

export default VenueData;
