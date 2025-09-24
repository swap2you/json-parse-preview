# 🚀 JsonParsePreview

> **Professional Full-Stack JSON API Response Beautifier & Postman Collection Executor**

Transform your API development workflow with this modern, enterprise-grade application. Built with **Spring Boot 3.2.0** + **React 18.2.0**, featuring interactive JSON visualization, real-time API execution, and comprehensive Postman collection support.

[![Java](https://img.shields.io/badge/Java-17-orange)](https://adoptium.net/) [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)](https://spring.io/projects/spring-boot) [![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/) [![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE) [![Build](https://img.shields.io/badge/Build-Passing-success)](https://github.com/swap2you/json-parse-preview/actions)

## ✨ Core Features

🎯 **Multi-Format Support**
- 📁 **Postman Collections** - Parse and execute complete API collections
- 🌍 **Environment Files** - Variable substitution and parameter management
- 📋 **Direct JSON Upload** - Instant beautification of any JSON response
- 🔄 **Real-time Execution** - Execute API requests with live parameter editing

🎨 **Modern User Experience**
- 🌈 **Gradient UI Design** - Professional, modern interface with smooth animations
- 📱 **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- 🗂️ **Tabbed Navigation** - Intuitive file upload and control management
- 🌳 **Interactive JSON Tree** - Expandable/collapsible JSON structure visualization
- 🔍 **Smart Search** - Find specific keys and values within JSON responses
- 💾 **Export Options** - Save filtered data as CSV or copy specific values

⚡ **Performance & Reliability**
- 🚀 **Fast Parsing** - Optimized JSON processing with streaming support
- 🔒 **Secure Processing** - Client-side file handling with secure backend validation
- 🔄 **Auto-refresh** - Hot reload for development with production-ready builds
- 📊 **Error Handling** - Comprehensive error reporting and recovery options

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - [Download here](https://adoptium.net/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Maven 3.6+** - [Download here](https://maven.apache.org/)

### ⚡ One-Command Setup
```powershell
# Windows users - run these batch scripts
.\setup-project.bat    # Install all dependencies
.\start-backend.bat    # Start Spring Boot server (port 8080)
.\start-frontend.bat   # Start React app (port 3000)
```

### 🔧 Manual Setup
```bash
# 1. Clone repository
git clone https://github.com/swap2you/json-parse-preview.git
cd json-parse-preview

# 2. Start backend (Terminal 1)
cd backend
mvn clean spring-boot:run

# 3. Start frontend (Terminal 2)
cd frontend
npm install && npm start

# 4. Open browser
# http://localhost:3000
```

## 📖 How to Use

### 🎯 Upload & Execute Postman Collections
1. **Upload Collection**: Drop your `.json` Postman collection file
2. **Add Environment**: Optionally upload environment variables
3. **Select Request**: Choose from parsed API endpoints
4. **Customize Parameters**: Edit request parameters in real-time
5. **Execute**: Run the request and explore the JSON response

### 📋 Direct JSON Beautification
1. **Switch to JSON Mode**: Use the "Direct JSON Upload" tab
2. **Upload File**: Drop any `.json` file for instant visualization
3. **Explore Structure**: Navigate through the interactive JSON tree
4. **Search & Filter**: Find specific data points quickly

### 🛠️ Advanced Features
- **Parameter Substitution**: Environment variables automatically replaced
- **Custom Headers**: Add authentication tokens and custom headers
- **Response Analysis**: Built-in JSON validation and formatting
- **Export Data**: Save filtered results or copy specific values

## 🏗️ Architecture

### 🖥️ Backend (Spring Boot 3.2.0)
```
src/main/java/com/jsonpreview/
├── 🎯 controller/          # REST API endpoints (/api/*)
├── 📦 service/            # Business logic layer
├── 📋 dto/                # Data transfer objects
├── 🏛️ model/             # Domain models
└── ⚙️ config/             # Configuration classes
```

**Key Components:**
- **ApiController** - RESTful endpoints with CORS support
- **PostmanParserService** - Collection and environment parsing
- **ApiExecutionService** - HTTP request execution with parameter substitution

### 🎨 Frontend (React 18.2.0)
```
src/
├── 📱 components/         # Reusable React components
├── 🌐 services/          # API client and utilities
├── 🎨 styles/             # Tailwind CSS configuration
└── 📋 types/              # TypeScript type definitions
```

**Key Components:**
- **Sidebar** - Modern tabbed interface with gradient styling
- **JsonViewer** - Interactive tree with expand/collapse functionality
- **ParameterInput** - Dynamic form generation for request parameters

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload/collection` | Upload Postman collection JSON |
| `POST` | `/api/upload/environment` | Upload environment variables |
| `POST` | `/api/upload/json-response` | Upload direct JSON for beautification |
| `GET` | `/api/requests` | Get parsed collection requests |
| `POST` | `/api/executeRequest` | Execute API request with parameters |
| `GET` | `/api/health` | System health check |

## 🧪 Sample Files

Test the application with included examples:

```
examples/
├── 📋 sample-api-collection.json     # Basic REST API collection
├── 🌍 sample-environment.json        # Environment variables
├── 📄 sample-json-response.json      # Sample JSON for beautification  
├── 🚗 vehicle-api-collection.json    # Complex API example
└── 🔧 vehicle-api-environment.json   # Advanced environment setup
```

## 🛠️ Development

### 🔥 Hot Reload Development
```bash
# Backend (auto-restart on changes)
cd backend && mvn spring-boot:run

# Frontend (auto-refresh on changes)  
cd frontend && npm start
```

### 🧪 Testing
```bash
# Backend tests
cd backend && mvn test

# Frontend tests
cd frontend && npm test

# Integration tests
mvn verify
```

### 📝 Code Style
- **Java**: Spring Boot conventions, Google Java Style
- **React**: ESLint + Prettier, functional components with hooks
- **CSS**: Tailwind CSS utilities, consistent color schemes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### 🔄 Development Workflow
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`  
3. **Develop** following our coding standards
4. **Test** thoroughly with provided sample files
5. **Document** any new features or API changes
6. **Submit** pull request with comprehensive description

### 🐛 Bug Reports
Found a bug? Please [open an issue](https://github.com/swap2you/json-parse-preview/issues) with:
- Detailed steps to reproduce
- Expected vs actual behavior
- Screenshots for UI issues
- Environment details (OS, Java/Node versions)

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed installation and configuration
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines and standards
- **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** - Comprehensive user manual
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Architecture and technical details

## 🌟 What's Next

### 🎯 Planned Features
- 🔐 **Authentication Support** - OAuth 2.0 and API key management
- 📊 **Response Analytics** - Performance metrics and response time tracking  
- 🌍 **Multi-language** - Internationalization support
- 🔄 **Real-time Sync** - Live collaboration features
- 📱 **Progressive Web App** - Offline support and mobile optimization
- 🧪 **Test Generation** - Auto-generate test cases from API responses

### 🚀 Version Roadmap
- **v1.1.0** - Authentication and security enhancements
- **v1.2.0** - Advanced analytics and reporting
- **v2.0.0** - Real-time collaboration features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot Team** - For the excellent framework
- **React Team** - For the powerful UI library  
- **Tailwind CSS** - For the utility-first CSS framework
- **Postman** - For the collection format specification
- **Open Source Community** - For inspiration and contributions

---

<div align="center">

**Built with ❤️ using Spring Boot & React**

[🌟 Star this project](https://github.com/swap2you/json-parse-preview) | [🐛 Report Bug](https://github.com/swap2you/json-parse-preview/issues) | [💡 Request Feature](https://github.com/swap2you/json-parse-preview/issues)

*Transform your API development workflow today!*

</div>