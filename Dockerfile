# Use an official Python runtime as a parent image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/src/solaranalytics/backend

# Install dependencies
# Copy the requirements.txt file into the container at /usr/src/app/
COPY backend/requirements.txt /usr/src/solaranalytics/backend
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app/
COPY /backend /usr/src/solaranalytics/backend/
# Run the application on the specified port
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
