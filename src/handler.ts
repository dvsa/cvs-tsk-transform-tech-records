import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createTimestampRecord } from './createTimestampRecord';
import { LegacyTechRecord } from './Interfaces/ILegacyTechRecord';
import logger from './util/logger';
import config from './config';

const client = new DynamoDB.DocumentClient();

const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
  const sendResponse = {
    SuccessCount: 0,
    FailCount: 0,
  };

  logger.info('Received event:', JSON.stringify(event, null, 2));
  for (const dbRecord of event.Records) {        
    if (dbRecord.eventName === 'REMOVE') {
      logger.info('remove event - ignoring');
      continue;
    }

    const newImage = DynamoDB.Converter.unmarshall(dbRecord.dynamodb.NewImage) as LegacyTechRecord;

    const techRecords = newImage.techRecord;

    delete newImage.techRecord;

    logger.info(`processing ${techRecords.length} records`);
    
    for (const record of techRecords) {
      const newRecord = createTimestampRecord(newImage, record);
      try {
        await (client.put({
          TableName: config.dynamoDb.target,
          Item: newRecord,
        })).promise();
        sendResponse.SuccessCount++;
        logger.info('Test record pushed to Dynamo');
      } catch (error) {
        sendResponse.FailCount++;
        logger.error('', error);
      }
    }
  }
  logger.info(`Data processed successfully; good: ${sendResponse.SuccessCount}, bad: ${sendResponse.FailCount}`);
};

export { handler };
