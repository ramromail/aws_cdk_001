#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LmdaS3Stack } from '../lib/lmda_s3-stack';

const app = new cdk.App();
new LmdaS3Stack(app, 'LmdaS3Stack');
