# txt files direct copy to output.txt
import boto3
import time

# Initialize variables
input_file_name = 'input_file_name'
bucket_name = 'bucket_name'
output_file_path = 'output_file_path'

def upload_file_to_s3(file_name, bucket_name):
    # Create an S3 client
    s3 = boto3.client('s3')
    s3.upload_file(file_name, bucket_name, file_name)

def extract_text_from_pdf(bucket_name, file_name, output_file_path):
    # Create a Textract client
    textract = boto3.client('textract')

    # Start document text detection
    response = textract.start_document_text_detection(
        DocumentLocation={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': file_name
            }
        }
    )

    # Get the job id from the response
    job_id = response['JobId']

    # Wait for the job to complete
    print(f'Waiting for job {job_id} to complete...')
    status = ''
    while True:
        response = textract.get_document_text_detection(JobId=job_id)
        status = response['JobStatus']
        if status == 'SUCCEEDED':
            break
        elif status == 'FAILED':
            print(f'Job {job_id} failed: {response["StatusMessage"]}')
            return
        print(f'Job status: {status}')
        time.sleep(5)

    # Write the text to the output file
    pages = []
    next_token = None
    while True:
        response = textract.get_document_text_detection(JobId=job_id, NextToken=next_token) if next_token \
            else textract.get_document_text_detection(JobId=job_id)

        pages.extend(response['Blocks'])

        next_token = response.get('NextToken', None)
        if not next_token:
            break

    with open(output_file_path, 'w') as f:
        for block in pages:
            if block['BlockType'] == 'LINE':
                f.write(block['Text'] + '\n')

# Usage:
upload_file_to_s3(input_file_name, bucket_name)
extract_text_from_pdf(bucket_name, input_file_name, output_file_path)