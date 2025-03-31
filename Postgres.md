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

### 3. Database Migration
- Updated database URL to use PostgreSQL in production
- Maintained SQLite as fallback for local development
- Added environment variable support for database configuration

## Environment Variables
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Application secret key

## Local Development
For local development, the application will continue to use SQLite unless the `DATABASE_URL` environment variable is set.

## Production Deployment
In production (Render.com):
1. Database URL is automatically provided by Render
2. Environment variables are managed through Render dashboard
3. PostgreSQL database is managed by Render

## Migration Process
1. Created PostgreSQL database on Render.com
2. Updated configuration to support PostgreSQL
3. Added necessary dependencies
4. Maintained local development capability

## Testing
- Local development continues to use SQLite
- Production environment uses PostgreSQL
- Both environments maintain the same schema and functionality 