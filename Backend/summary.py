import boto3
import re

# Initialize a session using Amazon S3
s3 = boto3.client('s3')

# Get the .txt file from S3
response = s3.get_object(Bucket='sunhacksbucket', Key='output.txt')
file_content = response['Body'].read().decode('utf-8')

# Define patterns for information extraction
employer_pattern = re.compile(r'Employer Information:\nName: (.*?)\n', re.DOTALL)
salary_pattern = re.compile(r'Annualized base salary rate of (\$(?:\d{1,3},)*(?:\d{1,3}))', re.DOTALL)
pay_frequency_pattern = re.compile(r'You will be paid on a (.*?) basis', re.DOTALL)

# Extract information
employer_info = re.search(employer_pattern, file_content)
salary_info = re.search(salary_pattern, file_content)
pay_frequency_info = re.search(pay_frequency_pattern, file_content)

# Print the extracted information
print(f'Employer: {employer_info.group(1) if employer_info else "N/A"}')
print(f'Salary: {salary_info.group(1) if salary_info else "N/A"}')
print(f'Pay Frequency: {pay_frequency_info.group(1) if pay_frequency_info else "N/A"}')