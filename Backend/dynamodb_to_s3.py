# METHOD TO FETCH output.txt
def fetch_output_from_s3(s3, s3_bucket, bucket_name):
    try:
        # Retrieve the contents of the file
        response = s3.get_object(Bucket=bucket_name, Key="output.txt")
        content = response['Body'].read().decode('utf-8')
        return content
    except Exception as e:
        return str(e)
    
# METHOD TO FETCH summary.txt

def fetch_summary_from_s3(s3, s3_bucket, bucket_name):
    try:
        # Retrieve the contents of the file
        response = s3.get_object(Bucket=bucket_name, Key="summary.txt")
        content = response['Body'].read().decode('utf-8')
        return content
    except Exception as e:
        return str(e)


# METHOD TO FETCH bindings.txt

def fetch_binding_from_s3(s3, s3_bucket, bucket_name):
    try:
        # Retrieve the contents of the file
        response = s3.get_object(Bucket=bucket_name, Key="bindings.txt")
        content = response['Body'].read().decode('utf-8')
        return content
    except Exception as e:
        return str(e)
