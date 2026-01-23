# Airbnb Clone - Project Development Log

This document tracks all changes made to the project across commits.

---

## Commit 1: project-1 phase-a

### Changes Implemented:
- Initial project setup and structure
- Created basic Express.js server configuration
- Set up EJS templating engine
- Implemented MongoDB connection and Mongoose schemas
- Created Listing model with fields:
  - title
  - description
  - image
  - price
  - location
  - country
- Set up basic routing structure
- Created initial views:
  - `views/layouts/boilerplate.ejs` - Main layout with Bootstrap 5.0.2 CDN integration
  - `views/listings/index.ejs` - Listings display page with card layout
  - `views/includes/navbar.ejs` - Navigation bar
  - `views/includes/footer.ejs` - Footer component
- Integrated Bootstrap 5.0.2 for responsive design
- Added Font Awesome 7.0.1 for icons
- Implemented flexbox grid system using Bootstrap `.row` class for listing cards
- Created custom CSS styling (`/css/style.css`)
- Set up basic CRUD operation routes for listings

---

## Commit 2: Add Phase-1 Part-b

### Changes Implemented:

#### Full CRUD Operations for Listings:

**1. Show Route (View Individual Listing)**
- Created `views/listings/show.ejs` page to display detailed listing information
- Implemented GET route `/listings/:id` to fetch and display single listing
- Added card layout with listing image, title, description, price, location, and country
- Price formatting with Indian Rupee symbol (&#8377;) and locale formatting
- Added Edit and Delete buttons on show page

**2. New Listing Route (Create)**
- Created `views/listings/new.ejs` form page for creating new listings
- Implemented GET route `/listings/new` to display the form
- Implemented POST route `/listings` to handle form submission
- Form includes fields:
  - Title with placeholder text
  - Description (textarea)
  - Price (number input with &#8377; symbol)
  - Country
  - Location
  - All fields marked as required
- Used responsive Bootstrap grid (col-md-4 and col-md-8) for price and country fields
- Redirects to show page after successful creation

**3. Edit Route (Update)**
- Created `views/listings/edit.ejs` form page for editing existing listings
- Implemented GET route `/listings/:id/edit` to display pre-filled edit form
- Implemented PUT route `/listings/:id` using method-override for RESTful update
- Form pre-populated with existing listing data using EJS value attributes
- Added image URL field (not present in new listing form)
- Includes validation options: `runValidators: true` and `new: true`
- Redirects to show page after successful update

**4. Delete Route (Destroy)**
- Implemented DELETE route `/listings/:id` using method-override
- Added delete button with inline form on show page
- Confirmation dialog: "Are you sure you want to delete this listing?"
- Redirects to listings index page after deletion

#### Backend Configuration:
- Added `method-override` package for PUT and DELETE requests via forms
- Configured method-override with query parameter `_method`
- Added `express.urlencoded({ extended: true })` for parsing form data
- Integrated `ejs-mate` as template engine for layout inheritance

#### CSS Enhancements (`public/css/style.css`):
- **Add Button Styling**: `.add-btn` with #fe424d background color
- **Edit Button Styling**: `.edit-btn` with #fe424d background color
- **Show Page Styling**:
  - `.show-img` with fixed height (30vh)
  - `.show-card` with removed left/right padding
- **Footer Fix**: Added `margin-top: auto` to `.footer` class for sticky footer positioning
- Maintained consistent color scheme throughout application

#### View Structure:
- All new pages use `<% layout("/layouts/boilerplate") %>` for consistent layout
- Responsive design with Bootstrap row and column classes
- Proper form structure with Bootstrap form classes (form-label, form-control)
- Consistent spacing with margin and padding utilities (mt-3, mb-3, offset-2, offset-3)

---

## Future Commits

<!-- Add new commits below -->

