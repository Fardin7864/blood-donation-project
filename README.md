# Blood Donation Application 

## Link: https://blood-donation-c2b2f.web.app

## 1. Introduction

### 1.1 Purpose

The Blood Donation Application aims to create a user-friendly platform that facilitates blood donation activities. This application connects donors with individuals in need of blood, promoting a seamless and efficient donation process.

### 1.2 Scope

The application includes features for user (donor) registration, blood donation requests, donor management, content management, and role-based access control. It is built using the MERN stack (MongoDB, Express.js, React, Node.js).

## 2. User Roles and Permissions

### 2.1 Role Management

- **Admin 🌐:** Has access to all features, including user management, donation requests, and content management.
- **Donor🩸:** Can register, view donation requests, respond to them, and maintain their own profile.
- **Volunteer 🤝:** Can create and manage donation requests.

## 3. User Authentication (public)

### 3.1 Registration

- Registration includes input fields such as email, name, avatar, blood group, district, upazila, password, and confirm password.
- Every user has a default "active" status; admin can block a user, changing the status to "blocked."

### 3.2 Login

- Registered users can log in using their email and password.

## 4. Dashboard (private🔒)

### 4.1 Donor Dashboard

- Dashboard Home page 🏠 displays a welcome message and the donor's recent donation requests.
- My Donation Requests Page 🩸 allows donors to view and manage their donation requests.
- Create Donation Request Page 🆕 enables donors to create new donation requests.

### 4.2 Admin Dashboard

- Dashboard Home Page 🏠 displays welcome sections and featured cards with statistics.
- All Users Page 👤 lists all users with filtering options for active/blocked status and user management actions.
- All Blood Donation Request Page 🩸 allows admin to manage all donation requests.
- Content Management Page 📝 lets admin add, publish, and manage blogs.

### 4.3 Volunteer Dashboard

- Dashboard Home Page 🏠 is similar to the Admin Dashboard's home page.
- All Blood Donation Request Page 🩸 allows volunteers to view and update donation requests.
- Content Management Page 📝 is similar to the Admin Dashboard's content management page with restrictions.

## 5. Home Page (public)

- Navbar includes links for donation requests, blog, login, registration before logging in, and dashboard and funding links after logging in.
- Banner encourages users to "Join as a donor" or "Search Donors."
- Featured section designed for relevance.
- Contact Us section includes a contact form and contact number.
- Footer designed to match the website theme with useful links.

## 6. Search page (public)

- Search form includes blood group, district, upazila, and search button.
- Donor list is displayed based on search criteria.

## 7. Blood Donation Requests (public)

- Displays all pending donation requests with relevant details.
- View button allows users to go to the details page of the donation request.

## 8. Blood Donation Details Page (private🔒)

- Displays all information provided during the creation of a donation request.
- Donate button changes the donation status from pending to in progress.

## 8. Blog Page (public)

- Displays all published blogs.
- Optional: Implement search functionality.

## Bonus Section

### 9. Funding Page (private🔒)

- Allows users to give funding for the organization using Stripe payment.
- Displays funding history in a tabular format.

## 10. Responsive

- Ensures the entire website, including the dashboard, is responsive.

## 11. JWT

- Implements JWT on login and protects private APIs with JWT.

## Resources

- Use [this GitHub repository](https://github.com/nuhil/bangladesh-geocode) to find all districts and upazilas data.

