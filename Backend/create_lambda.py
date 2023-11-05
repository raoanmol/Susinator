import boto3
import random
import string

def generate_random_string(length=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# Initialize a session using Amazon Lambda
session = boto3.session.Session(region_name='us-east-2')  # replace 'your-region' with your AWS region
lambda_client = session.client('lambda')

# Generate a random function name
random_string = generate_random_string()
function_name = f'sun-hacks-lambda-{random_string}'

# Define the Lambda function
response = lambda_client.create_function(
    FunctionName=function_name,
    Runtime='python3.11',  # replace '3.x' with your Python version
    Role='arn:aws:iam::909768541970:role/sun-hacks-IAM',  # replace 'your-account-id' and 'execution_role' with your values
    Handler='lambda_function.lambda_handler',  # the file and function names from the zip file
    Code={
        'ZipFile': open('./function_code.zip', 'rb').read()
    },
    Description='A simple test lambda function',
    Timeout=15,
    MemorySize=128,
)

# Output the ARN of the new function
print(f'Function ARN: {response["FunctionArn"]}')