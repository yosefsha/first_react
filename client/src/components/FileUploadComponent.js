import React, { useState } from 'react';
import { postData } from '../utils/api';

const FileUploadComponent = ({ uploadToS3 }) => {
    const [file, setFile] = useState(null);
    const [uploadToS3State, setUploadToS3State] = useState(uploadToS3);
    const [response, setResponse] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadToS3Change = (event) => {
        setUploadToS3State(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setResponse('Error: No file selected');
            return;
        }

        let formData = new FormData();
        console.log('file:', file);
        formData.append('files', file);
        formData.append('upload_to_s3', uploadToS3State.toString());

        console.log('formData:', formData);
        for (const pair of formData.entries()) {
            console.log('form data val: ', pair[0] + ', ' + pair[1]);
        }

        const body = { files: [file], upload_to_s3: uploadToS3State };

        try {
            const data = await postData('/upload', body);
            if (data.error) {
                setResponse(`Error: ${data.error}`);
            } else {
                setResponse(`Success: ${data.message} (${data.filename})`);
            }
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Flask Image Upload API</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg,.gif" />
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="upload_to_s3"
                        checked={uploadToS3State}
                        onChange={handleUploadToS3Change}
                    />
                    Upload to AWS S3
                </label>
                <button type="submit">Upload</button>
            </form>
            <div>{response}</div>
        </div>
    );
};

export default FileUploadComponent;