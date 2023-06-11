# techical-test-dealls
This repository contains the code for the Service Login and SignUp API for a Dating Mobile App. Written using Typescript with Framework ExpressJS, which provides endpoints for user authentication and registration. 

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Service Signin and Sign Up API is a RESTful web service that allows users to sign in and sign  Up for an application or service. It provides secure authentication and registration endpoints, allowing developers to integrate user management functionality into their applications.

## Installation

To run the Service Signin and Sign Up API locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/fahmiw/techical-test-dealls
   ```

2. Install the dependencies:

   ```shell
   cd technical-test-dealls
   npm install
   ```

3. Configure the environment variables:

   Rename a `.env.example` file to `.env` in the root directory and provide the necessary environment variables. For example:

   ```plaintext
   PORT=8080
   MONGO_DATABASE=localdbtest
   MONGO_HOST=localhost
   MONGO_USER=
   MONGO_PASSWORD=
   MONGO_PORT=27017
   ```

4. Start the server:

   ```shell
   npm start
   ```

The API should now be running locally on the specified port.

## Usage

To use the Service Signin and Sign Up API, send HTTP requests to the appropriate endpoints. The API supports both JSON and form-urlencoded request bodies, and returns JSON responses.

## Endpoints

The following endpoints are available in the API:

- `POST /api/signup`: Creates a new user account.
   Example Request:
   ```json
   {
      "email":"example@gmail.com",
      "telphone":"083xxxxxxxx",
      "fullname":"Edward Jones",
      "description": "I'm from Norway",
      "gender":0,
      "birthday":"2023-06-09T11:10:24.845Z",
      "image_file":"{{file format}}",
      "password":"password123"
   }
   ```

   Example Response:
   ```json
   {
    "fullname": "Edward Jones",
    "email": "example@gmail.com",
    "telphone": 83xxxxxxxx,
    "description": "I'm from Norway",
    "image_file": "profile-111529181.jpg",
    "birthday": "2023-06-09T11:10:24.845Z",
    "gender": false,
    "is_subcribe": false,
    "authentication": {
        "password": "76890985bd9d5b3991b4531709e37d71f7fef1521f45fa88c31e8bba44f02431",
        "salt": "f/x+dC1BYZatcwBULlPsYJoKFwPc7I1EHJgWwq2kkJVv3J+C/LB8Z4ras3zxP+5+c7hjMw/dX0ZbjsoWO1W8Z+PmsghhYaIh7nn+/vCZKcwLacJLI1pV9hX1qzbn1JUnXMocYavVyVLyZNarW9G+Q/bDP787oYEWIN4Ll//e9kA="
    },
    "_id": "64847e2303c8da940ee3f890",
    "__v": 0
   }
   ```
- `POST /api/login`: Authenticates a user and returns an access token.
   Example Request:
   ```json
   {
    "email": "example@gmail.com",
    "password": "password123"
   }
   ```

   Example Response:
   ```json
   {
    "fullname": "Edward Jones",
    "email": "example@gmail.com",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYWx0IjoiZi94K2RDMUJZWmF0Y3dCVUxsUHNZSm9LRndQYzdJMUVISmdXd3Eya2tKVnYzSitDL0xCOFo0cmFzM3p4UCs1K2M3aGpNdy9kWDBaYmpzb1dPMVc4WitQbXNnaGhZYUloN25uKy92Q1pLY3dMYWNKTEkxcFY5aFgxcXpibjFKVW5YTW9jWWF2VnlWTHlaTmFyVzlHK1EvYkRQNzg3b1lFV0lONExsLy9lOWtBPSIsInBheWxvYWQiOiI2NDg0N2UyMzAzYzhkYTk0MGVlM2Y4OTAiLCJpYXQiOjE2ODY0MDUyMTgsImV4cCI6MTY4NjQwNTIxOX0.KgLA5ULVenozsqkdUtyG6m9sgmn388rc6iLfVYdJDtE"
   }
   ```

## Authentication

The Service Login and Sign Up API uses token-based authentication. After successful sign-in, the API returns an access token that should be included in the `Authorization` header of subsequent requests as a bearer token.

Example:

```plaintext
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Ensure the access token is kept secure and sent with every authenticated request.

## Error Handling

The API follows standard HTTP status codes for indicating success or failure of a request. In case of an error, the API returns a JSON response with an appropriate error message and status code.

For example:

```json
{
  "message": "Invalid credentials",
  "status": 401
}
```

Refer to the API documentation for a list of possible error responses and their meanings.

## Contributing

Contributions to the Service Login and Sign Up API are welcome. If you find a bug or have a suggestion for improvement, please create an issue or submit a pull request with your changes.

Before contributing, please read the [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software according to

 the terms of the license.
