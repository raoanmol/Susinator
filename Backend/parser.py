import boto3
import time

def extract_text(file_path):
    # Initialize a session using Amazon Textract
    textract = boto3.client('textract', region_name='us-east-1')
    
    # Read the file
    with open(file_path, 'rb') as file:
        file_bytes = bytearray(file.read())
        print('Image loaded', file_path)
    
    # Call Amazon Textract
    response = textract.start_document_text_detection(Document={'Bytes': file_bytes})
    
    # Get the job id from the response and wait for the job to complete
    job_id = response['JobId']
    print(f'Started job with id: {job_id}')
    
    while True:
        response = textract.get_document_text_detection(JobId=job_id)
        status = response['JobStatus']
        print(f'Job status: {status}')
        if status in ['SUCCEEDED', 'FAILED']:
            break
        time.sleep(5)  # wait for a while before checking the status again

    # Print the text
    if status == 'SUCCEEDED':
        for page in response['Blocks']:
            if page['BlockType'] == 'LINE':
                print(page['Text'])

# Call the function
extract_text('D:\\Code\\SunHacks23\\Data\\letter.pdf')
