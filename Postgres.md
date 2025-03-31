# PostgreSQL Migration Guide

## Overview
This document outlines the steps taken to migrate the ShopWithMe application from SQLite to PostgreSQL for deployment on Render.com.

## Changes Made

### 1. Dependencies
- Added `psycopg2-binary` for PostgreSQL support
- Added `python-dotenv` for environment variable management

### 2. Configuration Changes
- Modified `config.py` to support both local SQLite and production PostgreSQL
- Added environment variable support for database URL
- Maintained backward compatibility for local development
- Moved secret key to environment variables for better security

### 3. Database Migration
- Updated database URL to use PostgreSQL in production
- Maintained SQLite as fallback for local development
- Added environment variable support for database configuration

## Environment Variables
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Application secret key (moved from config.py for security)

## Local Development
For local development, the application will continue to use SQLite unless the `DATABASE_URL` environment variable is set.

## Production Deployment
In production (Render.com):
1. Database URL is automatically provided by Render
2. Environment variables are managed through Render dashboard
3. PostgreSQL database is managed by Render
4. Secret key is securely stored in environment variables

## Migration Process
1. Created PostgreSQL database on Render.com
2. Updated configuration to support PostgreSQL
3. Added necessary dependencies
4. Maintained local development capability
5. Improved security by moving sensitive data to environment variables

## Testing
- Local development continues to use SQLite
- Production environment uses PostgreSQL
- Both environments maintain the same schema and functionality
- Secret key is properly managed through environment variables

---

# Migration Challenges and Solutions

## 1. Package Version Compatibility
**Challenge**: Initial installation failed due to SQLAlchemy-Serializer version incompatibility
**Solution**: Updated SQLAlchemy-Serializer from version 1.3.5 to 1.4.12 in requirements.txt

## 2. Import Path Issues
**Challenge**: Flask couldn't locate modules due to incorrect import paths
**Solutions**:
1. Updated import in app.py:
   ```python
   from server.config import app, db, api
   from server.models import User, Product, ShoppingCart, CartItem, Order
   ```
2. Updated import in models.py:
   ```python
   from server.config import db, bcrypt
   ```

## 3. Flask Application Discovery
**Challenge**: Flask couldn't locate the application when running migrations
**Solution**: Set the FLASK_APP environment variable:
```bash
export FLASK_APP=server.app
```

## 4. Database Migration Setup
**Challenge**: Migration directory didn't exist
**Solution**: Initialized migration directory with:
```bash
flask db init
```
Then created and ran migrations:
```bash
flask db migrate -m "Initial migration for PostgreSQL"
flask db upgrade
```

## 5. Security Improvements
**Challenge**: Sensitive data (secret key) was hardcoded in config.py
**Solution**: Moved secret key to environment variables in .env file and updated config.py to use environment variable

## 6. Data Type Compatibility
**Challenge**: Database seeding failed due to phone number format incompatibility with Integer data type
**Solution**: Modified the User model's phone_number field from Integer to String type:
```python
# Changed in models.py
phone_number = db.Column(db.String, nullable = True)  # Previously was db.Integer
```
This allows storing phone numbers with special characters ('+', '-', 'x') and maintains the full phone number format.

## Key Learnings
1. Python module imports need to be relative to the project structure
2. Flask-Migrate requires proper initialization before running migrations
3. Environment variables are crucial for Flask application discovery
4. Package version compatibility is important for smooth operation
5. Sensitive data should always be stored in environment variables, not in code
6. Data types should accommodate the full range of expected input formats

These challenges highlight the importance of:
- Proper project structure
- Correct import paths
- Environment configuration
- Version management
- Step-by-step verification of each migration phase
- Security best practices for sensitive data
- Appropriate data type selection for user input

These challenges highlight the importance of:
- Proper project structure
- Correct import paths
- Environment configuration
- Version management
- Step-by-step verification of each migration phase 