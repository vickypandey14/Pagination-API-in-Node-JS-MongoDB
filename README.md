# Pagination API in Node.js with MongoDB

This repository contains the source code for a Pagination API built using Node.js and MongoDB. Pagination is a common requirement for web applications dealing with large datasets. It allows users to navigate through data in smaller, more manageable chunks.

## Features

- **Pagination**: Efficiently split large sets of data into pages.
- **MongoDB Integration**: Utilize MongoDB as the database backend.
- **Reusable Middleware**: Implement reusable middleware functions to handle pagination logic.
- **RESTful API**: Expose endpoints to retrieve paginated data.
- **Enhanced Navigation**: Include pagination metadata in API responses for improved navigation.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vickypandey14/Pagination-API-in-Node-JS-MongoDB.git
   ```

2. Install dependencies:

   ```bash
   cd Pagination-API-in-Node-JS-MongoDB
   npm install
   ```

3. Configure MongoDB:

   - Ensure MongoDB is installed and running locally.
   - Update the MongoDB connection string in the code if necessary.

4. Start the server:

   ```bash
   npm run devStart
   ```

## Usage

Once the server is running, you can access the API endpoints to retrieve paginated data. Here are the available endpoints:

- `/users`: Get paginated user data.
  - Query parameters: `page` (current page number), `limit` (number of items per page)

## Example

To fetch user data, you can make a GET request to the `/users` endpoint:

```http
GET http://localhost:3000/users?page=1&limit=10
```

This will retrieve the first page of users with 10 users per page.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **[Vivek Pandey](https://github.com/vickypandey14)**

---