# Development Guide - JSON API Preview

Technical architecture, development setup, and contribution guidelines for the JSON API Preview application.

## 🏗️ Architecture Overview

### Technology Stack

#### Backend (Spring Boot 3.2.0)
- **Framework**: Spring Boot with Spring Web
- **Java Version**: 17 (LTS)
- **Build Tool**: Maven 3.9+
- **HTTP Client**: Apache HttpClient 5.x
- **JSON Processing**: Jackson (FasterXML)
- **Development Tools**: Spring Boot DevTools for hot reload

#### Frontend (React 18.2.0)
- **Framework**: React with functional components and hooks
- **Styling**: Tailwind CSS 3.x
- **Build Tool**: Create React App (Webpack, Babel)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React useState and useEffect hooks

### System Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React Frontend│ ────────────────> │ Spring Boot API │
│   (Port 3000)   │                 │   (Port 8080)   │
└─────────────────┘                 └─────────────────┘
         │                                    │
         │                                    │
    ┌─────────┐                        ┌──────────────┐
    │ Browser │                        │ HTTP Client  │
    │ Storage │                        │   (Apache)   │
    └─────────┘                        └──────────────┘
                                              │
                                    ┌─────────────────┐
                                    │   External APIs │
                                    │  (via Postman)  │
                                    └─────────────────┘
```

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/main/java/com/jsonpreview/
│   ├── JsonParsePreviewApplication.java    # Spring Boot main class
│   ├── config/
│   │   └── WebConfig.java                  # CORS and web configuration
│   ├── controller/
│   │   ├── CollectionController.java       # Collection upload endpoints
│   │   ├── EnvironmentController.java      # Environment upload endpoints
│   │   └── RequestController.java          # Request execution endpoints
│   ├── dto/
│   │   ├── ApiResponseDto.java            # API response wrapper
│   │   ├── ExecuteRequestDto.java         # Request execution payload
│   │   └── RequestSummaryDto.java         # Request summary data
│   ├── model/
│   │   ├── PostmanCollection.java         # Postman collection model
│   │   ├── PostmanEnvironment.java        # Postman environment model
│   │   └── PostmanItem.java              # Postman request item model
│   └── service/
│       ├── ApiExecutionService.java       # HTTP request execution
│       └── PostmanParserService.java      # Postman file parsing
├── src/main/resources/
│   └── application.yml                     # Spring Boot configuration
└── pom.xml                                # Maven dependencies
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── JsonViewer.jsx                 # Interactive JSON tree viewer
│   │   ├── Sidebar.jsx                    # Request navigation sidebar
│   │   └── ParameterInput.jsx             # Parameter configuration
│   ├── App.js                             # Main application component
│   ├── index.js                           # React entry point
│   └── index.css                          # Tailwind CSS styles
├── public/
│   ├── index.html                         # HTML template
│   └── favicon.ico                        # Application icon
├── package.json                           # npm dependencies
└── tailwind.config.js                     # Tailwind configuration
```

## 🔧 Development Setup

### Prerequisites
- Java 17+ JDK
- Node.js 16+
- Maven 3.6+
- Git
- IDE (IntelliJ IDEA, VS Code, Eclipse)

### Development Environment

#### Backend Development
```bash
cd backend

# Install dependencies and compile
mvn clean compile

# Run in development mode (hot reload)
mvn spring-boot:run

# Run tests
mvn test

# Package for production
mvn clean package
```

#### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server (hot reload)
npm start

# Run tests
npm test

# Build for production
npm run build
```

### IDE Configuration

#### IntelliJ IDEA
1. Import project as Maven project
2. Set Project SDK to Java 17
3. Enable annotation processing
4. Install Spring Boot plugin
5. Configure code style (Google Java Style recommended)

#### VS Code
Recommended extensions:
- Extension Pack for Java
- Spring Boot Extension Pack
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter

## 🏛️ Backend Architecture

### Core Components

#### 1. Controllers (REST API Layer)
**Purpose**: Handle HTTP requests and responses

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CollectionController {
    
    @PostMapping("/collections/upload")
    public ResponseEntity<String> uploadCollection(@RequestParam("file") MultipartFile file) {
        // Handle collection upload
    }
}
```

**Key Features**:
- RESTful API design
- Proper HTTP status codes
- Error handling with @ExceptionHandler
- CORS configuration for frontend integration

#### 2. Services (Business Logic Layer)
**Purpose**: Core application logic and external API integration

```java
@Service
public class ApiExecutionService {
    
    public ApiResponseDto executeRequest(ExecuteRequestDto requestDto) {
        // Execute HTTP request
        // Process response
        // Return structured data
    }
}
```

**Key Features**:
- HTTP client abstraction
- Variable substitution
- Error handling and logging
- Response processing

#### 3. Models (Data Layer)
**Purpose**: Represent Postman collection and environment structures

```java
public class PostmanCollection {
    private PostmanInfo info;
    private List<PostmanItem> item;
    // Getters, setters, constructors
}
```

**Key Features**:
- Jackson annotations for JSON parsing
- Nested object support
- Optional field handling

### Data Flow

1. **File Upload**: Frontend uploads Postman files
2. **Parsing**: Backend parses JSON into Java objects
3. **Storage**: Collections and environments stored in memory
4. **Request Processing**: User selects request for execution
5. **Variable Substitution**: Replace placeholders with actual values
6. **HTTP Execution**: Execute request against target API
7. **Response Processing**: Format and return JSON response
8. **Frontend Display**: Render interactive JSON viewer

## 🎨 Frontend Architecture

### Core Components

#### 1. App.js (Main Component)
**Purpose**: Application state management and routing

```jsx
function App() {
  const [collection, setCollection] = useState(null);
  const [environment, setEnvironment] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState(null);
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <JsonViewer />
      </main>
    </div>
  );
}
```

#### 2. JsonViewer.jsx (JSON Display)
**Purpose**: Interactive JSON tree visualization

```jsx
const JsonViewer = ({ data, searchTerm }) => {
  const [expandedKeys, setExpandedKeys] = useState(new Set());
  
  const toggleExpand = (path) => {
    // Toggle expand/collapse logic
  };
  
  return (
    <div className="json-viewer">
      {renderJsonNode(data, [], 0)}
    </div>
  );
};
```

**Key Features**:
- Recursive JSON rendering
- Expand/collapse state management
- Search highlighting
- Copy to clipboard functionality

#### 3. Sidebar.jsx (Request Navigation)
**Purpose**: Collection browsing and request selection

```jsx
const Sidebar = ({ collection, onRequestSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRequests = collection?.item?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <aside className="w-80 bg-gray-100">
      <input type="text" placeholder="Search requests..." />
      <ul>
        {filteredRequests?.map(request => (
          <li key={request.name} onClick={() => onRequestSelect(request)}>
            {request.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
```

### State Management

#### React Hooks Usage
- **useState**: Component state management
- **useEffect**: Side effects and API calls
- **useCallback**: Performance optimization for event handlers
- **useMemo**: Expensive computation caching

#### State Structure
```javascript
// Application state
const appState = {
  collection: PostmanCollection | null,
  environment: PostmanEnvironment | null,
  selectedRequest: PostmanItem | null,
  parameters: Map<string, string>,
  response: ApiResponse | null,
  loading: boolean,
  error: string | null
};
```

## 🔌 API Design

### REST Endpoints

#### Collection Management
```
POST /api/collections/upload
  - Body: multipart/form-data (file)
  - Response: { message: "Collection uploaded successfully" }

GET /api/collections/requests
  - Response: RequestSummaryDto[]
```

#### Environment Management
```
POST /api/environments/upload
  - Body: multipart/form-data (file)
  - Response: { message: "Environment uploaded successfully" }
```

#### Request Execution
```
POST /api/requests/execute
  - Body: ExecuteRequestDto
  - Response: ApiResponseDto
```

### Data Transfer Objects

#### ExecuteRequestDto
```java
public class ExecuteRequestDto {
    private String requestName;
    private Map<String, String> parameters;
    // getters, setters
}
```

#### ApiResponseDto
```java
public class ApiResponseDto {
    private int statusCode;
    private Map<String, String> headers;
    private Object responseBody;
    private String rawResponse;
    private long executionTimeMs;
    // getters, setters
}
```

## 🧪 Testing Strategy

### Backend Testing

#### Unit Tests
```java
@SpringBootTest
class ApiExecutionServiceTest {
    
    @Autowired
    private ApiExecutionService apiExecutionService;
    
    @Test
    void shouldExecuteGetRequest() {
        // Test GET request execution
    }
    
    @Test
    void shouldSubstituteVariables() {
        // Test variable substitution
    }
}
```

#### Integration Tests
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CollectionControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldUploadCollection() {
        // Test file upload endpoint
    }
}
```

### Frontend Testing

#### Component Tests
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import JsonViewer from './JsonViewer';

test('should render JSON data', () => {
  const testData = { name: 'John', age: 30 };
  render(<JsonViewer data={testData} />);
  
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
});
```

#### End-to-End Tests
```javascript
// Using Cypress
describe('JSON API Preview', () => {
  it('should upload collection and execute request', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=upload-collection]').attachFile('test-collection.json');
    cy.get('[data-cy=request-item]').first().click();
    cy.get('[data-cy=execute-button]').click();
    cy.get('[data-cy=json-viewer]').should('be.visible');
  });
});
```

## 🚀 Deployment

### Production Build

#### Backend
```bash
# Build JAR file
mvn clean package -DskipTests

# Run production server
java -jar target/json-api-preview-1.0.0.jar

# Or with custom configuration
java -jar target/json-api-preview-1.0.0.jar --server.port=8080
```

#### Frontend
```bash
# Build optimized bundle
npm run build

# Serve static files
npx serve -s build -l 3000
```

### Docker Deployment

#### Dockerfile (Backend)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/json-api-preview-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Dockerfile (Frontend)
```dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

### Environment Configuration

#### Production application.yml
```yaml
server:
  port: ${PORT:8080}
  
spring:
  profiles:
    active: production
    
logging:
  level:
    com.jsonpreview: INFO
    root: WARN
```

## 🤝 Contributing

### Code Standards

#### Java Code Style
- Follow Google Java Style Guide
- Use meaningful variable and method names
- Add JavaDoc for public methods
- Maximum line length: 100 characters
- Use Spring Boot best practices

#### React Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for new components (migration in progress)
- Use Prettier for code formatting
- Maximum line length: 80 characters

### Git Workflow

#### Branch Naming
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `refactor/component-name` - Code refactoring

#### Commit Messages
```
type(scope): description

feat(api): add request execution endpoint
fix(json-viewer): resolve expand/collapse state bug
docs(readme): update installation instructions
test(service): add unit tests for parser service
```

### Pull Request Process

1. **Create Feature Branch**: `git checkout -b feature/new-feature`
2. **Develop**: Write code following standards
3. **Test**: Ensure all tests pass
4. **Document**: Update documentation if needed
5. **Create PR**: Submit pull request with description
6. **Review**: Address review comments
7. **Merge**: Squash and merge after approval

### Development Guidelines

#### Adding New Features

1. **Backend Feature**:
   - Create service method
   - Add controller endpoint
   - Write unit tests
   - Update API documentation

2. **Frontend Feature**:
   - Create/update React component
   - Add styling with Tailwind
   - Write component tests
   - Update user documentation

#### Performance Considerations

- **Backend**: Use streaming for large files, implement caching
- **Frontend**: Virtualize large JSON trees, lazy load components
- **Memory**: Monitor memory usage for large collections
- **Network**: Implement request compression, optimize bundle size

## 📊 Monitoring and Debugging

### Backend Logging
```java
private static final Logger logger = LoggerFactory.getLogger(ApiExecutionService.class);

public ApiResponseDto executeRequest(ExecuteRequestDto requestDto) {
    logger.debug("Executing request: {}", requestDto.getRequestName());
    try {
        // execution logic
        logger.info("Request executed successfully in {}ms", executionTime);
    } catch (Exception e) {
        logger.error("Request execution failed", e);
    }
}
```

### Frontend Debugging
```javascript
// Debug JSON viewer performance
const JsonViewer = ({ data }) => {
  useEffect(() => {
    console.log('JsonViewer rendered with data size:', JSON.stringify(data).length);
  }, [data]);
  
  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <div>Debug: {Object.keys(data).length} top-level keys</div>
      )}
      {/* component JSX */}
    </div>
  );
};
```

## 🔧 Advanced Topics

### Performance Optimization

#### Backend Optimizations
- Connection pooling for HTTP clients
- Response caching for repeated requests
- Asynchronous request processing
- Memory management for large files

#### Frontend Optimizations
- Virtual scrolling for large JSON trees
- Debounced search input
- Memoized components
- Code splitting and lazy loading

### Security Considerations

#### Backend Security
- Input validation and sanitization
- CORS configuration
- File upload size limits
- Request rate limiting

#### Frontend Security
- XSS prevention
- Secure token storage
- Input sanitization
- CSP headers

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Apache HttpClient Guide](https://hc.apache.org/httpcomponents-client-5.1.x/)
- [Jackson JSON Processing](https://github.com/FasterXML/jackson-docs)