const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Venue = require('../models/venueModel');
const ApiFeatures = require('../utils/apifeactures');
const mongoose = require("mongoose");
// Create Venue
exports.createVenue = catchAsyncErrors(async (req, res, next) => {

 
   
  const venue = await Venue.create(req.body);

  res.status(201).json({
    success: true,
    venue,
  });
});

// Get All Venues
exports.getAllVenues = catchAsyncErrors(async (req, res, next) => {

  
  const venuesCount = await Venue.countDocuments();
  const resultPerPage=5;

  const apiFeatures = new ApiFeatures(Venue.find(), req.query).search().pagination(resultPerPage);
  // const venues = await Venue.find();
   const venues = await apiFeatures.query;

  res.status(200).json({
    success: true,
    venues,
    venuesCount,
    resultPerPage,
    
  });
});




exports.updateVenue = async (req, res, next) => {
  const { id } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id);
    return res.status(400).json({
      success: false,
      message: "Invalid Venue ID",
    });
  }

  let venue = await Venue.findById(id);

  if (!venue) {
    return res.status(404).json({
      success: false,
      message: "Venue not found",
    });
  }

  // Continue with the update logic using findByIdAndUpdate
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true,
      message: "Venue Updated Successfully",
      data: updatedVenue, // Optionally, you can send the updated venue data back in the response
    });
  } catch (error) {
    // Handle any potential errors during the update process
    res.status(500).json({
      success: false,
      message: "Error updating venue",
    });
  }
};


exports.deleteVenue = catchAsyncErrors(async (req, res, next) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    return res.status(404).json({
      success: false,
      message: "Venue not found",
    });
  }

  
  // Optionally, you can add some authorization logic here to check if the user is allowed to delete the venue.

  await venue.deleteOne();

  res.status(200).json({
    success: true,
    message: "Venue Deleted Successfully",
  });
});

