from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Instantiate app, set attributes
app = Flask(__name__)

# Configure database
if os.environ.get('DATABASE_URL'):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, 
     supports_credentials=True, 
     resources={r"/*": {
         "origins": [
             "https://shopwithme-1.onrender.com",  # Frontend URL
             "http://localhost:3000"  # Keep localhost for development
         ]
     }})

# Encryption
bcrypt = Bcrypt(app)

# Set secret key from environment variable
app.secret_key = os.environ.get('SECRET_KEY')

# Configure session cookie settings
app.config['SESSION_COOKIE_SECURE'] = True  # Only send cookie over HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Allow cross-site cookie sending
app.config['SESSION_COOKIE_DOMAIN'] = 'onrender.com'  # Allow sharing across subdomains
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to the cookie
app.config['SESSION_COOKIE_PATH'] = '/'  # Ensure cookie is available for all paths