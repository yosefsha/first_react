from flask import Flask, request, jsonify, render_template
import os
from werkzeug.utils import secure_filename
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


@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin",
                             "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response


@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.is_json:
        data = request.get_json()

    # Check if the post request has the file part
        if 'file' not in data:
            print('No file part')
            return jsonify(error='No file part'), 400
        upload_to_s3 = data.get('upload_to_s3', UPLOAD_TO_S3)
        file = data.get('file')

        # If no file is selected
        if file.filename == '':
            return jsonify(error='No selected file'), 400

        # Check if the file is allowed
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            if upload_to_s3:
                try:
                    s3.upload_fileobj(file, AWS_S3_BUCKET, filename)
                    return jsonify(message='File successfully uploaded to S3', filename=filename), 200
                except Exception as e:
                    return jsonify(error=str(e)), 500
            else:
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return jsonify(message='File successfully uploaded to local disk', filename=filename), 200
    else:
        return jsonify(error='File type not allowed'), 400


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
