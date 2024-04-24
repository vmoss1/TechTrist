# TechTrist

# Check out my live site! https://techtrist.onrender.com

##

This is tech-themed social media website inspiried by Pinterest exclusively dedicated to technology-related content. Users can discover, save, and create pins/boards, articles related to various tech topics such as software development, gadgets, programming languages, artificial intelligence, and cybersecurity. They can create boards to organize their saved content and follow other user pins. This platform offers features like search , create and explore.

# Search Bar Preview

## Implemented a function that filtered the state array as it was being queried, filtering by the word and or letter that was on changed while something was being typed in the search input.

https://github.com/vmoss1/TechTrist/assets/142066227/0f69f6a8-7091-43d5-9abe-6d4ab62a00a6
<video controls src="images/search-bar.mp4" title="Title"></video>

# Single pin preview - add/delete comment and edit pin and favorite

https://github.com/vmoss1/TechTrist/assets/142066227/c9caa5bc-86db-451a-984f-09285111c355
<video controls src="images/comment:edit.mp4" title="Title"></video>

# Toggle Theme preview

## Used context and local storage to persist and grab the theme that is being set and wrapped as a provider so all compoenents can have access to it.

<video controls src="images/toggletheme.mp4" title="Title"></video>
https://github.com/vmoss1/TechTrist/assets/142066227/0245ab7c-d89b-4169-b04f-644f9885c383

# Technologies Used

### Backend:

- JavaScript
- Express.js (Node.js framework for server-side development)
- Sequelize (ORM for interacting with SQL databases)
- Developed with Node + Express to enhance project efficiency by maintaining a consistent programming language across both front and backend, reducing context switching, and enforcing a REST API.
- Implemented bcrypt to hash passwords before storing them in our database. This approach protects against common vulnerabilities.
- Employed secure CSRF protection for HTTP requests in a React application using js-cookie for cookie management and custom fetch functions to handle CSRF tokens, enhancing application security against cross-site request forgery attacks
- Enforced HTTPS to encrypt data transmitted between the client and the server, protecting the integrity and privacy.
- Utilized JSON Web Tokens (JWT) for managing user sessions, which allowed us to maintain stateless authentication across HTTP requests, enhancing security by minimizing potential exposure to attacks.

### Frontend:

- React.js (JavaScript library for building user interfaces)
- Redux (State management library for managing application state)
- React Router (Library for handling routing in React applications)
- Implemented React library Skeleton for smoother UI page loading
  Additional Tools:

  -NPM (Node Package Manager for managing project dependencies)

- Git (Version control system for tracking changes in code)
- ESLint (JavaScript linter for ensuring code consistency and identifying errors)
- Babel (JavaScript compiler for transpiling modern JavaScript code to older versions for browser compatibility)

# Future Developement

- Implementing followers and followings
- Video uploads for pins

# Wiki Links

- Database Schema
- https://github.com/vmoss1/TechTrist.wiki.git

- Features List
- https://github.com/vmoss1/TechTrist.wiki.git

- User Stories
- https://github.com/vmoss1/TechTrist.wiki.git

- WireFrame
- https://github.com/vmoss1/TechTrist.wiki.git

## API Documentation

<!-- Insert discussion of two features to show off teams technical abilities -->

### Get the current user's boards

Returns the board created by the current user.

- Require Authentication: True
- Request

  - Method: GET
  - URL: /api/boards/current
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "currentBoards": [
        {
          "id": 1,
          "title": "Cool Stuffs",
          "userId": 1,
          "Pins": [
            {
              "id": 1,
              "title": "Ultimate Gaming Console Setup",
              "userId": 1,
              "description": "I absolutely love my gaming console setup! It's equipped with the latest gaming console, high-resolution monitor, and surround sound system. It's a gamer's dream come true.",
              "imageUrl": "https://tech-trist-open.s3.us-east-2.amazonaws.com/seed1.jpg",
              "category": "Gaming Consoles",
              "createdAt": "2024-04-07T14:08:29.257Z",
              "BoardPin": {
                "boardId": 1,
                "pinId": 1
              }
            }
          ]
        }
      ]
    }
    ```

### Create a board

Creates and returns a new board.

- Require Authentication: True
- Request

  - Method: (GET & ) POST
  - URL: /api/boards
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "New"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

        ```json

    {
    "id": 16,
    "userId": 1,
    "title": "New",
    "updatedAt": "2024-04-23T23:53:34.898Z",
    "createdAt": "2024-04-23T23:53:34.898Z"
    }

    ```

    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "title": "Board title is required"
      }
    }
    ```

    ### Edit a Board

Updates and returns an existing Board.

- Require Authentication: True
- Require proper authorization: Board must belong to the current user
- Request

  - Method: (GET & ) PUT
  - URL: /api/boards/:boardId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "New"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 2,
      "user_id": 1,
      "title": "New"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "message": "Board couldn't be found"
      }
    }
    ```

    ### Delete a Board

Deletes an existing board.

- Require Authentication: true
- Require proper authorization: Board must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/boards/:boardId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

    - Error response: Couldn't find a Board with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Board couldn't be found"
    }
    ```

# Find me

- github: https://github.com/vmoss1
- linkedin: www.linkedin.com/in/veronica-moss
- portfolio: https://vmoss1.github.io/
