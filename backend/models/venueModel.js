const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
  venueName: {
    type: String,
    required: [true, 'Please enter the Venue Name'],
  },
  venueAddress: {
    type: String,
    required: [true, 'Please enter the Venue Address'],
  },
  venueType: {
    type: String,
    required: [true, 'Please select the Venue Type'],
  },
  venueCategory: [
    {
      type: String,
      enum: [
        'Weddings',
        'Corporate Events',
        'Concerts',
        'Exhibitions',
        'Private Parties',
        'Festivals',
        'Workshops',
        'Seminars',
      ],
    },
  ],
  photosAndVideos: {
    type: [{
      data: Buffer, // Store the binary data of the photo/video
      contentType: String, // Store the MIME type of the photo/video
    }],
  },
  establishmentYear: {
    type: Date,
    // required: [true, 'Please enter the Year of Establishment'],
  },
  ownershipType: {
    type: String,
    enum: ['Privately Owned', 'Chain', 'Government-Owned'],
    // required: [true, 'Please select the Ownership Type'],
  },
  availability: {
    type: [Date],
    // required: [true, 'Please select the Availability'],
  },
});

module.exports = mongoose.model('Venue', venueSchema);
