# AI Agent Prompt - JSON API Preview

This document contains a comprehensive prompt that can be used by any AI coding agent (GitHub Copilot, Claude, ChatGPT, etc.) to recreate the entire JSON API Preview project from scratch.

## 🤖 Complete AI Agent Prompt

Copy and paste the following prompt to any AI coding agent to recreate this entire project:

---

**PROMPT START:**

You are an expert full-stack developer. I need you to create a complete web application called "JSON API Preview" that allows users to upload Postman collection and environment files, execute API requests, and view JSON responses in an interactive, beautified tree structure.

## Project Requirements

### Core Functionality
1. **File Upload System**: Upload Postman collection (.json) and environment (.json) files
2. **Request Execution**: Execute HTTP requests from uploaded collections with parameter substitution
3. **Interactive JSON Viewer**: Display API responses in an expandable/collapsible tree with search functionality
4. **Parameter Management**: Allow users to configure and override environment variables
5. **Copy Functionality**: Copy JSON values, paths, and entire responses

### Technical Stack
- **Backend**: Java 17 + Spring Boot 3.2.0 + Maven
- **Frontend**: React 18.2.0 + Tailwind CSS + Create React App
- **HTTP Client**: Apache HttpClient 5.x for backend API calls
- **JSON Processing**: Jackson (FasterXML) for parsing
- **Development Tools**: Hot reload for both frontend and backend

### Architecture Requirements
- **Full-Stack Application**: Separate backend and frontend applications
- **RESTful API**: Clean REST endpoints for file upload and request execution
- **CORS Configuration**: Enable cross-origin requests between frontend and backend
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback

## Implementation Details

### Backend (Spring Boot)

#### Project Structure
```
backend/
├── src/main/java/com/jsonpreview/
│   ├── JsonParsePreviewApplication.java    # Main Spring Boot class
│   ├── config/WebConfig.java               # CORS configuration
│   ├── controller/                         # REST API endpoints
│   │   ├── CollectionController.java       # Collection upload
│   │   ├── EnvironmentController.java      # Environment upload
│   │   └── RequestController.java          # Request execution
│   ├── dto/                               # Data transfer objects
│   │   ├── ApiResponseDto.java
│   │   ├── ExecuteRequestDto.java
│   │   └── RequestSummaryDto.java
│   ├── model/                             # Postman data models
│   │   ├── PostmanCollection.java
│   │   ├── PostmanEnvironment.java
│   │   └── PostmanItem.java
│   └── service/                           # Business logic
│       ├── ApiExecutionService.java       # HTTP request execution
│       └── PostmanParserService.java      # File parsing
├── src/main/resources/application.yml      # Spring configuration
└── pom.xml                                # Maven dependencies
```

#### Key Dependencies (pom.xml)
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<properties>
    <java.version>17</java.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.httpcomponents.client5</groupId>
        <artifactId>httpclient5</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
</dependencies>
```

#### REST API Endpoints
1. `POST /api/collections/upload` - Upload Postman collection file
2. `POST /api/environments/upload` - Upload environment file  
3. `GET /api/collections/requests` - Get all requests from collection
4. `POST /api/requests/execute` - Execute specific request with parameters

#### Core Services
1. **PostmanParserService**: Parse collection and environment JSON files into Java objects
2. **ApiExecutionService**: Execute HTTP requests with variable substitution using HttpClient5

### Frontend (React)

#### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── JsonViewer.jsx      # Interactive JSON tree viewer
│   │   ├── Sidebar.jsx         # Request navigation sidebar
│   │   └── ParameterInput.jsx  # Parameter configuration
│   ├── App.js                  # Main application component
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind CSS styles
├── public/index.html           # HTML template
├── package.json               # Dependencies and scripts
└── tailwind.config.js         # Tailwind configuration
```

#### Key Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  },
  "proxy": "http://localhost:8080"
}
```

#### Core Components
1. **App.js**: Main application with state management for collections, environments, and responses
2. **JsonViewer.jsx**: Recursive JSON renderer with expand/collapse, search, and copy functionality
3. **Sidebar.jsx**: Request browser with search and selection
4. **ParameterInput.jsx**: Dynamic parameter configuration interface

### Specific Implementation Requirements

#### Postman File Support
- **Collection Format**: Support Postman Collection v2.1.0 schema
- **Environment Format**: Support Postman environment variable format
- **Variable Substitution**: Replace `{{variable}}` placeholders in URLs, headers, and bodies
- **Request Types**: Support GET, POST, PUT, DELETE, PATCH methods

#### JSON Viewer Features
- **Tree Structure**: Nested objects and arrays with expand/collapse
- **Search Functionality**: Search keys and values with highlighting
- **Copy Features**: Copy individual values, JSON paths, and entire objects
- **Performance**: Handle large JSON responses efficiently
- **Syntax Highlighting**: Color-coded JSON with proper indentation

#### Error Handling
- **File Validation**: Validate uploaded files are valid JSON
- **Network Errors**: Handle API request failures gracefully
- **User Feedback**: Loading states, error messages, success notifications
- **CORS Issues**: Proper CORS configuration and error handling

### Development Setup Requirements
1. **Hot Reload**: Both backend and frontend should support hot reload during development
2. **Port Configuration**: Backend on 8080, frontend on 3000 with proxy
3. **Build Process**: Maven for backend, npm for frontend
4. **Environment Variables**: Configurable ports and API endpoints

### File Upload Specifications
- **Maximum File Size**: 10MB limit for uploaded files
- **File Types**: Only accept .json files
- **Multipart Upload**: Use multipart/form-data for file uploads
- **Validation**: Validate JSON structure matches Postman format

### API Response Format
```json
{
  "statusCode": 200,
  "headers": {"Content-Type": "application/json"},
  "responseBody": {...},
  "rawResponse": "...",
  "executionTimeMs": 1234
}
```

## Styling Requirements
- **Design System**: Use Tailwind CSS for consistent styling
- **Color Scheme**: Modern, clean interface with proper contrast
- **Responsive**: Mobile-friendly responsive design
- **Icons**: Use Lucide React for consistent iconography
- **Loading States**: Spinners and skeleton loaders for better UX

## Testing Requirements
- **Backend Tests**: Unit tests for services and integration tests for controllers
- **Frontend Tests**: Component tests using React Testing Library
- **File Examples**: Include sample Postman collection and environment files

## Documentation Requirements
Create comprehensive documentation including:
1. **README.md**: Project overview, quick start, and basic usage
2. **SETUP.md**: Detailed installation and environment setup
3. **USER_GUIDE.md**: Step-by-step usage instructions with examples
4. **DEVELOPMENT.md**: Technical architecture and development guidelines

## Success Criteria
The application should allow users to:
1. Upload a Postman collection and optionally an environment file
2. Browse and select requests from the collection
3. Configure parameters and execute requests
4. View responses in an interactive JSON tree
5. Search, expand/collapse, and copy data from responses
6. Handle errors gracefully with clear user feedback

Build this as a complete, production-ready application with proper error handling, documentation, and user experience. Focus on clean, maintainable code and comprehensive functionality.

**PROMPT END**

---

## 🔧 Usage Instructions for AI Agents

### For GitHub Copilot
1. Open VS Code in an empty directory
2. Create a new chat session in GitHub Copilot
3. Paste the entire prompt above
4. Follow the generated code and instructions
5. Use additional prompts for clarification as needed

### For Claude/ChatGPT
1. Start a new conversation
2. Paste the complete prompt
3. Ask for specific implementation details if needed
4. Request clarification on any unclear requirements
5. Use follow-up prompts to refine the implementation

### For Other AI Coding Assistants
1. Use the prompt as a comprehensive specification
2. Break down into smaller tasks if the AI has context limits
3. Focus on one component at a time (backend first, then frontend)
4. Verify each component works before moving to the next

## 📋 Additional Context for AI Agents

### Expected File Structure After Creation
```
JsonParsePreview/
├── backend/                    # Spring Boot application
├── frontend/                   # React application  
├── docs/                      # Documentation files
│   ├── SETUP.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPMENT.md
│   └── AI_AGENT_PROMPT.md
├── examples/                  # Sample Postman files
├── .github/
│   └── copilot-instructions.md
└── README.md
```

### Key Implementation Notes
1. **CORS Configuration**: Essential for frontend-backend communication
2. **Variable Substitution**: Core feature - replace {{variables}} in requests
3. **File Upload**: Handle multipart/form-data properly
4. **JSON Tree Rendering**: Recursive component with performance optimization
5. **State Management**: Use React hooks effectively for complex state

### Common Issues to Address
1. **Java Version Compatibility**: Ensure Java 17+ for Spring Boot 3.2.0
2. **CORS Errors**: Proper WebConfig setup with allowed origins
3. **File Size Limits**: Configure Spring Boot multipart settings
4. **JSON Parsing**: Handle invalid JSON gracefully
5. **Memory Management**: Efficient handling of large JSON responses

### Testing the Implementation
1. **Backend**: Test with curl or Postman for each endpoint
2. **Frontend**: Verify file upload, request execution, and JSON display
3. **Integration**: Test complete flow from file upload to response display
4. **Error Handling**: Test with invalid files and network errors

This prompt should enable any AI coding agent to create a fully functional JSON API Preview application with all the features and requirements specified.