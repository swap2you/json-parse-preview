# Copilot Instructions for JsonParsePreview

## Project Overview
JsonParsePreview is a full-stack JSON API response beautifier and executor designed for Postman collections and environments. It combines a Spring Boot 3.2.0 backend with a React 18.2.0 frontend to parse Postman collection files, execute API requests, and present responses in an interactive, navigable tree structure.

## Current Architecture (Actual Implementation)

### Backend (Spring Boot 3.2.0)
- **ApiController**: Main REST controller at `/api/*` endpoints with CORS for localhost:3000
- **PostmanParserService**: Parses Postman collection and environment JSON files
- **ApiExecutionService**: Executes HTTP requests with parameter substitution
- **DTO Layer**: `ApiResponseDto`, `ExecuteRequestDto`, `RequestSummaryDto` for API communication
- **Model Layer**: `PostmanCollection`, `PostmanEnvironment`, `PostmanItem` for data structures
- Package: `com.jsonpreview.*` (not `com.jsonapipreview.*`)

### Frontend (React 18.2.0 + Tailwind CSS)  
- **App.js**: Main component managing state for requests, responses, and UI modes
- **Sidebar**: Collection and request browser with file upload functionality
- **ParameterInput**: Interactive parameter editing for API requests
- **JsonViewer**: Tree-structured JSON viewer with expand/collapse functionality
- **apiService.js**: Axios-based API client with 30s timeout and multipart upload support

## API Endpoints (Current Implementation)

### File Upload Endpoints
- `POST /api/upload/collection` - Upload Postman collection JSON files
- `POST /api/upload/environment` - Upload Postman environment JSON files  
- `POST /api/upload/json-response` - Upload raw JSON response files for viewing

### Request Execution
- `GET /api/requests` - Get parsed requests from uploaded collection
- `POST /api/executeRequest` - Execute a specific request with parameters
- `GET /api/health` - Health check endpoint

### Key Implementation Details
- Frontend proxy configured for backend at `http://localhost:8080` in package.json
- CORS configured in `@CrossOrigin(origins = "http://localhost:3000")` on controller
- MultipartFile uploads with FormData from frontend
- Request execution supports parameter substitution and custom parameters
- **JSON Upload Feature**: Users can upload any JSON file directly for instant preview without API execution

## Development Workflow (Current Commands)

### Backend (Spring Boot)
```powershell
cd backend
mvn clean install         # Build and test
mvn spring-boot:run      # Run backend on :8080
```

### Frontend (React)
```powershell  
cd frontend
npm install              # Install dependencies
npm start               # Run frontend on :3000 with proxy
npm run build           # Build for production
```

## Critical Code Patterns

### Variable Substitution
- Environment variables loaded from uploaded files
- Custom parameters added via UI override collection defaults
- Parameters passed in `ExecuteRequestDto` with `originalParameters` and `customParameters`

### State Management (Frontend)
- `viewMode` toggles between 'collection' and 'json-response' views
- Auto-selection of first request after collection upload
- Loading states for both file uploads and request execution
- Direct JSON upload switches to json-response mode and displays content immediately

### Error Handling
- Backend uses ResponseEntity with success/error indicators
- Frontend displays errors in UI with `setError()` state
- API timeouts set to 30 seconds in apiService

## Current File Structure (Actual)
```
backend/
  pom.xml                           # Spring Boot 3.2.0, Maven project
  src/main/java/com/jsonpreview/
    JsonPreviewApplication.java     # Main Spring Boot application
    controller/
      ApiController.java           # REST endpoints with @CrossOrigin
    service/
      PostmanParserService.java    # Parse collections and environments
      ApiExecutionService.java     # Execute HTTP requests
    dto/
      ApiResponseDto.java          # API response wrapper
      ExecuteRequestDto.java       # Request execution payload
      RequestSummaryDto.java       # Request metadata with parameters
    model/
      PostmanCollection.java       # Collection data model
      PostmanEnvironment.java      # Environment data model  
      PostmanItem.java            # Request/folder items
    config/
      CorsConfig.java             # CORS configuration

frontend/
  package.json                     # React 18.2.0, Tailwind, Axios
  src/
    App.js                        # Main app with state management
    components/
      Sidebar.jsx                 # Collection browser and file upload
      ParameterInput.jsx          # Parameter editing interface
      JsonViewer.jsx              # JSON response tree viewer
    services/
      apiService.js               # Axios HTTP client configuration

examples/                         # Sample Postman files for testing
docs/                            # Comprehensive documentation
```

## Key Implementation Notes

### Package Structure
- Backend uses `com.jsonpreview.*` package (not `com.jsonapipreview.*`)
- Frontend has both `.jsx` and `.tsx` files - use existing patterns when adding components
- Tailwind CSS configured via `postcss.config.js` and `tailwind.config.js`

### Component Architecture  
- `App.js` centralizes state: `requests`, `selectedRequest`, `apiResponse`, `viewMode`
- Components communicate via props, not context/Redux
- `apiService.js` handles all backend communication with proper error handling

### Development Tips
- Backend auto-restarts with `mvn spring-boot:run`
- Frontend proxy in `package.json` routes `/api/*` to `:8080`
- Check `examples/` directory for valid test files
- CORS is pre-configured for localhost development

## Testing & Debugging
- Use `/api/health` endpoint to verify backend connectivity
- Upload `examples/sample-api-collection.json` for quick testing
- Frontend state logged to browser console during development
- Backend logs show request execution details and errors

---
*This file reflects the current implemented state of JsonParsePreview with full-stack architecture and comprehensive feature set. Refer to `/docs/` for detailed setup and usage instructions.*