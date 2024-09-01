from flask import Flask, request, jsonify, render_template
import os
import base64
import io
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest

import boto3

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 128 * \
    1024 * 1024  # Maximum file size: 128MB

# Allowed extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# AWS S3 configuration
UPLOAD_TO_S3 = os.environ.get('UPLOAD_TO_S3', 'false').lower() == 'true'
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_S3_BUCKET = os.environ.get('AWS_S3_BUCKET')

if UPLOAD_TO_S3:
    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def decode_base64(data):
    # Add padding if necessary
    missing_padding = len(data) % 4
    if missing_padding != 0:
        data += '=' * (4 - missing_padding)

    # Decode the Base64 string
    return base64.b64decode(data)


@app.before_request
def before_request():
    # if request.method == 'OPTIONS':
    response = app.make_response('')
    response.headers.add("Access-Control-Allow-Origin",
                         "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_files():
    try:
        if request.is_json:  # set by content-type: application/json
            bd = request.get_data()
            print('bd:', bd)
            data = request.get_json()

        # Check if the post request has the file part
        if 'files' not in data:
            print('No file part')
            return jsonify(error='No file part'), 400
        upload_to_s3 = data.get('upload_to_s3', UPLOAD_TO_S3)
        file_dict = data.get('files', None)[0]

        # If no file is selected
        filename = file_dict.get('name', None)
        if not filename:
            raise BadRequest('No file name')

        # Check if the file is allowed
        if not allowed_file(filename):
            raise BadRequest('File type not allowed')

        file_data = decode_base64(file_dict.get('content', None))

        s_filename = secure_filename(filename)

        if upload_to_s3:
            file_obj = io.BytesIO(file_data)
            s3.upload_fileobj(file_obj, AWS_S3_BUCKET, filename)
            return jsonify(message='File successfully uploaded to S3', filename=filename), 200
        else:
            with open(os.path.join(app.config['UPLOAD_FOLDER'], s_filename), 'wb') as f:
                f.write(file_data)
            return jsonify(message='File successfully uploaded to local disk', filename=filename), 200
    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred: {}".format(e.args)}), 500


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000, host="0.0.0.0")
