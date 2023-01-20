import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createTimestampRecord } from './createTimestampRecord';
import { LegacyVehicleRecord } from './interfaces/LegacyVehicleRecord';
import { BatchItemFailuresResponse } from './interfaces/BatchItemFailure';
import logger from './util/logger';
import config from './config';

const client = new DynamoDB.DocumentClient();

const handler = async (event: DynamoDBStreamEvent): Promise<BatchItemFailuresResponse> => {
  const dynamoDbPromises = [];

  const sendResponse = {
    SuccessCount: 0,
    FailCount: 0,
  };

  const res: BatchItemFailuresResponse = {
    batchItemFailures: [],
  };

  logger.info('Received event:', JSON.stringify(event, null, 2));
  logger.info(`Received ${event.Records.length} records from technical-records DynamoDB`);

  for (const dbRecord of event.Records) {        
    if (dbRecord.eventName === 'REMOVE') {
      logger.info('REMOVE event - ignoring');
      continue;
    }

    const newImage = DynamoDB.Converter.unmarshall(dbRecord.dynamodb.NewImage) as LegacyVehicleRecord;
    const techRecords = newImage.techRecord;

    delete newImage.techRecord;

    logger.info(`Processing ${techRecords.length} tech records for vehicle with systemNumber: ${newImage.systemNumber} and vin: ${newImage.vin}`);

    dynamoDbPromises.push(...techRecords.map((techRecord) => {
      const recordToSend = createTimestampRecord(newImage, techRecord);
      return client.put({
        TableName: config.dynamoDb.target,
        Item: recordToSend,
      }).promise().then(() => {
        logger.info(`Tech record with systemNumber: ${recordToSend.systemNumber as string} and createdTimestamp: ${recordToSend.createdTimestamp as string} succesfully sent to DynamoDB`);
        sendResponse.SuccessCount++;
      }).catch((err) => {
        logger.error(`Tech record with systemNumber: ${recordToSend.systemNumber as string} and createdTimestamp: ${recordToSend.createdTimestamp as string} unsuccesfully sent to DynamoDB, will attempt to retry DynamoDB record`);
        logger.error('', err);
        sendResponse.FailCount++;
        const failureObject = { itemIdentifier: dbRecord.eventID };
        if (res.batchItemFailures.indexOf(failureObject) === -1 ) {
          res.batchItemFailures.push(failureObject);
        }
      });
    }));
  }

  await Promise.allSettled(dynamoDbPromises);

  logger.info(`flat-tech-records processed; succeeded: ${sendResponse.SuccessCount}, failed: ${sendResponse.FailCount}`);
  return res;
};

export { handler };
