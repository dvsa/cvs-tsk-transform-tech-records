import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import _ from 'lodash';
import logger from './util/logger';

const client = new DynamoDB.DocumentClient();

interface NewKeyStructure {
  [index: string]: string | boolean | number | Array<string>;
}

export interface LegacyTechRecord {
  systemNumber: string,
  vin: string,
  primaryVrm: string,
  partialVin: string,
  techRecord: SingleTechRecord[]
}

interface SingleTechRecord extends NewKeyStructure {
  createdAt: string;
}

const isValidValue = (a: unknown) => {
  return a !== null && a !== undefined && (_.isString(a) || _.isNumber(a) || _.isBoolean(a));
};

const flattenAttributes = (vehicle: NewKeyStructure, recordPiece: any, prefix: string) => {
  if (recordPiece === null || recordPiece === undefined) {
    return;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const [key, value] of Object.entries(recordPiece)) {
    if (value === null || value === undefined) {
      logger.info(`skipping ${key}`);
      continue;
    }
    const fullKey = `${prefix}_${key}`;

    if (_.isObject(value)) {
      if (_.isArray(value)) {
        value.forEach((arrItem, index) => {
          if (_.isObject(arrItem)) {
            flattenAttributes(vehicle, arrItem, `${fullKey}_${index}`);
          } else if (isValidValue(arrItem)) {
            vehicle[`${fullKey}_${index}`] = arrItem as string | boolean | number;
          }
        });
      } else {
        flattenAttributes(vehicle, value, fullKey);
      }
    } else if (isValidValue(value)) {
      vehicle[fullKey] = value as string | boolean | number;
    }
  }

  return vehicle;
};

const createTimestampRecord = (newImage: LegacyTechRecord, record: SingleTechRecord) => {
  const vehicle: NewKeyStructure = {
    systemNumber: newImage.systemNumber,
    createdTimestamp: record.createdAt,
  };
    
  for (const [key, value] of Object.entries(newImage)) {
    if (key !== 'techRecord' && isValidValue(key)) {
      vehicle[key] = value as string | boolean | number;
    }
  }
    
  logger.info('flattening techRecord');
  return flattenAttributes(vehicle, record, 'techRecord');
};

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
          TableName: process.env.target_table,
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

export { handler, createTimestampRecord };
