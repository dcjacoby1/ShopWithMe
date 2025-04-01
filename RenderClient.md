# Frontend Deployment Guide

## Overview
This guide outlines the steps to deploy your React frontend as a static website on Render and connect it to your deployed backend.

## Step 1: Prepare Frontend for Deployment

### 1.1 Update API URL
In your frontend code, update the API base URL to point to your deployed backend:

```javascript
// src/config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';
```

### 1.2 Create render.yaml
Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: shopwithme-frontend
    env: static
    buildCommand: cd client && npm install && npm run build
    staticPublishPath: ./client/build
    envVars:
      - key: REACT_APP_API_URL
        sync: false
```

## Step 2: Deploy Frontend to Render

### 2.1 Connect to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository

### 2.2 Configure Deployment
1. Set the following configuration:
   - Name: shopwithme-frontend
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
   - Environment Variables:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```

### 2.3 Deploy
1. Click "Create Static Site"
2. Wait for the build and deployment to complete
3. Note your frontend URL (e.g., https://shopwithme-frontend.onrender.com)

## Step 3: Configure Backend CORS

### 3.1 Update CORS Settings
In your Flask backend (`server/app.py`), update CORS configuration:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://shopwithme-frontend.onrender.com",  # Your Render frontend URL
            "http://localhost:3000"  # Keep for local development
        ]
    }
})
```

### 3.2 Deploy Backend Changes
1. Commit and push the CORS changes
2. Render will automatically redeploy your backend

## Step 4: Test the Connection

### 4.1 Verify API Calls
1. Open your deployed frontend URL
2. Open browser developer tools (F12)
3. Check the Network tab for API calls
4. Verify that requests are going to your backend URL
5. Confirm that CORS errors are resolved

### 4.2 Common Issues and Solutions
1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API URL is correct
   - Ensure backend is accepting requests from frontend domain

2. **API Connection Issues**
   - Verify backend URL is correct
   - Check if backend is running
   - Ensure environment variables are set correctly

3. **Build Failures**
   - Check build logs in Render
   - Verify all dependencies are in package.json
   - Ensure build command is correct

## Best Practices

1. **Environment Variables**
   - Use environment variables for API URLs
   - Keep sensitive information secure
   - Use different variables for development and production

2. **Security**
   - Enable HTTPS for all connections
   - Implement proper CORS policies
   - Use secure headers

3. **Performance**
   - Enable caching where appropriate
   - Optimize static assets
   - Monitor loading times

4. **Monitoring**
   - Set up error tracking
   - Monitor API response times
   - Watch for failed requests

## Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security patches
   - Test after updates

2. **Backup**
   - Keep local copies of build files
   - Document deployment process
   - Maintain version control

3. **Monitoring**
   - Check deployment logs
   - Monitor error rates
   - Track performance metrics 