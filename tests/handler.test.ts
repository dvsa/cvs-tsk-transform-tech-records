/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { handler } from '../src/handler';
import { EOL } from 'os';

const removeEvent: DynamoDBStreamEvent = {
  Records: [{
    eventName: 'REMOVE',
  }],
};

const insertEvent: DynamoDBStreamEvent = {
  Records: [{
    eventID: '22222',
    eventName: 'INSERT',
    dynamodb: {
      NewImage: {
        systemNumber: {
          S: '11000017',
        },
        'techRecord': {
          'L': [
            {
              'M': {
                'bodyType': {
                  'M': {
                    'code': {
                      'S': 'r',
                    },
                    'description': {
                      'S': 'refuse',
                    },
                  },
                },
                'conversionRefNo': {
                  'S': '7891234',
                },
                'createdAt': {
                  'S': '2019-06-24T10:26:54.903Z',
                },
                'drawbarCouplingFitted': {
                  'BOOL': true,
                },
                'tyreUseCode': {
                  'S': '2B',
                },
              },
            },
          ],
        },
      },
    },
  }],
};

const twoTechRecordsEvent: DynamoDBStreamEvent = {
  Records: [{
    eventID: '22222',
    eventName: 'INSERT',
    dynamodb: {
      NewImage: {
        systemNumber: {
          S: '11000017',
        },
        'techRecord': {
          'L': [
            {
              'M': {
                'bodyType': {
                  'M': {
                    'code': {
                      'S': 'r',
                    },
                    'description': {
                      'S': 'refuse',
                    },
                  },
                },
                'conversionRefNo': {
                  'S': '7891234',
                },
                'createdAt': {
                  'S': '2019-06-24T10:26:54.903Z',
                },
                'drawbarCouplingFitted': {
                  'BOOL': true,
                },
                'tyreUseCode': {
                  'S': '2B',
                },
              },
            },
            {
              'M': {
                'bodyType': {
                  'M': {
                    'code': {
                      'S': 'r',
                    },
                    'description': {
                      'S': 'refuse',
                    },
                  },
                },
                'conversionRefNo': {
                  'S': '7891234',
                },
                'createdAt': {
                  'S': '2019-06-24T10:26:54.903Z',
                },
                'drawbarCouplingFitted': {
                  'BOOL': true,
                },
                'tyreUseCode': {
                  'S': '2B',
                },
              },
            },
          ],
        },
      },
    },
  }],
};

const twoDynamoDbRecordEvent = {
  Records: [
    ...twoTechRecordsEvent.Records,
    ...twoTechRecordsEvent.Records,
  ],
};

const removeAndInsertEvent = {
  Records: [
    ...removeEvent.Records,
    ...twoTechRecordsEvent.Records,
    ...removeEvent.Records,
    ...twoTechRecordsEvent.Records,
  ],
};

function returnResolvedPromise() {
  return { 
    promise() {
      return Promise.resolve({});
    },
  };
}

function returnRejectedPromise() {
  return { 
    promise() {
      return Promise.reject(new Error(''));
    },
  };
}

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should not process REMOVE stream events', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => returnResolvedPromise());

    await handler(removeEvent);

    expect(consoleSpy).toHaveBeenNthCalledWith(3, `info: REMOVE event - ignoring${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(4, `info: flat-tech-records processed; succeeded: 0, failed: 0${EOL}`);
    expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(0);
  });

  describe('when receiving REMOVE and INSERT stream events in same batch', () => {
    it('should process INSERT event and ignore remove event', async () => {
      // @ts-ignore
      const consoleSpy = jest.spyOn(console._stdout, 'write');
      DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => returnResolvedPromise());

      await handler(removeAndInsertEvent);

      expect(consoleSpy).toHaveBeenNthCalledWith(3, `info: REMOVE event - ignoring${EOL}`);
      expect(consoleSpy).toHaveBeenNthCalledWith(4, `info: Processing 2 tech records for vehicle with systemNumber: 11000017 and vin: undefined${EOL}`);
      expect(consoleSpy).toHaveBeenNthCalledWith(7, `info: REMOVE event - ignoring${EOL}`);
      expect(consoleSpy).toHaveBeenNthCalledWith(8, `info: Processing 2 tech records for vehicle with systemNumber: 11000017 and vin: undefined${EOL}`);
      expect(consoleSpy).toHaveBeenNthCalledWith(15, `info: flat-tech-records processed; succeeded: 4, failed: 0${EOL}`);
      expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(4);
    });
  });

  it('should process INSERT stream events and put to dynamodb', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => returnResolvedPromise());

    await handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: Received 1 records from technical-records DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `info: Tech record with systemNumber: 11000017 and createdTimestamp: 2019-06-24T10:26:54.903Z succesfully sent to DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(6, `info: flat-tech-records processed; succeeded: 1, failed: 0${EOL}`);
    expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(1);
  });

  it('should send two record to dynamodb when there are 2 tech records within the base tech record', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => returnResolvedPromise());

    await handler(twoTechRecordsEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: Received 1 records from technical-records DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(6, `info: Tech record with systemNumber: 11000017 and createdTimestamp: 2019-06-24T10:26:54.903Z succesfully sent to DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(7, `info: Tech record with systemNumber: 11000017 and createdTimestamp: 2019-06-24T10:26:54.903Z succesfully sent to DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(8, `info: flat-tech-records processed; succeeded: 2, failed: 0${EOL}`);
    expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(2);
  });

  it('should catch error and not put to dynamodb', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => returnRejectedPromise());
    
    const res = await handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: Received 1 records from technical-records DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `error: Tech record with systemNumber: 11000017 and createdTimestamp: 2019-06-24T10:26:54.903Z unsuccesfully sent to DynamoDB, will attempt to retry DynamoDB record${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(7, `info: flat-tech-records processed; succeeded: 0, failed: 1${EOL}`);
    expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(1);
    expect(res).toEqual({ batchItemFailures: [ { itemIdentifier: '22222' } ] });
  });

  it('should send 3 records to dynamodb when lambda receives 2 dynamodb records where each contain 2 tech records but 1 flattened tech record fails to be put on dynamo', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn()
      .mockImplementationOnce(() => returnResolvedPromise())
      .mockImplementationOnce(() => returnRejectedPromise())
      .mockImplementation(() => returnResolvedPromise());
    
    const res = await handler(twoDynamoDbRecordEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: Received 2 records from technical-records DynamoDB${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(14, `info: flat-tech-records processed; succeeded: 3, failed: 1${EOL}`);
    expect(DynamoDB.DocumentClient.prototype.put).toHaveBeenCalledTimes(4);
    expect(res).toEqual({ batchItemFailures: [ { itemIdentifier: '22222' } ] });
  });
});





