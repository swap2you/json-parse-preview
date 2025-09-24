# JsonParsePreview - Complete Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (JDK 17.0.12 or higher)
- **Node.js 18+** and npm
- **Maven 3.8+**
- **Git** (optional)

### Environment Setup
```powershell
# Set JAVA_HOME (Windows)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17.0.12"
setx JAVA_HOME "C:\Program Files\Java\jdk-17.0.12"

# Verify Java installation
java -version
javac -version
```

### 1. Clone or Download Project
```bash
git clone <repository-url>
cd JsonParsePreview
```

### 2. Backend Setup (Spring Boot)
```powershell
cd backend
mvn clean install
mvn spring-boot:run
```
Backend will start on: http://localhost:8080

### 3. Frontend Setup (React)
```powershell
cd frontend
npm install
npm start
```
Frontend will start on: http://localhost:3000

## 📁 Project Structure

```
JsonParsePreview/
├── README.md                           # Main project documentation
├── SETUP.md                           # This file - detailed setup guide
├── start-backend.bat                  # Windows batch script to start backend
├── start-frontend.bat                 # Windows batch script to start frontend
├── test-simple.json                   # Sample JSON for testing
├── 
├── backend/                           # Spring Boot 3.2.0 Backend
│   ├── pom.xml                        # Maven configuration (Java 17)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jsonpreview/
│   │   │   │   ├── JsonPreviewApplication.java    # Main Spring Boot app
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java            # CORS configuration
│   │   │   │   ├── controller/
│   │   │   │   │   └── ApiController.java         # REST API endpoints
│   │   │   │   ├── dto/                           # Data Transfer Objects
│   │   │   │   │   ├── ApiResponseDto.java
│   │   │   │   │   ├── ExecuteRequestDto.java
│   │   │   │   │   └── RequestSummaryDto.java
│   │   │   │   ├── model/                         # Domain models
│   │   │   │   │   ├── PostmanCollection.java
│   │   │   │   │   ├── PostmanEnvironment.java
│   │   │   │   │   └── PostmanItem.java
│   │   │   │   └── service/                       # Business logic
│   │   │   │       ├── ApiExecutionService.java
│   │   │   │       └── PostmanParserService.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                                  # Unit tests
│   └── target/                                    # Compiled classes
│
├── frontend/                          # React 18.2.0 Frontend  
│   ├── package.json                   # NPM dependencies
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── public/
│   │   └── index.html                # HTML template
│   ├── src/
│   │   ├── index.js                  # React app entry point
│   │   ├── index.css                 # Global styles
│   │   ├── App.js                    # Main React component
│   │   ├── components/               # Reusable React components
│   │   │   ├── Sidebar.jsx           # Modern sidebar with tabs
│   │   │   ├── JsonViewer.jsx        # JSON tree viewer
│   │   │   └── ParameterInput.jsx    # Parameter input form
│   │   ├── services/
│   │   │   └── apiService.js         # API client (Axios)
│   │   └── types/
│   │       └── api.ts                # TypeScript type definitions
│   └── build/                        # Production build output
│
├── docs/                             # Comprehensive documentation
│   ├── SETUP.md                      # Detailed setup instructions
│   ├── DEVELOPMENT.md               # Development guidelines
│   ├── USER_GUIDE.md                # End-user documentation
│   └── AI_AGENT_PROMPT.md           # AI agent guidance
│
└── examples/                         # Sample files for testing
    ├── README.md
    ├── sample-api-collection.json    # Sample Postman collection
    ├── sample-environment.json       # Sample environment file
    ├── sample-json-response.json     # Sample JSON response
    ├── vehicle-api-collection.json   # Complex API example
    └── vehicle-api-environment.json  # Environment variables
```

## 🔧 Development Workflow

### Backend Development
```powershell
cd backend
mvn clean compile                      # Compile Java code
mvn test                              # Run unit tests
mvn spring-boot:run                   # Start development server
mvn package                           # Build JAR file
```

### Frontend Development
```powershell
cd frontend
npm install                           # Install dependencies
npm start                            # Start development server
npm run build                        # Build for production
npm test                             # Run tests
```

## 🌟 Key Features

### 1. **Multi-Format File Upload**
- **Postman Collections**: Upload and parse .json collection files
- **Environment Files**: Support for Postman environment variables
- **Raw JSON Responses**: Direct JSON file upload for instant preview

### 2. **Modern UI Components**
- **Tabbed Interface**: Upload and Controls tabs for better UX
- **Interactive JSON Viewer**: Expandable tree structure with syntax highlighting
- **Modern Styling**: Gradient backgrounds, smooth animations, hover effects

### 3. **API Request Execution**
- **Parameter Substitution**: Environment variables and custom parameters
- **HTTP Methods**: Support for GET, POST, PUT, DELETE requests
- **Real-time Execution**: Execute requests and view responses instantly

### 4. **Developer Experience**
- **Hot Reload**: Both backend and frontend support live reloading
- **CORS Configured**: Pre-configured for localhost development
- **Error Handling**: Comprehensive error messages and validation

## 🔄 API Endpoints

### File Upload
- `POST /api/upload/collection` - Upload Postman collection
- `POST /api/upload/environment` - Upload environment file
- `POST /api/upload/json-response` - Upload raw JSON response

### Request Management
- `GET /api/requests` - Get parsed requests from collection
- `POST /api/executeRequest` - Execute API request with parameters

### Health Check
- `GET /api/health` - Backend health status

## 🛠️ Configuration

### Backend Configuration (`application.properties`)
```properties
server.port=8080
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Frontend Configuration (`package.json`)
```json
{
  "proxy": "http://localhost:8080",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

## 🧪 Testing

### Sample Files
Use the files in the `examples/` directory:
1. **sample-api-collection.json** - Basic API collection
2. **vehicle-api-collection.json** - Complex API with multiple endpoints
3. **sample-json-response.json** - Sample JSON response for direct upload

### Testing Workflow
1. Start both backend and frontend servers
2. Upload a sample collection file
3. Select a request from the sidebar
4. Execute the request and view the response
5. Try uploading a JSON response file directly

## 🔍 Troubleshooting

### Common Issues

**Backend won't start:**
- Verify Java 17 is installed and JAVA_HOME is set
- Check if port 8080 is available
- Run `mvn clean install` to resolve dependencies

**Frontend compilation errors:**
- Delete `node_modules` and run `npm install` again
- Check Node.js version (requires 18+)
- Verify proxy configuration in package.json

**File upload failures:**
- Check file size (max 10MB)
- Verify JSON file format is valid
- Check browser console for detailed errors

**CORS errors:**
- Ensure backend is running on port 8080
- Verify CORS configuration in `CorsConfig.java`
- Check frontend proxy configuration

### Debug Commands
```powershell
# Backend logs
cd backend && mvn spring-boot:run --debug

# Frontend with verbose logging
cd frontend && npm start --verbose

# Check running processes
netstat -an | findstr :8080
netstat -an | findstr :3000
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Postman Collection Format](https://schema.postman.com/collection/json/v2.1.0/docs/index.html)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.