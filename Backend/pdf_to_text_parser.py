# import boto3
# from io import BytesIO
# from upload_to_s3 import upload_file_to_s3  # Make sure to import the updated function
# import time

# def extract_text_from_pdf(bucket_name, file_name, output_file_name):
#     # Create a Textract client
#     textract = boto3.client('textract')

#     # Start document text detection
#     response = textract.start_document_text_detection(
#         DocumentLocation={
#             'S3Object': {
#                 'Bucket': bucket_name,
#                 'Name': file_name
#             }
#         }
#     )

#     # Get the job id from the response
#     job_id = response['JobId']

#     # Wait for the job to complete
#     print(f'Waiting for job {job_id} to complete...')
#     status = ''
    
#     while True:
#         response = textract.get_document_text_detection(JobId=job_id)
#         status = response['JobStatus']
#         if status == 'SUCCEEDED':
#             break
#         elif status == 'FAILED':
#             print(f'Job {job_id} failed: {response["StatusMessage"]}')
#             return
#         print(f'Job status: {status}')
#         time.sleep(5)

#     # Collect the text
#     pages = []
#     next_token = None
    
#     while True:
#         response = textract.get_document_text_detection(JobId=job_id, NextToken=next_token) if next_token else textract.get_document_text_detection(JobId=job_id)
#         pages.extend(response['Blocks'])
#         next_token = response.get('NextToken', None)
#         if not next_token:
#             break
    
#     # Create a string to hold the text data
#     text_data = ''
#     for block in pages:
#         if block['BlockType'] == 'LINE':
#             text_data += block['Text'] + '\n'

#     # Upload the text data to S3
#     upload_file_to_s3(text_data, bucket_name, output_file_name)

import boto3
from io import BytesIO
from upload_to_s3 import upload_file_to_s3
import time
import os

def extract_text_from_pdf(bucket_name, file_name, output_file_name):
    # Get the file extension
    file_extension = os.path.splitext(file_name)[1].lower()
    
    # Check if the file is a text file
    if file_extension == '.txt':
        # Create an S3 client
        s3 = boto3.client('s3')
        
        # Download the text file from S3
        obj = s3.get_object(Bucket=bucket_name, Key=file_name)
        text_data = obj['Body'].read().decode('utf-8')
        
        # Upload the text data to S3 with the specified output file name
        upload_file_to_s3(text_data, bucket_name, output_file_name)
        return
    
    # The below code will execute if the file is a PDF
    textract = boto3.client('textract')
    
    response = textract.start_document_text_detection(
        DocumentLocation={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': file_name
            }
        }
    )

    job_id = response['JobId']
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
    
    pages = []
    next_token = None
    
    while True:
        response = textract.get_document_text_detection(JobId=job_id, NextToken=next_token) if next_token else textract.get_document_text_detection(JobId=job_id)
        pages.extend(response['Blocks'])
        next_token = response.get('NextToken', None)
        if not next_token:
            break
    
    text_data = ''
    for block in pages:
        if block['BlockType'] == 'LINE':
            text_data += block['Text'] + '\n'
    
    upload_file_to_s3(text_data, bucket_name, output_file_name)
