#!/bin/bash


echo '**********Switching to Lambda directory**********'
cd resources

echo '**********Install node modeules, dependencies**********'
npm install

echo '**********Going back to parent directory**********'
cd ..

echo '**********Install node modeules, dependencies**********'
npm install

echo '**********Building**********'
npm run build

echo '**********Run tests**********'
npm run test

echo '**********Running CDK SYNTH**********'
cdk synth

echo '**********Running CDK DIFF**********'
cdk diff

echo '**********Now deploying**********'
cdk deploy

echo '*********when done testing run command*********
cdk destroy';
