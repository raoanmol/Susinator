import boto3
from io import BytesIO

def upload_file_to_s3(file_data, bucket_name, file_name):
    # Create an S3 client
    s3 = boto3.client('s3')
    
    # If file_data is a string, encode it to bytes
    if isinstance(file_data, str):
        file_data = file_data.encode()
    
    # If file_data is bytes, create a BytesIO object from it
    if isinstance(file_data, bytes):
        file_data = BytesIO(file_data)
    
    # Ensure file_data is now a BytesIO object
    if not isinstance(file_data, BytesIO):
        raise ValueError("file_data must be a string, bytes, or BytesIO object")
    
    # Reset the file_data BytesIO object's cursor to the start of the data
    file_data.seek(0)
    
    # Use the put_object method to upload the data
    s3.put_object(
        Bucket=bucket_name,
        Key=file_name,
        Body=file_data
    )
