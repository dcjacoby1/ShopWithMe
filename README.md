## GameShop - Ecommerce Site for your Favorite Games

## Project Info

- Project Repo: https://github.com/dcjacoby1/ShopWithMe
- LinkedIn: https://www.linkedin.com/in/dan-jacoby/
- Mock Screens: https://www.figma.com/design/sx8zKTFHjojNItAM6cbwbz/Wireframes?node-id=0-1&t=JU0Jp9Syzh2hQiEw-0
- Entity-Relationship Diagram (ERD): https://dbdiagram.io/d/GameShop-668ffd369939893daeb00df2

## Introduction

As a competitor, games have always been a focal point of my life.
Whether its a board game, a sport, or a video game - I play to win.
GameShop is an online shop dedicated to those that share that same joy of winning by offering your favorite games in one central hub!

## User Stories

As a user I can...
- filter products by name and category
- navigate through products and orders using pagination
- add products to my cart
- edit my cart quantity
- view the price of each item in the cart
- view the total price and quantity of the cart
- cancel an entire cart
- place an order of my carted items
- view all my previous order details
- edit my user profile
- delete my profile

## Main Requirements

- User can navigate through the platform when logged out
- When a user's cart is empty, there should be an empty cart message
- When a user has no past orders, there should be a no orders message
- When a user is logged out the Orders, Cart, and Account page should display
  that user must be signed in to use the page with a sign in button
- When a user is logged out, the add to cart button will route them to sign in page
- User can toggle between Sign In and Create Account
- Cart count in navigation bar should go to zero if user is logged out

## Future Deliverables

- Mock payment flow using credit card (Stripe Integration)
- Mock shipping flow with ability to edit placed orders

## Project Takeaways

This project was a great opportunity to connect my frontend skills to my backend skills.
I polished many new skills while building this project:

Frontend (Javascript and React):
- Authentication using Formik for Sign In/Sign Up
- Authorization using session (cookies in Flask)
- Conditional rendering of pages on the frontend
- Routing to render the proper pages based on the users actions
- Responsive frontend design

Backend (Python and Flask):
- Creating Models in Flask with relationships between classes
- Mapping models to the database using SQLAlchemy
- Building Rest APIs with proper error messages 
