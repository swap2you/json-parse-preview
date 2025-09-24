# Example Files for JSON API Preview

This directory contains sample files to help you get started with the JSON API Preview application.

## Files Included

### 1. sample-api-collection.json
A complete Postman collection example featuring:
- **Multiple HTTP Methods**: GET, POST, PUT, DELETE requests
- **Authentication**: Bearer token authentication headers
- **Variable Usage**: Environment variables in URLs, headers, and request bodies
- **Request Bodies**: JSON payloads with variable substitution
- **Query Parameters**: Pagination and search parameters
- **Collection Scripts**: Pre-request and test scripts at collection level

**Endpoints Included:**
- User management (CRUD operations)
- Post management with pagination
- Search functionality
- Various parameter combinations

### 2. sample-environment.json
A comprehensive environment file containing:
- **API Configuration**: Base URL, API version, timeout settings
- **Authentication**: Bearer token (marked as secret type)
- **User Data**: Sample user information for testing
- **Pagination**: Limit and offset parameters
- **Content Data**: Sample post titles, content, tags
- **Search Parameters**: Query strings and sorting options

### 3. sample-json-response.json
A complex JSON response file demonstrating:
- **Nested Objects**: Multi-level data structures with user profiles and projects
- **Arrays**: Lists of users, projects, skills, and team members
- **Mixed Data Types**: Strings, numbers, booleans, null values
- **Pagination Metadata**: Standard API pagination information
- **Complex Nesting**: Deep object hierarchies with coordinates, preferences, and metrics
- **API Metadata**: Request information, processing times, and related links

## How to Use These Files

### For Testing the Application

#### Collection Mode
1. Upload the sample collection (`sample-api-collection.json`)
2. Optionally upload the environment file (`sample-environment.json`)
3. Execute requests to see JSON response parsing in action

#### Direct JSON Response Mode
1. Upload the sample JSON response (`sample-json-response.json`) directly
2. Explore the complex nested structure using the interactive tree viewer
3. Test search functionality across deep object hierarchies

### For Development
1. Use as reference for supported Postman collection formats
2. Test edge cases with complex nested variables
3. Validate parsing of different request types and parameters
4. Ensure proper handling of authentication headers

### For Documentation
1. Reference these examples in user guides
2. Show users the expected file structure
3. Demonstrate variable usage patterns
4. Illustrate collection organization best practices

## File Requirements

### Required Fields in Collections:
- `info.name`: Collection name
- `info.schema`: Must be Postman Collection v2.1.0 format
- `item[]`: Array of requests or folders
- `item[].request.method`: HTTP method
- `item[].request.url`: Request URL (string or object format)

### Optional Fields in Collections:
- `info.description`: Collection description
- `item[].request.header[]`: Request headers
- `item[].request.body`: Request body (for POST/PUT)
- `event[]`: Collection-level scripts
- `variable[]`: Collection-level variables

### Required Fields in Environments:
- `name`: Environment name
- `values[]`: Array of environment variables
- `values[].key`: Variable name
- `values[].value`: Variable value

### Optional Fields in Environments:
- `values[].type`: Variable type ("default" or "secret")
- `values[].enabled`: Whether variable is active
- `values[].description`: Variable description
- `id`: Environment ID
- `_postman_variable_scope`: Scope identifier

## Variable Substitution Examples

The sample files demonstrate various variable usage patterns:

```
URL Variables: {{baseUrl}}/api/{{apiVersion}}/users/{{userId}}
Header Variables: Bearer {{authToken}}
Body Variables: {"name": "{{userName}}", "active": {{userActive}}}
Query Parameters: ?limit={{pageLimit}}&offset={{pageOffset}}
```

## Authentication Patterns

Examples of different authentication methods:
- Bearer Token: `Authorization: Bearer {{authToken}}`
- API Key: `X-API-Key: {{apiKey}}`
- Basic Auth: Encoded in headers or auth object

## Testing Different Response Types

Use these endpoints to test various JSON structures:
- Simple objects (user data)
- Arrays (user lists, posts)
- Nested objects (user with embedded data)
- Large datasets (paginated responses)
- Search results (filtered data)

## Customization

Feel free to modify these files for your specific needs:
1. Change the `baseUrl` to point to your API
2. Update authentication tokens and methods
3. Add your own endpoints and parameters
4. Include additional variables for your use cases

## Validation

Both files are valid according to their respective schemas:
- Collection: Postman Collection Format v2.1.0
- Environment: Postman Environment Format

You can validate these files using:
- Postman application (import feature)
- Online JSON validators
- Postman Collection SDK
- The JSON API Preview application itself