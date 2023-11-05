# TODO: Check if the db has the same bucket name, if it does, generate a new bucket name

# IMPORT LIBRARIES
import boto3, string, random

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
        
        # Add CORS configuration to the bucket
        cors_configuration = {
            'CORSRules': [
                {
                    'AllowedHeaders': ['*'],
                    'AllowedMethods': ['GET', 'PUT', 'POST', 'DELETE'],
                    'AllowedOrigins': ['*'],
                    'ExposeHeaders': [],
                    'MaxAgeSeconds': 3000,
                }
            ]
        }
        
        s3.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=cors_configuration)

        return bucket_name
    else:
        print(f'Error: {response}')
        return None

# Call the function to create the bucket and get the bucket name
bucket_name = create_s3_bucket()