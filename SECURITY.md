# Security Policy

## Supported Versions

We actively support the following versions of JsonParsePreview with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ |
| < 1.0   | ❌ |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in JsonParsePreview, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. **Email** us at: [security@jsonparsepreview.com] (replace with actual email)
3. **Include** the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Assessment**: We'll assess the vulnerability within 5 business days
- **Updates**: We'll provide regular updates on our progress
- **Resolution**: We aim to resolve critical issues within 30 days

### Security Measures

JsonParsePreview implements several security measures:

#### Backend Security
- **Input Validation**: All user inputs are validated and sanitized
- **File Upload Limits**: Maximum file size of 10MB
- **JSON Parsing**: Safe JSON parsing with error handling
- **CORS Configuration**: Restricted to localhost during development
- **Error Handling**: No sensitive information exposed in error messages

#### Frontend Security  
- **Input Sanitization**: User inputs are cleaned before processing
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Ready**: Configured for HTTPS in production
- **Content Security Policy**: CSP headers configured

#### Development Security
- **Dependencies**: Regular dependency updates and vulnerability scanning
- **Code Review**: All changes go through code review process
- **Testing**: Security testing as part of development workflow

### Responsible Disclosure

We follow responsible disclosure principles:
- We'll work with you to understand and resolve the issue
- We'll credit you for the discovery (if desired)
- We'll coordinate the public disclosure timing
- We'll notify users of security updates appropriately

### Security Best Practices for Users

When using JsonParsePreview:

1. **File Uploads**: Only upload trusted JSON files
2. **API Endpoints**: Be cautious when executing requests to external APIs
3. **Environment Variables**: Don't include sensitive data in environment files
4. **Local Development**: Use the application only on trusted networks
5. **Updates**: Keep the application updated to the latest version

### Contact Information

- **Security Email**: [security@jsonparsepreview.com] (replace with actual)
- **General Issues**: Create a GitHub issue (non-security related)
- **Documentation**: Check the docs/ folder for detailed guides

Thank you for helping keep JsonParsePreview secure! 🔒