# User Guide - JSON API Preview

A comprehensive guide to using the JSON API Preview application for exploring and beautifying JSON API responses from Postman collections.

## 🎯 Overview

JSON API Preview allows you to:
- Upload Postman collection and environment files
- Execute API requests with custom parameters
- View JSON responses in an interactive, searchable tree
- Copy values and paths for easy debugging
- Analyze API response structures

## 📂 File Requirements

### Required Files

#### Postman Collection File (.json)
**Purpose**: Contains your API requests, headers, and configurations

**How to Export from Postman**:
1. Open Postman application
2. Select your collection in the sidebar
3. Click the "..." menu next to the collection name
4. Choose "Export"
5. Select "Collection v2.1" format
6. Click "Export" and save the `.json` file

**File Structure Example**:
```json
{
  "info": {
    "name": "My API Collection",
    "description": "Collection of API endpoints",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Users",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{authToken}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "users"]
        }
      }
    }
  ]
}
```

### Optional Files

#### Environment File (.json)
**Purpose**: Contains variable definitions for your collection

**How to Export from Postman**:
1. Open Postman application
2. Click the gear icon (⚙️) in the top right
3. Select your environment
4. Click "Export" 
5. Save the `.json` file

**File Structure Example**:
```json
{
  "name": "Development Environment",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://api.example.com",
      "enabled": true,
      "type": "default"
    },
    {
      "key": "authToken",
      "value": "your-secret-token",
      "enabled": true,
      "type": "secret"
    }
  ]
}
```

## 🚀 Getting Started

### Step 1: Start the Application
1. Ensure both backend and frontend are running (see [Setup Guide](SETUP.md))
2. Open your browser to `http://localhost:3000`

### Step 2: Upload Files
1. **Upload Collection**: Click "Choose Collection File" and select your Postman collection `.json` file
2. **Upload Environment** (Optional): Click "Choose Environment File" and select your environment `.json` file

**File Upload Tips**:
- Files must be valid JSON format
- Maximum file size: 10MB
- Only `.json` files are accepted
- Environment files are optional but recommended for dynamic requests

### Step 3: Browse Requests
After uploading, you'll see:
- **Left Sidebar**: List of all requests from your collection
- **Main Panel**: Request details and execution area
- **Request Information**: Method, URL, headers, and body preview

## 🔧 Executing Requests

### Basic Request Execution
1. **Select Request**: Click on any request in the left sidebar
2. **Review Details**: Check the method, URL, headers, and body
3. **Configure Parameters**: Modify any variables if needed
4. **Execute**: Click the "Execute Request" button
5. **View Response**: JSON response appears in the interactive viewer

### Parameter Management

#### Using Environment Variables
If you uploaded an environment file, variables are automatically populated:
- `{{baseUrl}}` → `https://api.example.com`
- `{{authToken}}` → `your-secret-token`

#### Custom Parameters
You can override or add new parameters:
1. **Add Parameter**: Click "Add Parameter" 
2. **Set Key/Value**: Enter the parameter name and value
3. **Apply**: Parameters are automatically applied to the request

#### Dynamic Variables
Postman dynamic variables are supported:
- `{{$timestamp}}` → Current Unix timestamp
- `{{$randomInt}}` → Random integer
- `{{$guid}}` → Random GUID/UUID

### Request Types Supported

#### GET Requests
- Query parameters automatically parsed
- Headers applied from collection
- No request body

#### POST/PUT/PATCH Requests
- JSON, form-data, and raw body types supported
- Content-Type headers automatically set
- Variable substitution in request body

#### DELETE Requests
- Path parameters supported
- Authorization headers applied

## 🌳 JSON Response Viewer

### Interactive Features

#### Expand/Collapse Navigation
- **Click arrows** (▶️/▼) to expand/collapse objects and arrays
- **Double-click keys** to expand/collapse
- **Ctrl+Click** to expand all children (Windows/Linux)
- **Cmd+Click** to expand all children (macOS)

#### Search Functionality
1. **Search Box**: Located at the top of the JSON viewer
2. **Search Types**:
   - **Key Search**: Find specific JSON keys
   - **Value Search**: Find specific values
   - **Path Search**: Search full JSON paths
3. **Search Examples**:
   - `user` → Finds all keys containing "user"
   - `"john"` → Finds exact value matches
   - `data.users[0].name` → Finds specific paths

#### Copy Functionality
- **Copy Value**: Click the copy icon next to any value
- **Copy Path**: Click path breadcrumb to copy JSON path
- **Copy Entire Response**: Use the "Copy All" button at the top

### JSON Path Navigation

#### Understanding Paths
JSON paths help you navigate nested structures:
```json
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "profile": {
          "email": "john@example.com"
        }
      }
    ]
  }
}
```

**Paths**:
- `data` → Root data object
- `data.users` → Users array
- `data.users[0]` → First user object
- `data.users[0].name` → User's name
- `data.users[0].profile.email` → User's email

#### Breadcrumb Navigation
- **Click breadcrumb segments** to jump to parent levels
- **Copy path segments** for use in code or documentation

## 🔍 Advanced Features

### Response Analysis

#### Response Metadata
For each request execution, you'll see:
- **Status Code**: HTTP response status (200, 404, 500, etc.)
- **Execution Time**: Time taken to complete the request
- **Response Size**: Size of the JSON response
- **Headers**: All response headers

#### Error Handling
- **Network Errors**: Connection timeout, DNS resolution failures
- **HTTP Errors**: 4xx and 5xx status codes with error details
- **JSON Parsing Errors**: Invalid JSON responses are displayed as text

### Request History
- **Recent Requests**: Last 10 executed requests are saved
- **Quick Re-execute**: Click on history items to re-run requests
- **Parameter History**: Previous parameter values are remembered

### Data Export
- **JSON Export**: Export filtered or search results as JSON
- **CSV Export**: Export tabular data (arrays of objects) as CSV
- **Copy as Code**: Copy requests as cURL, JavaScript, or Python code

## 💡 Tips and Best Practices

### Collection Organization
1. **Group Related Requests**: Use Postman folders to organize requests
2. **Descriptive Names**: Use clear, descriptive names for requests
3. **Documentation**: Add descriptions to requests and parameters

### Environment Management
1. **Multiple Environments**: Create separate environments for dev, staging, prod
2. **Secure Variables**: Use secret variables for sensitive data
3. **Variable Naming**: Use consistent naming conventions (camelCase or snake_case)

### JSON Response Exploration
1. **Start at Root**: Begin exploring from the top-level objects
2. **Use Search**: For large responses, use search to find specific data
3. **Copy Paths**: Copy JSON paths for use in your application code
4. **Expand Strategically**: Don't expand everything at once for large responses

### Performance Tips
1. **Limit Response Size**: Filter API responses when possible
2. **Use Pagination**: For large datasets, use pagination parameters
3. **Close Unused Branches**: Collapse JSON branches you're not exploring

## 🐛 Troubleshooting

### Common Issues

#### File Upload Problems
**Issue**: "Invalid JSON file"
**Solution**: 
- Verify the file is valid JSON using an online JSON validator
- Ensure you exported the collection in v2.1 format from Postman
- Check file size (must be under 10MB)

#### Request Execution Failures
**Issue**: "Request failed" or network errors
**Solutions**:
- Verify the API endpoint is accessible
- Check authentication tokens and headers
- Ensure CORS is properly configured on the target API
- Verify environment variables are correctly set

#### JSON Viewer Issues
**Issue**: JSON not displaying properly
**Solutions**:
- Check if the response is valid JSON
- Try refreshing the page
- For very large responses, try limiting the data returned

#### Variable Substitution Problems
**Issue**: Variables not being replaced (showing `{{variable}}`)
**Solutions**:
- Ensure environment file is uploaded
- Check variable names match exactly (case-sensitive)
- Verify variables are enabled in the environment file

### Performance Issues
**Issue**: Slow response or UI freezing
**Solutions**:
- Limit API response size
- Close unused JSON branches
- Use search instead of expanding large objects
- Consider pagination for large datasets

## 📚 Examples

### Example 1: Basic API Testing
1. Upload a collection with a simple GET request
2. Execute the request without modifications
3. Explore the JSON response structure
4. Copy specific values for use in your application

### Example 2: Authentication Flow
1. Upload collection with login and protected endpoints
2. Execute login request to get auth token
3. Copy the token value
4. Add token as a custom parameter for subsequent requests
5. Execute protected endpoints

### Example 3: Data Analysis
1. Upload collection with data retrieval endpoints
2. Execute requests to get datasets
3. Use search to find specific records
4. Export data as CSV for further analysis

## 🔗 Related Documentation

- [Setup Guide](SETUP.md) - Installation and configuration
- [Development Guide](DEVELOPMENT.md) - Technical details and contributing
- [Main README](../README.md) - Project overview and quick start

## 🆘 Need Help?

If you encounter issues not covered in this guide:
1. Check the [Setup Guide](SETUP.md) for environment issues
2. Review the browser console for JavaScript errors
3. Check the backend logs for API errors
4. Create a GitHub issue with detailed information about the problem