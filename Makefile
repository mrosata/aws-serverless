.DEFAULT_GOAL := help

# Arguments to pass to tesseract cli in docker
args?=help

# Configure values
s3_bucket?=mrosata-serverless
lambda?=LambdaServerLessApi
profile?=personal

install: ## Project and sam resource dependencies
	cd src && npm install

clean: ## What you do if you want to watch TV after dinner
	rm -rf ./dist && rm -rf ./src/node_modules && rm -rf ./node_modules

start: ## Spins up the SAM Local API server
	sam local start-api --profile $(profile)

test: ## Runs tests inside the lambda src folder
	cd src && npm test

config: ## Hard codes parameters into project (theoretically idempotent)
	node ./scripts/configure.js $(s3_bucket) $(lambda) $(profile)

deconfig: ## Removes hard coded parameters from project (theoretically idempotent)
	node ./scripts/deconfigure.js

package:
	@sam package \
      --template-file template.yaml \
      --output-template-file packaged.yaml \
      --s3-bucket $(s3_bucket) \
      --profile $(profile)

deploy:
	sam deploy \
      --template-file packaged.yaml \
      --stack-name sam-app \
      --capabilities CAPABILITY_IAM \
      --parameter-overrides MyParameterSample=MySampleValue \
      --profile $(profile)

describe-stacks:
	aws cloudformation describe-stacks \
      --stack-name sam-app --query 'Stacks[].Outputs' \
      --profile $(profile)

publish-major: ## Publish major version
	@echo publish-major

publish-minor: ## Publish minor version
	@echo publish-minor

publish-patch: ## Publish patched version
	@echo publish-patch

readme:
	@open file://$(PWD)/README.md

help: ## Prints out this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "\033[36mTo set aws profile for current make command:\033[0m"
	@echo "   make <command> profile=<profile>"
	@echo "\033[36mTo set s3 bucket for a make command:\033[0m"
	@echo "   make <command> s3_bucket=<my_bucket_name>"
