# Setup Guide - JSON API Preview

This guide provides detailed installation and configuration instructions for the JSON API Preview application.

## 📋 System Requirements

### Hardware Requirements
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: 2GB free space for dependencies and build artifacts
- **CPU**: Any modern CPU (Intel i3/AMD equivalent or better)

### Software Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Java**: JDK 17 or higher (Oracle JDK or OpenJDK)
- **Node.js**: Version 16.0.0 or higher
- **Maven**: Version 3.6.0 or higher
- **Git**: For cloning the repository
- **Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

## 🔧 Environment Setup

### 1. Java Installation

#### Windows
1. Download Java 17 from [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or [OpenJDK](https://adoptium.net/)
2. Run the installer and follow the setup wizard
3. Set JAVA_HOME environment variable:
   ```powershell
   # In PowerShell (Administrator)
   [System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-17.0.12', 'Machine')
   [System.Environment]::SetEnvironmentVariable('PATH', $env:PATH + ';C:\Program Files\Java\jdk-17.0.12\bin', 'Machine')
   ```
4. Verify installation:
   ```powershell
   java -version
   javac -version
   ```

#### macOS
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@17"' >> ~/.zshrc
source ~/.zshrc

# Verify
java -version
```

#### Linux (Ubuntu/Debian)
```bash
# Install OpenJDK 17
sudo apt update
sudo apt install openjdk-17-jdk

# Set JAVA_HOME
echo 'export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"' >> ~/.bashrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify
java -version
```

### 2. Node.js Installation

#### Windows
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew
brew install node

# Or using Node Version Manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Linux
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### 3. Maven Installation

#### Windows
1. Download Maven from [maven.apache.org](https://maven.apache.org/download.cgi)
2. Extract to `C:\Program Files\Apache\maven`
3. Add to PATH:
   ```powershell
   [System.Environment]::SetEnvironmentVariable('PATH', $env:PATH + ';C:\Program Files\Apache\maven\bin', 'Machine')
   ```
4. Verify: `mvn --version`

#### macOS
```bash
brew install maven
mvn --version
```

#### Linux
```bash
sudo apt install maven
mvn --version
```

## 📦 Project Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/JsonParsePreview.git
cd JsonParsePreview
```

### 2. Backend Setup
```bash
cd backend

# Clean and compile
mvn clean compile

# Run tests (optional)
mvn test

# Package application
mvn package -DskipTests
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Optional: Fix any audit warnings
npm audit fix
```

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend
```bash
cd backend

# Option 1: Using Maven
mvn spring-boot:run

# Option 2: Using JAR file
java -jar target/json-api-preview-1.0.0.jar
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

### Production Build

#### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/json-api-preview-1.0.0.jar
```

#### Frontend
```bash
cd frontend
npm run build
npx serve -s build -l 3000
```

## 🔧 Configuration

### Backend Configuration (application.yml)
```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
  
logging:
  level:
    com.jsonpreview: DEBUG
    org.springframework.web: DEBUG
```

### Frontend Configuration (package.json)
```json
{
  "name": "json-preview-frontend",
  "proxy": "http://localhost:8080",
  "homepage": "."
}
```

## 🐛 Troubleshooting

### Common Issues

#### Java Issues
**Problem**: `JAVA_HOME not found`
```bash
# Windows
echo $env:JAVA_HOME

# macOS/Linux
echo $JAVA_HOME
```
**Solution**: Set JAVA_HOME environment variable as shown above

#### Maven Issues
**Problem**: `mvn command not found`
**Solution**: Add Maven bin directory to PATH

**Problem**: Build failures
```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Force update dependencies
mvn clean compile -U
```

#### Node.js Issues
**Problem**: `npm install` fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Conflicts
**Problem**: `Port 8080 already in use`
```bash
# Windows - Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

#### CORS Issues
**Problem**: Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check CORS configuration in `WebConfig.java`
- Verify proxy setting in `package.json`

### Environment Validation

Create a validation script to check your environment:

#### Windows (validate-env.ps1)
```powershell
Write-Host "=== Environment Validation ==="

# Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✓ Java: $javaVersion"
} catch {
    Write-Host "✗ Java not found"
}

# Maven
try {
    $mavenVersion = mvn --version | Select-String "Apache Maven"
    Write-Host "✓ Maven: $mavenVersion"
} catch {
    Write-Host "✗ Maven not found"
}

# Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js: $nodeVersion"
} catch {
    Write-Host "✗ Node.js not found"
}

# npm
try {
    $npmVersion = npm --version
    Write-Host "✓ npm: $npmVersion"
} catch {
    Write-Host "✗ npm not found"
}
```

#### macOS/Linux (validate-env.sh)
```bash
#!/bin/bash
echo "=== Environment Validation ==="

# Java
if command -v java &> /dev/null; then
    echo "✓ Java: $(java -version 2>&1 | head -n 1)"
else
    echo "✗ Java not found"
fi

# Maven
if command -v mvn &> /dev/null; then
    echo "✓ Maven: $(mvn --version | head -n 1)"
else
    echo "✗ Maven not found"
fi

# Node.js
if command -v node &> /dev/null; then
    echo "✓ Node.js: $(node --version)"
else
    echo "✗ Node.js not found"
fi

# npm
if command -v npm &> /dev/null; then
    echo "✓ npm: $(npm --version)"
else
    echo "✗ npm not found"
fi
```

## 🔄 Next Steps

After successful setup:
1. Read the [User Guide](USER_GUIDE.md) for usage instructions
2. Check the [Development Guide](DEVELOPMENT.md) for contributing
3. Review the example files in the `examples/` directory

## 🆘 Getting Help

If you encounter issues:
1. Check this troubleshooting section
2. Review the logs in the terminal
3. Create an issue on GitHub with:
   - Your operating system
   - Java, Node.js, and Maven versions
   - Complete error messages
   - Steps to reproduce the issue