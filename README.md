<div style="display: flex; justify-content: center;">
  <img src="assets/motto.png" alt="Susinator Motto" width="30%">
   <img src="assets/logo.png" alt="Susinator Logo" width="60px" height="60px">
</div>

_**Your AI Contract Manager**_

Susinator is a comprehensive contract analysis tool that leverages AWS Lambda, S3 buckets, SageMaker, and DynamoDB. It not only extracts and highlights critical clauses within contracts but also provides concise summaries. Additionally, it identifies legal obligations and bindings, empowering users with a clear understanding of their contractual commitments.

## Mission Statement

The inspiration behind Susinator stemmed from the need to revolutionize contract management. Recognizing the complexity and time-consuming nature of analyzing legal documents, we aimed to create a solution that could automate this process, making it more efficient and accessible for users.

☁️ **Susinator was made possible thanks to Amazon Cloud Services** ☁️

  <div style="display: flex; justify-content: center;">
  <img src="assets/aws.png" alt="GCP Logo" width="30%" height="170px">
  </div>

## Key Features

- **Custom-Trained Google Cloud PaLM Model**: Our platform begins with a custom-trained Google Cloud PaLM model, which is trained with legal data specific to the user's country and state.

- **Google Cloud Storage for Legal Documents**: We store legal documents using Google Cloud Storage, ensuring secure and reliable access.

- **Kubernetes Vector Search in GCP**: Vector search is set up using Kubernetes inside Google Cloud Platform, enabling fast and accurate retrieval of relevant legal information.

- **Serverless Access with IP Whitelisting**: Serverless access is provided to specific IP addresses, ensuring a streamlined and secure environment.

- **PDF to Embeddings with Google Vertex AI and Document AI**: We leverage Google Cloud's AI Vertex and Google Document AI to transform PDF pages into embeddings for our Elasticsearch instance, establishing a seamless connection in our pipeline.

- **Google Authentication**: Each user account is authenticated through Google Authentication, creating an efficient and secure user environment.

- **Python and Flask for Backend**: The entire backend of LegalAId is developed in Python, with Flask as the web framework.

- **Intuitive Frontend with JavaScript, React, ChakraUI, and Vite**: The frontend is designed to be user-friendly and intuitive, utilizing JavaScript, React, ChakraUI, and Vite. NodeJS is used for managing various aspects of the platform.

- **Google Vertex AI-Powered Chat-bot**: We've integrated a chat-bot powered by Google Vertex AI, providing accurate and precise responses to user inquiries.

- **Classification Models for Legal Situations**: Using Google Vertex AI, we employ classification models to understand the exact laws most relevant to the user's situation and identify the human rights most affected by the incident. This information forms the basis for LegalAId's recommendations.

- **Recommended Legal Attorneys with Google Maps API**: LegalAId goes a step further by recommending experienced legal attorneys along with their location, leveraging the Google Maps API to provide users with the best possible service for their case.

## How to Run this WebApp:

1. ``git clone <repository_URL>`` onto your machine
2. Set up your AWS Credentials
3. Connect your AWS S3 Bucket
    - Put ``NEXT_PUBLIC_AWS_ACCESS_KEY_ID_1``, ``NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_1``, and ``NEXT_PUBLIC_AWS_BUCKET_REGION_1``in ``.env.local`` (in root of frontend folder)
5. cd SunHacks23
6. run the frontend
    - cd frontend
    - npm install
    - npm run dev
7. run the backend
    - cd Backend
    - python server.py
8. Open a web browser and go to `localhost:3000` to access the application

## Created By
_**Anmol Rao, Gavin Holtzapple, Taman Truong & Chaitanya Chaurasia**_
