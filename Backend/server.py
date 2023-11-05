import boto3
from aws_dynamodb import seed_table, upload_to_dynamodb
from flask import Flask

# CREATE A DYNAMODB OBJECT
dynamodb = boto3.client('dynamodb')

# CREATING FLASK
app = Flask(__name__)

# SEED TABLE INTO AWS IF IT ALREADY DOESNT EXIST
seed_table(dynamodb, name="UserHistory")

# METHODS TO PARSE THE PDF FILE


items_to_upload = [
    {'user_id': 'user1', 'query': 'Query 1'},
    {'user_id': 'user2', 'query': 'Query 2'},
    {'user_id': 'user3', 'query': 'Query 3'}
]

upload_to_dynamodb(dynamodb, "1234567890", items_to_upload)

if __name__ == "__main__":
    app.run(debug=True)

