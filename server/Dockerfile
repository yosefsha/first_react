# Dockerfile
# full version of pythonn dependencies
FROM --platform=linux/amd64 python:3.10-alpine

WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World
ENV PYTHONUNBUFFERED=1

# Run app.py when the container launches
CMD ["python", "app.py"]