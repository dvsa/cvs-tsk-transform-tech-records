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

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should not process REMOVE stream events', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');

    await handler(removeEvent);

    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: remove event - ignoring${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(3, `info: Data processed successfully; good: 0, bad: 0${EOL}`);
  });

  it('should process INSERT stream events and put to dynamodb', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => {
      return { 
        promise() {
          return Promise.resolve({});
        },
      };
    });

    await handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: processing 1 records${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `info: Data processed successfully; good: 1, bad: 0${EOL}`);
  });

  it('should send two record to dynamodb when there are 2 tech records within the base tech record', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => {
      return { 
        promise() {
          return Promise.resolve({});
        },
      };
    });

    await handler(twoTechRecordsEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: processing 2 records${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(7, `info: Data processed successfully; good: 2, bad: 0${EOL}`);
  });

  it('should catch error and not put to dynamodb', async () => {
    // @ts-ignore
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    DynamoDB.DocumentClient.prototype.put = jest.fn().mockImplementation(() => {
      return { 
        promise() {
          return Promise.reject(new Error(''));
        },
      };
    });
    
    await handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `info: processing 1 records${EOL}`);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `info: Data processed successfully; good: 0, bad: 1${EOL}`);
  });
});





