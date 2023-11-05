import boto3


def upload_file_to_s3(file_name, bucket_name):
    # Create an S3 client
    s3 = boto3.client('s3')
    s3.upload_file(file_name, bucket_name, file_name)