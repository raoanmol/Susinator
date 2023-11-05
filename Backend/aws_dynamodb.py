# METHOD TO CREATE A TABLE IN DYNAMODB

def seed_table(dynamodb, name):

    table_schema = [
        {
            'AttributeName': 'user_id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'query',
            'AttributeType': 'S'
        }
    ]

    # Define primary key
    key_schema = [
        {
            'AttributeName': 'user_id',
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

        
def upload_to_dynamodb(dynamodb, user_id, items):

    for item in items:
        dynamodb.put_item(TableName = "UserHistory",
        Item={
            'user_id': {'S': user_id},
            'query': {'S': item['query']}
        }
        )
    
    print(f"Uploaded item")




