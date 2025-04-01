# Render Deployment Guide

## Repository Configuration

### .gitignore Setup
The `.gitignore` file has been configured with comprehensive patterns to maintain a clean repository. Here's what's included:

#### Python-specific patterns:
- `__pycache__/` directories
- Compiled Python files
- Build directories
- Package files

#### Virtual Environment:
- `.env` and `.venv` directories
- Various virtual environment folders

#### IDE-specific files:
- `.idea/` (PyCharm)
- `.vscode/` (Visual Studio Code)
- Vim swap files

#### Database files:
- SQLite databases
- Other database files

#### Log files:
- `*.log` files

#### Local development:
- `.DS_Store` (macOS)
- Local environment files

#### Project-specific:
- `server/instance/` (Flask instance folder)
- `server/.flaskenv` (Flask environment variables)

### Benefits of .gitignore Configuration
This configuration ensures:
1. Only necessary files are committed to your repository
2. Sensitive information (like .env files) is not accidentally committed
3. Local development files don't interfere with deployment
4. Your repository stays clean and organized

### Package Management
- All required packages must be listed in `requirements.txt`
- The `.gitignore` file prevents duplicate or unnecessary files from being committed
- Virtual environment packages should not be committed

## Deployment Steps

1. **Environment Variables**
   - Set up required environment variables in Render dashboard:
     - `DATABASE_URL`: PostgreSQL connection string
     - `SECRET_KEY`: Application secret key
     - `FLASK_ENV`: Set to 'production'

2. **Build Settings**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn server.app:app` (Note: 'server.app' is the module path to your Flask application)

3. **Database Setup**
   - PostgreSQL database will be automatically provisioned
   - Run migrations using Flask-Migrate
   - Seed the database if needed

4. **Application Configuration**
   - Port is automatically configured through `PORT` environment variable
   - Debug mode is disabled in production
   - Application accepts external connections

## Best Practices

1. **Security**
   - Never commit sensitive information
   - Use environment variables for configuration
   - Keep debug mode disabled in production

2. **Performance**
   - Keep repository size minimal
   - Remove unnecessary files
   - Use appropriate caching strategies

3. **Maintenance**
   - Regularly update dependencies
   - Monitor application logs
   - Keep documentation up to date

## Troubleshooting

1. **Common Issues**
   - Database connection errors
   - Environment variable misconfiguration
   - Port conflicts
   - Import path errors

2. **Solutions**
   - Check environment variables in Render dashboard
   - Verify database connection string
   - Review application logs
   - Use absolute imports in production

## Import Path Configuration

### Local vs Production Environments
The application requires different import paths for local development and production:

```
Local Development:
/your/project/
├── server/
│   ├── app.py
│   ├── config.py
│   └── models.py
└── requirements.txt

When running from server directory:
python app.py
# Python can find config.py in the same directory

Production (Render):
/opt/render/project/src/
├── server/
│   ├── app.py
│   ├── config.py
│   └── models.py
└── requirements.txt

When running with gunicorn:
gunicorn server.app:app
# Python needs the full path server.config to find the module
```

### Required Changes
Update import statements in your files to use absolute paths:

```python
# Old (local development)
from config import app, db, api

# New (production-ready)
from server.config import app, db, api
```

This ensures your application works correctly in both local development and production environments. 