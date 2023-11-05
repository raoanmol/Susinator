# TODO: Check if the db has the same bucket name, if it does, generate a new bucket name

import boto3
import string
import random

def generate_random_string(length=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def create_s3_bucket():
    # Initialize a session using Amazon S3
    s3 = boto3.client('s3')

    # Generate a random bucket name
    bucket_name = f"sun-hacks-bucket-{generate_random_string()}"

    # Create the bucket
    response = s3.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={
            'LocationConstraint': 'us-east-2'  # Change this to your desired AWS region
        }
    )

    # Ensure the bucket was created successfully
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        print(f'Bucket {bucket_name} created successfully')
        return bucket_name
    else:
        print(f'Error: {response}')
        return None

# Call the function to create the bucket and get the bucket name
bucket_name = create_s3_bucket()