import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'trandianat-cdk', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    const deployment = new s3Deployment.BucketDeployment(this, 'deployStaticWebsite', {
      destinationBucket: bucket,
      sources: [s3Deployment.Source.asset('./src')],
    });

    const handler = new lambda.Function(this, 'LambdaHandler', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'main.handler',
      memorySize: 1024,
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}
