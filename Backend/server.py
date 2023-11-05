import boto3
from aws_dynamodb import seed_table, upload_to_dynamodb
from flask import Flask
from flask_cors import CORS

# IMPORTING FILES
from aws_dynamodb import seed_table, upload_to_dynamodb, fetch_bucket_name_from_dynamodb
from create_bucket import create_s3_bucket
from pdf_to_text_parser import extract_text_from_pdf
from dynamodb_to_s3 import fetch_summary_from_s3, fetch_binding_from_s3



# CREATE A DYNAMODB OBJECT
dynamodb = boto3.client('dynamodb')

# CREATE A S3 OBJECT
s3 = boto3.client('s3')

# CREATING FLASK APP
app = Flask(__name__)

CORS(app)
# SEED THE TABLE
seed_table(dynamodb, "UserHistory")

# GLOBAL VARIABLE FOR BUCKET_NAME
bucket_name = ""


# ROUTE TO RETURN BUCKET_NAME WHERE FRONTEND WILL UPLOAD THE FILE TO
@app.route("/bucket")
def bucket_name():
    temp = create_s3_bucket()
    bucket_name = temp
    return temp

# AFTER FRONTEND UPLOADS THE BUCKET, CALL THE PARSER TO FETCH FROM THE BUCKET, AND THEN PARSE IT. 
# ONCE PARSING IS DONE, UPLOAD THE PARSED CONTENT INTO THE S3 BUCKET AS AN output.txt FILE.

# -------NOTE:  THIS WILL ONLY RUN WHEN THE BUCKET HAS A FILE CALLED "input_file".
#extract_text_from_pdf(bucket_name, "input_file", "C:/Users/chait/Desktop")

# CREATE AWS LAMBDA


# UPLOAD TO DATABASE 



# CREATE A ROUTE THAT FETCHES FROM DATABASE, GIVEN A query_id IS PASSED
@app.route("/history")
def get_history_content(dynamodb, query_id):
    s3_bucket = fetch_bucket_name_from_dynamodb(query_id)

    summary = fetch_summary_from_s3(s3, s3_bucket, bucket_name)
    binding = fetch_binding_from_s3(s3, s3_bucket, bucket_name)
    response = {
        "summary": binding,
        "binding": summary
    }

    return response


# NOW THAT THE PDF CONTENTS HAVE BEEN PARSED INTO A TXT FILE IN THE S3 BUCKET, WE HAVE TO DO TWO THINGS IN PARALLEL:
# SUMMARIZE THE IMPORTANT BITS OF THIS DOCUMENT, AND IDENTIFY LEGAL BINDINGS/REPORT ANALYSIS OF THE CONTRAC





# RUN BACKEND SERVER
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
