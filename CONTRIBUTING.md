# Contributing to JsonParsePreview

Thank you for your interest in contributing to JsonParsePreview! This document provides guidelines for contributing to this modern JSON API response beautifier and Postman collection executor.

## 🎯 Project Overview

JsonParsePreview is a full-stack application built with:
- **Backend**: Spring Boot 3.2.0 + Java 17
- **Frontend**: React 18.2.0 + Tailwind CSS
- **Purpose**: Parse Postman collections, execute API requests, and visualize JSON responses

## 🛠️ Development Setup

### Prerequisites
- Java 17+ (JDK 17.0.12 recommended)
- Node.js 18+ and npm
- Maven 3.8+
- Git

### Local Development Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/json-parse-preview.git
   cd json-parse-preview
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Backend: http://localhost:8080
   - Frontend: http://localhost:3000

## 📝 Contribution Guidelines

### Code Style
- **Java**: Follow Spring Boot conventions and Java naming standards
- **React**: Use functional components with hooks, follow ESLint rules
- **CSS**: Use Tailwind CSS classes, maintain consistent naming
- **Documentation**: Update README.md for user-facing changes

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/modifications

Example: `feat: add JSON response direct upload functionality`

## 🔄 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following the code style guidelines
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Submit a pull request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Test cases if applicable

### Pull Request Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Backend tests pass
- [ ] Frontend builds successfully
- [ ] Manual testing completed
- [ ] Documentation updated

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
mvn spring-boot:run --spring.profiles.active=test
```

### Frontend Testing
```bash
cd frontend
npm test
npm run build
```

### Manual Testing
1. Upload sample Postman collection (`examples/sample-api-collection.json`)
2. Test request execution with parameters
3. Test direct JSON response upload
4. Verify UI responsiveness and animations

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Java version, Node.js version, browser
- **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please provide:
- **Use Case**: Why is this feature needed?
- **Description**: What should the feature do?
- **Mockups**: UI mockups if applicable
- **Implementation Ideas**: Any implementation suggestions

## 📚 Documentation

### Code Documentation
- **Java**: Use JavaDoc comments for public methods and classes
- **React**: Use JSDoc comments for complex functions
- **README**: Update for user-facing changes
- **API**: Document new endpoints in the code

### File Structure
```
docs/
├── SETUP.md              # Detailed setup guide
├── DEVELOPMENT.md         # Development guidelines  
├── USER_GUIDE.md          # User manual
└── AI_AGENT_PROMPT.md     # AI development guidance
```

## 🚀 Release Process

1. **Version Bump**: Update version in `pom.xml` and `package.json`
2. **Changelog**: Update CHANGELOG.md with new features and fixes
3. **Testing**: Comprehensive testing of all features
4. **Documentation**: Ensure all docs are up to date
5. **Release**: Create GitHub release with release notes

## 💬 Community Guidelines

- Be respectful and inclusive
- Help newcomers get started
- Provide constructive feedback
- Follow the code of conduct
- Share knowledge and best practices

## 📞 Getting Help

- **Issues**: Create a GitHub issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Documentation**: Check the `docs/` folder for guides
- **Examples**: Use files in `examples/` folder for testing

## 🏗️ Architecture

### Backend Architecture
```
com.jsonpreview/
├── JsonPreviewApplication.java
├── config/CorsConfig.java
├── controller/ApiController.java
├── service/PostmanParserService.java
├── dto/ApiResponseDto.java
└── model/PostmanCollection.java
```

### Frontend Architecture
```
src/
├── App.js
├── components/
│   ├── Sidebar.jsx
│   ├── JsonViewer.jsx
│   └── ParameterInput.jsx
└── services/apiService.js
```

Thank you for contributing to JsonParsePreview! 🎉