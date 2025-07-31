 # Movie Reservation Backend API
**This is the backend system for a movie reservation platform that allows users to register, browse available movies, view showtimes, reserve seats, and manage their bookings.

The system includes:
- Role-based authorization
- Image upload via Cloudinary
- Seat availability checks
- Full CRUD operations for movies and showtimes

## Built With
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Cloudinary

## Features

### User Authentication & Authorization
- Register, login, and update profile
- JWT-based authentication
- Role-based access (admin vs user)

### Movie Management (Admin only)
- Add, update, and delete movies
- Upload poster images using Cloudinary
- Movies include title, description, genre, and image

### Showtime Management (Admin only)
- Add, update, and delete showtimes for any movie
- Each showtime includes:
  - Start & end time
  - Seat capacity
  - Room number
- End time is automatically calculated based on movie duration + 30 minutes

### Reservation Management (User)
- Reserve specific seats for showtimes
- Automatic seat availability check (prevents double booking)
- Cancel reservations and automatically update available seats
- Users can view their own bookings
- Admins can view all reservations

