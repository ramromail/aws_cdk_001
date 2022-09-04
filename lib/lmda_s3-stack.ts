import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LmdaS3Stack extends cdk.Stack {
	public sourceBucket: s3.Bucket;
	public destinationBucket: s3.Bucket;
	public readonly lambdaFunction: lambda.Function;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		this.sourceBucket = new s3.Bucket(this, 'SourceBucket', {
			// bucketName: 'source-bucket',
			autoDeleteObjects: true,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			publicReadAccess: false,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			versioned: false,
		});

		this.destinationBucket = new s3.Bucket(this, 'DestinationBucket', {
			// bucketName: 'destination-bucket',
			autoDeleteObjects: true,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			publicReadAccess: false,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			versioned: false,
		});

		this.lambdaFunction = new lambda.Function(this, 'protoBufDecode', {
			runtime: lambda.Runtime.NODEJS_16_X,
			code: lambda.Code.fromAsset('resources'),
			handler: "index.lambdaHandler",
			environment: {
				DESTINATIONBUCKET: this.destinationBucket.bucketName
			}
		});


		this.sourceBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(this.lambdaFunction));
		this.sourceBucket.grantRead(this.lambdaFunction);
		this.destinationBucket.grantWrite(this.lambdaFunction);
	}
}
