# JsonParsePreview

🚀 **Modern JSON API Response Beautifier & Postman Collection Executor**

A full-stack application that combines Spring Boot 3.2.0 backend with React 18.2.0 frontend to parse Postman collections, execute API requests, and present responses in an interactive, navigable tree structure.

## ✨ Key Features

- **📁 Multi-Format Upload**: Postman collections, environment files, and direct JSON responses
- **🎨 Modern UI**: Gradient backgrounds, smooth animations, tabbed interface
- **🔍 Interactive JSON Viewer**: Expandable tree structure with syntax highlighting
- **⚡ Real-time Execution**: Execute API requests with parameter substitution
- **🛠️ Developer Friendly**: Hot reload, CORS configured, comprehensive error handling

## 🚀 Quick Start

### Prerequisites
- Java 17+ (JDK 17.0.12 recommended)
- Node.js 18+ and npm
- Maven 3.8+

### 1. Environment Setup
```powershell
# Windows - Set JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17.0.12"
setx JAVA_HOME "C:\Program Files\Java\jdk-17.0.12"

# Verify installation
java -version
```

### 2. Start Backend (Spring Boot)
```powershell
cd backend
mvn clean install
mvn spring-boot:run
```
✅ Backend runs on: http://localhost:8080

### 3. Start Frontend (React)
```powershell
cd frontend  
npm install
npm start
```
✅ Frontend runs on: http://localhost:3000

## 🎯 Usage

1. **Upload Files**: Drag & drop or select Postman collection files
2. **Browse Requests**: Navigate through available API endpoints
3. **Execute Requests**: Run APIs with parameter substitution
4. **View Responses**: Explore JSON responses in interactive tree format
5. **Direct JSON Upload**: Upload any JSON file for instant preview

## 📁 Project Structure

```
JsonParsePreview/
├── 📄 README.md                    # This file
├── 📄 SETUP.md                     # Detailed setup guide
├── 🔧 start-backend.bat            # Quick start script
├── 🔧 start-frontend.bat           # Quick start script
├── 🧪 test-simple.json             # Sample test file
│
├── 🖥️ backend/                     # Spring Boot API Server
│   ├── pom.xml                     # Maven config (Java 17)
│   └── src/main/java/com/jsonpreview/
│       ├── JsonPreviewApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/ApiController.java
│       ├── service/PostmanParserService.java
│       └── model/PostmanCollection.java
│
├── 🎨 frontend/                    # React Application
│   ├── package.json               # NPM dependencies
│   ├── tailwind.config.js         # Styling config
│   └── src/
│       ├── App.js                 # Main component
│       ├── components/
│       │   ├── Sidebar.jsx        # Modern sidebar
│       │   ├── JsonViewer.jsx     # Tree viewer
│       │   └── ParameterInput.jsx # Input form
│       └── services/apiService.js # API client
│
├── 📚 docs/                       # Documentation
│   ├── SETUP.md                   # Setup instructions  
│   ├── DEVELOPMENT.md             # Dev guidelines
│   ├── USER_GUIDE.md              # User manual
│   └── AI_AGENT_PROMPT.md         # AI guidance
│
└── 📝 examples/                   # Sample files
    ├── sample-api-collection.json
    ├── sample-environment.json
    └── vehicle-api-collection.json
```

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload/collection` | Upload Postman collection |
| `POST` | `/api/upload/environment` | Upload environment file |
| `POST` | `/api/upload/json-response` | Upload JSON response |
| `GET` | `/api/requests` | Get parsed requests |
| `POST` | `/api/executeRequest` | Execute API request |
| `GET` | `/api/health` | Health check |

## 🧪 Testing

### Sample Workflow
1. Start both servers (backend & frontend)
2. Upload `examples/sample-api-collection.json`
3. Select a request from the sidebar
4. Execute the request and view response
5. Try uploading `examples/sample-json-response.json` directly

### Available Test Files
- **sample-api-collection.json** - Basic API collection
- **vehicle-api-collection.json** - Complex API example
- **sample-json-response.json** - JSON response for direct upload

## ⚡ Features in Detail

### Modern Sidebar Interface
- **Tabbed Navigation**: Upload & Controls tabs
- **Gradient Styling**: Modern purple-blue gradients
- **File Status Indicators**: Visual feedback for uploaded files
- **Animated Interactions**: Smooth hover effects and transitions

### Interactive JSON Viewer
- **Tree Structure**: Expandable/collapsible JSON nodes
- **Syntax Highlighting**: Color-coded JSON elements
- **Search & Filter**: Find specific keys or values
- **Copy Functionality**: Easy copying of JSON paths

### Request Execution
- **Parameter Substitution**: Environment variables support
- **Custom Parameters**: Override collection defaults
- **Method Support**: GET, POST, PUT, DELETE requests
- **Response Handling**: Formatted error messages

## 🔧 Development

### Backend Development
```powershell
cd backend
mvn clean compile          # Compile Java code
mvn test                  # Run unit tests
mvn spring-boot:run       # Development server
```

### Frontend Development  
```powershell
cd frontend
npm start                 # Development server
npm run build            # Production build
npm test                 # Run tests
```

### Tech Stack Details
- **Backend**: Spring Boot 3.2.0, Java 17, Maven, Jackson, Apache HttpClient
- **Frontend**: React 18.2.0, Tailwind CSS, Axios, Lucide React Icons
- **Development**: Hot reload, CORS configured, proxy setup

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Verify Java 17 installation: `java -version`
- Check JAVA_HOME: `echo $env:JAVA_HOME`
- Ensure port 8080 is free: `netstat -an | findstr :8080`

**Frontend errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (requires 18+)
- Verify proxy in package.json points to `http://localhost:8080`

**File upload failures:**
- Verify JSON format is valid
- Check file size (max 10MB)
- Look at browser console for errors

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed installation guide
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Development guidelines
- **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** - User manual
- **[docs/AI_AGENT_PROMPT.md](docs/AI_AGENT_PROMPT.md)** - AI agent instructions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Spring Boot & React**

*For detailed setup instructions, see [SETUP.md](SETUP.md)*