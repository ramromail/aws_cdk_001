const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const protobuf = require('protobufjs');

exports.lambdaHandler = async (event, context) => {
	const root = await protobuf.load('books.proto');
	const Book = root.lookupType('Books.Book');

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
	console.log('bucket: ' , bucket);
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    try {
		const { Body } = await s3.getObject({Bucket: bucket,Key: key}).promise();
		let message = Book.decode(Body);
		message = JSON.stringify(message);

		console.log("message", typeof message, message);
	
		const fileName = new Date().toISOString().replaceAll(':','_') + '.txt';
		await s3.putObject({
				Bucket: process.env.DESTINATIONBUCKET,
				Key: fileName,
				Body: message
			}).promise();

		return {
			"statusCode": 200
		};
        
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
