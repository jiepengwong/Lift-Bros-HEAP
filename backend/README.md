# How to create a virtual environment for development

## Create Virtual Environment
`python -m venv <env-name>` 

## Activate Virtual Environment
`<env-name>\Scripts\activate` 

## Install requirements
`pip install -r requirements.txt` 

## Deactive Environment

deactive

# Using Docker Image

## Create Docker Image

docker build -t lift-bro:0.0.1 .

## Run docker image

docker run -p 5000:5000 lift-bro:0.0.1
