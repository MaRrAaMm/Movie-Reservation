 # Movie Reservation Backend API
This is the backend system for a movie reservation platform that allows users to register, browse available movies, view showtimes, reserve seats, and manage their bookings.

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

###📁 Folder Structure
src
├── db
│ ├── connection.js
│ └── models
│ ├── movie.model.js
│ ├── reservation.model.js
│ ├── showtime.model.js
│ └── user.model.js
│
├── middlewares
│ ├── auth.middleware.js
│ ├── authorization.middleware.js
│ └── validation.middleware.js
│
├── modules
│ ├── admin
│ │ ├── admin.controller.js
│ │ ├── admin.endpoint.js
│ │ ├── admin.service.js
│ │ └── admin.validation.js
│
│ ├── auth
│ │ ├── auth.controller.js
│ │ ├── auth.service.js
│ │ └── auth.validation.js
│
│ ├── user
│ │ ├── user.controller.js
│ │ └── user.service.js
│
│ ├── movie
│ │ ├── movie.controller.js
│ │ ├── movie.service.js
│ │ └── movie.validation.js
│
│ ├── showtime
│ │ ├── showtime.controller.js
│ │ ├── showtime.service.js
│ │ └── showtime.validation.js
│
│ └── reservation
│ ├── reservation.controller.js
│ ├── reservation.service.js
│ └── reservation.endpoint.js
│
├── utils
│ ├── token
│ ├── hash
│ ├── error
│ ├── file uploads
│ └── crypto
│
├── app.controller.js
├── .env
└── index.js
