import * as cdk from 'aws-cdk-lib';
import { Capture, Match, Template } from "aws-cdk-lib/assertions";
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as LmdaS3Stack from '../lib/lmda_s3-stack';
import * as LmdaS3 from '../lib/lmda_s3-stack';

test('ProtoBuf decoding Lambda function created', () => {
	const app = new cdk.App();
	const stack = new LmdaS3.LmdaS3Stack(app, 'TestStack');
	const template = Template.fromStack(stack);

	// Assert it creates the function with the correct properties...
	template.hasResourceProperties("AWS::Lambda::Function", {
		Handler: "index.lambdaHandler",
		Runtime: "nodejs16.x",
	});
});
