Install the required dependencies:


    Run the following command to install the dependencies:

        npm install

    Configure the database:
        Make sure you have MongoDB installed and running on your machine or have access to a remote MongoDB server.
        Update the MongoDB connection details in the mongoose.connect() function located in the file where this API code is being used.

API Endpoints

The API provides the following endpoints for managing blogs:
Create a Blog

    Endpoint: POST /blogs
    Description: Creates a new blog with the provided data.
    Request Body:
        title (required): The title of the blog (string).
        body (required): The body/content of the blog (string).
        category (required): The category of the blog (string).
    Response:
        Status: 200 (OK) if the blog is created successfully.
        Status: 400 (Bad Request) if any of the required fields are missing.
        Status: 500 (Internal Server Error) if an error occurs during the creation process.
        Body: JSON object containing the status, message, and data (created blog) if successful.

Get All Blogs

    Endpoint: GET /blogs
    Description: Retrieves all the available blogs.
    Query Parameters:
        None
    Response:
        Status: 200 (OK) if the blogs are retrieved successfully.
        Status: 404 (Not Found) if no blogs are found.
        Status: 500 (Internal Server Error) if an error occurs during the retrieval process.
        Body: JSON object containing the status and data (array of blogs) if successful.

Get a Blog

    Endpoint: GET /blogs/:id
    Description: Retrieves a specific blog by its ID.
    Path Parameters:
        id (required): The ID of the blog to retrieve.
    Response:
        Status: 200 (OK) if the blog is retrieved successfully.
        Status: 400 (Bad Request) if the provided blog ID is invalid.
        Status: 404 (Not Found) if the blog is not found.
        Status: 500 (Internal Server Error) if an error occurs during the retrieval process.
        Body: JSON object containing the status and data (blog) if successful.

Update a Blog

    Endpoint: PUT /blogs/:id
    Description: Updates a specific blog with new data.
    Path Parameters:
        id (required): The ID of the blog to update.
    Request Body:
        title: The new title of the blog (string).
        body: The new body/content of the blog (string).
        category: The new category of the blog (string).
    Response:
        Status: 200 (OK) if the blog is updated successfully.
        Status: 400 (Bad Request) if the provided blog ID is invalid or any required fields are missing.
        Status: 404 (Not Found) if the blog to update is not found.
        Status: 500 (Internal Server Error) if an error occurs during the update process.
        Body: JSON object containing the status and data (updated blog) if successful.

Delete a Blog

    Endpoint: `DELETE /blogs/:id
