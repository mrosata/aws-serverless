# Starter SAM APP
### Api Gateway and Lambda Function

## Requirements

 * AWS CLI
 * [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
 * [Docker installed](https://www.docker.com/community-edition)

### AWS Serverless Template Resources
 * [More info about Globals](https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst)
 * [More info about Function Resource "AWS::Serverless::Function"](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction)
 * [More info about API Event Source](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api)
 * [More info about Env Vars](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#environment-object)
 * [Root document AWS Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md)
 * [Swagger Specification](https://swagger.io/specification/)


## Setup process

### Installing dependencies

```bash
make install
```

### Local development

**Run local API Gateway Server**

To make http requests to your serverless API run `make start`, this uses **SAM CLI** to emulate 
both Lambda and API Gateway locally. **SAM CLI** takes our `Events:` from `template.yaml` to 
bootstrap the server on `http://localhost:3000/`

```bash
make start
```


## Packaging and deployment

 * AWS Lambda requires a flat folder with all dependencies 
 * In `template.yaml`, the `CodeUri:` property points at our application and dependencies
 * We need an `S3 bucket` to upload packaged lamdba function (this can either be a bucket that
 you have created in the past or through running `make config init`)

```bash
aws s3 mb s3://BUCKET_NAME
```

Next, run the following command to package our Lambda function to S3:

```bash
sam package \
--template-file template.yaml \
--output-template-file packaged.yaml \
--s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

Next, the following command will create a Cloudformation Stack and deploy your SAM resources.

```bash
sam deploy \
--template-file packaged.yaml \
--stack-name sam-app \
--capabilities CAPABILITY_IAM
```

> **See [Serverless Application Model (SAM) HOWTO Guide](https://github.com/awslabs/serverless-application-model/blob/master/HOWTO.md) for more details in how to get started.**

After deployment is complete you can run the following command to retrieve the API Gateway Endpoint URL:

```bash
aws cloudformation describe-stacks \
--stack-name sam-app \
--query 'Stacks[].Outputs'
``` 

## Testing

```bash
make test
```

## Need Help?

```bash
# See what other make commands are available:
make help

# You can always view this readme again:
make readme

# Or if your really stuck and don't know what to do:
shutdown -h now
```

# Appendix

## AWS CLI commands

AWS CLI commands to package, deploy and describe outputs defined within the cloudformation stack:

```bash
make package
make deploy
make describe-stacks
```

**NOTE**: Alternatively this could be part of package.json scripts section.

## Bringing to the next level

Here are a few ideas that you can use to get more acquainted as to how this overall process works:

* [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/)

