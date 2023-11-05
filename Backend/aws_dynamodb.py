# METHOD TO CREATE A TABLE IN DYNAMODB

# OUR APPROACH
# - We use DynamoDB to store the shortified title of the file content
# - We store the user_id, title and bucket name, so that we can use the
#  bucket_name to fetch history.

def seed_table(dynamodb, name):

    table_schema = [
        {
            'AttributeName': 'query_id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'title',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'bucket_name',
            'AttributeType': 'S'
        }, 
        {
            'AttributeName': 'lambda_func',
            'AttributeType': 'S'
        }  
    ]

    # Define primary key
    key_schema = [
        {
            'AttributeName': 'query_id',
            'KeyType': 'HASH'
        }
    ]

    tables = dynamodb.list_tables()['TableNames']

    if name not in tables:
        try:
            
            dynamodb.create_table(
                TableName=table_name,
                AttributeDefinitions=table_schema,
                KeySchema=key_schema,
                ProvisionedThroughput={
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                }
            )
            print(f'Table {name} created successfully!')
        except Exception as e:
            print(f'Error creating table: {e}')
    else:
        print("Table already exists!")


# METHOD TO UPLOAD TO OUR DYNAMODB TABLE

def upload_to_dynamodb(dynamodb, items):

    for item in items:
        dynamodb.put_item(TableName = "UserHistory",
        Item={
            'query_id': {'S': item["query_id"]},
            'query': {'S': item['query']},
            'bucket_name': {'S': item['bucket_name']},
            'lambda_func': {'S': item['lambda_func']}
        }
        )

    print(f"Uploaded item to the database succesfully!")


# METHOD TO FETCH BUCKET_NAME FROM OUR DYNAMODB TABLE

def fetch_bucket_name_from_dynamodb(dynamodb, query_id) -> str:

    # Define the table name
    table_name = 'UserHistory'

    # Define the expression attribute names and values for the query
    key_condition_expression = '#qi = :qi'
    expression_attribute_names = {'#qi': 'query_id'}
    expression_attribute_values = {':qi': {'S': query_id}}

    # Perform the query
    response = dynamodb.query(
        TableName=table_name,
        KeyConditionExpression=key_condition_expression,
        ExpressionAttributeNames=expression_attribute_names,
        ExpressionAttributeValues=expression_attribute_values
    )

    # Check if the query returned any items
    if 'Items' in response and len(response['Items']) > 0:
        # Extract the bucket_name attribute from the item
        bucket_name = response['Items'][0]['bucket_name']['S']
        print(f"The bucket name for query_id {query_id} is: {bucket_name}")
        return bucket_name
    else:
        print(f"No item found with query_id {query_id}")
        return ""










