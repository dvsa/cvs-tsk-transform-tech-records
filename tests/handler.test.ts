/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as _ from '../src/handler';
import { EOL } from 'os';

const dbRecord = {
  dynamodb: {
    NewImage: {
      'systemNumber': {
        'S': '11000017',
      },
      'vin': {
        'S': 'P012301957486',
      },
      'partialVin': {
        'S': '957486',
      },
      'primaryVrm': {
        'S': 'AD35GHT',
      },
      'secondaryVrms': {
        'L': [
          {
            'S': 'CT96DRG',
          },
        ],
      },
      'techRecord': {
        'L': [
          {
            'M': {
              'axles': {
                'L': [
                  {
                    'M': {
                      'axleNumber': {
                        'N': '1',
                      },
                      'tyres': {
                        'M': {
                          'dataTrAxles': {
                            'N': '345',
                          },
                          'fitmentCode': {
                            'S': 'single',
                          },
                          'plyRating': {
                            'S': 'AB',
                          },
                          'speedCategorySymbol': {
                            'S': 'a7',
                          },
                          'tyreCode': {
                            'N': '1234',
                          },
                          'tyreSize': {
                            'S': '9.23648E+11',
                          },
                        },
                      },
                      'weights': {
                        'M': {
                          'designWeight': {
                            'N': '1800',
                          },
                          'gbWeight': {
                            'N': '1400',
                          },
                        },
                      },
                    },
                  },
                  {
                    'M': {
                      'axleNumber': {
                        'N': '2',
                      },
                      'tyres': {
                        'M': {
                          'dataTrAxles': {
                            'N': '345',
                          },
                          'fitmentCode': {
                            'S': 'single',
                          },
                          'plyRating': {
                            'S': 'AB',
                          },
                          'speedCategorySymbol': {
                            'S': 'a7',
                          },
                          'tyreCode': {
                            'N': '5678',
                          },
                          'tyreSize': {
                            'S': '9.23648E+11',
                          },
                        },
                      },
                      'weights': {
                        'M': {
                          'designWeight': {
                            'N': '1900',
                          },
                          'gbWeight': {
                            'N': '1600',
                          },
                        },
                      },
                    },
                  },
                  {
                    'M': {
                      'axleNumber': {
                        'N': '3',
                      },
                      'tyres': {
                        'M': {
                          'dataTrAxles': {
                            'N': '345',
                          },
                          'fitmentCode': {
                            'S': 'single',
                          },
                          'plyRating': {
                            'S': 'AB',
                          },
                          'speedCategorySymbol': {
                            'S': 'a7',
                          },
                          'tyreCode': {
                            'N': '5678',
                          },
                          'tyreSize': {
                            'S': '9.23648E+11',
                          },
                        },
                      },
                      'weights': {
                        'M': {
                          'designWeight': {
                            'N': '1900',
                          },
                          'gbWeight': {
                            'N': '1600',
                          },
                        },
                      },
                    },
                  },
                  {
                    'M': {
                      'axleNumber': {
                        'N': '4',
                      },
                      'tyres': {
                        'M': {
                          'dataTrAxles': {
                            'N': '345',
                          },
                          'fitmentCode': {
                            'S': 'single',
                          },
                          'plyRating': {
                            'S': 'AB',
                          },
                          'speedCategorySymbol': {
                            'S': 'a7',
                          },
                          'tyreCode': {
                            'N': '5678',
                          },
                          'tyreSize': {
                            'S': '9.23648E+11',
                          },
                        },
                      },
                      'weights': {
                        'M': {
                          'designWeight': {
                            'N': '1900',
                          },
                          'gbWeight': {
                            'N': '1600',
                          },
                        },
                      },
                    },
                  },
                  {
                    'M': {
                      'axleNumber': {
                        'N': '5',
                      },
                      'tyres': {
                        'M': {
                          'dataTrAxles': {
                            'N': '345',
                          },
                          'fitmentCode': {
                            'S': 'single',
                          },
                          'plyRating': {
                            'S': 'AB',
                          },
                          'speedCategorySymbol': {
                            'S': 'a7',
                          },
                          'tyreCode': {
                            'N': '5678',
                          },
                          'tyreSize': {
                            'S': '9.23648E+11',
                          },
                        },
                      },
                      'weights': {
                        'M': {
                          'designWeight': {
                            'N': '1900',
                          },
                          'gbWeight': {
                            'N': '1600',
                          },
                        },
                      },
                    },
                  },
                ],
              },
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
              'brakeCode': {
                'S': '178202',
              },
              'brakes': {
                'M': {
                  'antilockBrakingSystem': {
                    'BOOL': true,
                  },
                  'brakeCode': {
                    'S': '123',
                  },
                  'brakeCodeOriginal': {
                    'S': '12412',
                  },
                  'brakeForceWheelsNotLocked': {
                    'M': {
                      'parkingBrakeForceA': {
                        'N': '2332',
                      },
                      'secondaryBrakeForceA': {
                        'N': '2512',
                      },
                      'serviceBrakeForceA': {
                        'N': '6424',
                      },
                    },
                  },
                  'brakeForceWheelsUpToHalfLocked': {
                    'M': {
                      'parkingBrakeForceB': {
                        'N': '3512',
                      },
                      'secondaryBrakeForceB': {
                        'N': '2512',
                      },
                      'serviceBrakeForceB': {
                        'N': '5521',
                      },
                    },
                  },
                  'dataTrBrakeOne': {
                    'S': 'None',
                  },
                  'dataTrBrakeThree': {
                    'S': 'None',
                  },
                  'dataTrBrakeTwo': {
                    'S': 'None',
                  },
                  'dtpNumber': {
                    'S': 'sdgs',
                  },
                  'loadSensingValve': {
                    'BOOL': true,
                  },
                  'retarderBrakeOne': {
                    'S': 'electric',
                  },
                  'retarderBrakeTwo': {
                    'S': 'exhaust',
                  },
                },
              },
              'conversionRefNo': {
                'S': '7891234',
              },
              'createdAt': {
                'S': '2019-06-24T10:26:54.903Z',
              },
              'dimensions': {
                'M': {
                  'length': {
                    'N': '7500',
                  },
                  'width': {
                    'N': '2200',
                  },
                },
              },
              'drawbarCouplingFitted': {
                'BOOL': true,
              },
              'euroStandard': {
                'S': '7',
              },
              'frontAxleTo5thWheelCouplingMax': {
                'N': '1900',
              },
              'frontAxleTo5thWheelCouplingMin': {
                'N': '1700',
              },
              'frontAxleTo5thWheelMax': {
                'N': '1500',
              },
              'frontAxleTo5thWheelMin': {
                'N': '1200',
              },
              'functionCode': {
                'S': 'A',
              },
              'grossKerbWeight': {
                'N': '2500',
              },
              'grossLadenWeight': {
                'N': '3000',
              },
              'lastUpdatedAt': {
                'S': '2019-06-24T10:28:58.999Z',
              },
              'make': {
                'S': 'Isuzu',
              },
              'manufactureYear': {
                'N': '2018',
              },
              'maxTrainDesignWeight': {
                'N': '500',
              },
              'maxTrainGbWeight': {
                'N': '1000',
              },
              'model': {
                'S': 'FM',
              },
              'noOfAxles': {
                'N': '5',
              },
              'notes': {
                'S': 'test notes',
              },
              'ntaNumber': {
                'S': '123456',
              },
              'numberOfWheelsDriven': {
                'NULL': true,
              },
              'reasonForCreation': {
                'S': 'new vehicle',
              },
              'recordCompleteness': {
                'S': 'complete',
              },
              'regnDate': {
                'S': '2019-06-24',
              },
              'roadFriendly': {
                'BOOL': true,
              },
              'speedLimiterMrk': {
                'BOOL': true,
              },
              'statusCode': {
                'S': 'current',
              },
              'tachoExemptMrk': {
                'BOOL': true,
              },
              'trainDesignWeight': {
                'N': '2000',
              },
              'trainGbWeight': {
                'N': '1500',
              },
              'tyreUseCode': {
                'S': '2B',
              },
              'vehicleClass': {
                'M': {
                  'code': {
                    'S': 'v',
                  },
                  'description': {
                    'S': 'heavy goods vehicle',
                  },
                },
              },
              'vehicleConfiguration': {
                'S': 'centre axle drawbar',
              },
              'vehicleSubclass': {
                'L': [
                  {
                    'S': 'string',
                  },
                ],
              },
              'vehicleType': {
                'S': 'hgv',
              },
            },
          },
        ],
      },
    },
  },
};

const transformedRecord = {
  systemNumber: '11000017',
  createdTimestamp: '2019-06-24T10:26:54.903Z',
  partialVin: '957486',
  primaryVrm: 'AD35GHT',
  secondaryVrms: [ 'CT96DRG' ],
  techRecord_axles_0_axleNumber: 1,
  techRecord_axles_0_tyres_dataTrAxles: 345,
  techRecord_axles_0_tyres_fitmentCode: 'single',
  techRecord_axles_0_tyres_plyRating: 'AB',
  techRecord_axles_0_tyres_speedCategorySymbol: 'a7',
  techRecord_axles_0_tyres_tyreCode: 1234,
  techRecord_axles_0_tyres_tyreSize: '9.23648E+11',
  techRecord_axles_0_weights_designWeight: 1800,
  techRecord_axles_0_weights_gbWeight: 1400,
  techRecord_axles_1_axleNumber: 2,
  techRecord_axles_1_tyres_dataTrAxles: 345,
  techRecord_axles_1_tyres_fitmentCode: 'single',
  techRecord_axles_1_tyres_plyRating: 'AB',
  techRecord_axles_1_tyres_speedCategorySymbol: 'a7',
  techRecord_axles_1_tyres_tyreCode: 5678,
  techRecord_axles_1_tyres_tyreSize: '9.23648E+11',
  techRecord_axles_1_weights_designWeight: 1900,
  techRecord_axles_1_weights_gbWeight: 1600,
  techRecord_axles_2_axleNumber: 3,
  techRecord_axles_2_tyres_dataTrAxles: 345,
  techRecord_axles_2_tyres_fitmentCode: 'single',
  techRecord_axles_2_tyres_plyRating: 'AB',
  techRecord_axles_2_tyres_speedCategorySymbol: 'a7',
  techRecord_axles_2_tyres_tyreCode: 5678,
  techRecord_axles_2_tyres_tyreSize: '9.23648E+11',
  techRecord_axles_2_weights_designWeight: 1900,
  techRecord_axles_2_weights_gbWeight: 1600,
  techRecord_axles_3_axleNumber: 4,
  techRecord_axles_3_tyres_dataTrAxles: 345,
  techRecord_axles_3_tyres_fitmentCode: 'single',
  techRecord_axles_3_tyres_plyRating: 'AB',
  techRecord_axles_3_tyres_speedCategorySymbol: 'a7',
  techRecord_axles_3_tyres_tyreCode: 5678,
  techRecord_axles_3_tyres_tyreSize: '9.23648E+11',
  techRecord_axles_3_weights_designWeight: 1900,
  techRecord_axles_3_weights_gbWeight: 1600,
  techRecord_axles_4_axleNumber: 5,
  techRecord_axles_4_tyres_dataTrAxles: 345,
  techRecord_axles_4_tyres_fitmentCode: 'single',
  techRecord_axles_4_tyres_plyRating: 'AB',
  techRecord_axles_4_tyres_speedCategorySymbol: 'a7',
  techRecord_axles_4_tyres_tyreCode: 5678,
  techRecord_axles_4_tyres_tyreSize: '9.23648E+11',
  techRecord_axles_4_weights_designWeight: 1900,
  techRecord_axles_4_weights_gbWeight: 1600,
  techRecord_bodyType_code: 'r',
  techRecord_bodyType_description: 'refuse',
  techRecord_brakeCode: '178202',
  techRecord_brakes_antilockBrakingSystem: true,
  techRecord_brakes_brakeCode: '123',
  techRecord_brakes_brakeCodeOriginal: '12412',
  techRecord_brakes_brakeForceWheelsNotLocked_parkingBrakeForceA: 2332,
  techRecord_brakes_brakeForceWheelsNotLocked_secondaryBrakeForceA: 2512,
  techRecord_brakes_brakeForceWheelsNotLocked_serviceBrakeForceA: 6424,
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_parkingBrakeForceB: 3512,
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_secondaryBrakeForceB: 2512,
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_serviceBrakeForceB: 5521,
  techRecord_brakes_dataTrBrakeOne: 'None',
  techRecord_brakes_dataTrBrakeThree: 'None',
  techRecord_brakes_dataTrBrakeTwo: 'None',
  techRecord_brakes_dtpNumber: 'sdgs',
  techRecord_brakes_loadSensingValve: true,
  techRecord_brakes_retarderBrakeOne: 'electric',
  techRecord_brakes_retarderBrakeTwo: 'exhaust',
  techRecord_conversionRefNo: '7891234',
  techRecord_createdAt: '2019-06-24T10:26:54.903Z',
  techRecord_dimensions_length: 7500,
  techRecord_dimensions_width: 2200,
  techRecord_drawbarCouplingFitted: true,
  techRecord_euroStandard: '7',
  techRecord_frontAxleTo5thWheelCouplingMax: 1900,
  techRecord_frontAxleTo5thWheelCouplingMin: 1700,
  techRecord_frontAxleTo5thWheelMax: 1500,
  techRecord_frontAxleTo5thWheelMin: 1200,
  techRecord_functionCode: 'A',
  techRecord_grossKerbWeight: 2500,
  techRecord_grossLadenWeight: 3000,
  techRecord_lastUpdatedAt: '2019-06-24T10:28:58.999Z',
  techRecord_make: 'Isuzu',
  techRecord_manufactureYear: 2018,
  techRecord_maxTrainDesignWeight: 500,
  techRecord_maxTrainGbWeight: 1000,
  techRecord_model: 'FM',
  techRecord_noOfAxles: 5,
  techRecord_notes: 'test notes',
  techRecord_ntaNumber: '123456',
  techRecord_reasonForCreation: 'new vehicle',
  techRecord_recordCompleteness: 'complete',
  techRecord_regnDate: '2019-06-24',
  techRecord_roadFriendly: true,
  techRecord_speedLimiterMrk: true,
  techRecord_statusCode: 'current',
  techRecord_tachoExemptMrk: true,
  techRecord_trainDesignWeight: 2000,
  techRecord_trainGbWeight: 1500,
  techRecord_tyreUseCode: '2B',
  techRecord_vehicleClass_code: 'v',
  techRecord_vehicleClass_description: 'heavy goods vehicle',
  techRecord_vehicleConfiguration: 'centre axle drawbar',
  techRecord_vehicleSubclass_0: 'string',
  techRecord_vehicleType: 'hgv',
  vin: 'P012301957486',
};

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

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should not process REMOVE stream events', async () => {
    const createRecordSpy = jest.spyOn(_, 'createTimestampRecord');

    await _.handler(removeEvent).then(() => {
      expect(createRecordSpy).toHaveBeenCalledTimes(0);
    });
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

    await _.handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(4, `info: Test record pushed to Dynamo${EOL}`);

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
    
    await _.handler(insertEvent);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `info: Data processed successfully; good: 0, bad: 1${EOL}`);
  });
});

describe('createTimestampRecord', () => {
  it('should return a 1 dimensional object (excluding arrays for secondaryVrms field) with no undefined values', () => {
    const newImage = DynamoDB.Converter.unmarshall(dbRecord.dynamodb.NewImage) as _.LegacyTechRecord;
    const techRecords = newImage.techRecord;
    delete newImage.techRecord;
    const result = _.createTimestampRecord(newImage, techRecords[0]);
    
    // Ensure result only contains: string, number, array or boolean types. No objects
    const expectation = Object.values(result).every(entry => {
      return typeof(entry) === 'string' ? true 
        : typeof(entry) === 'number' ? true
          : Array.isArray(entry) ? true 
            : typeof(entry) === 'boolean' ? true
              : false;
    });
    
    expect(expectation).toBeTruthy();
  });

  it('should transform the dynamodb record correctly', () => {
    const newImage = DynamoDB.Converter.unmarshall(dbRecord.dynamodb.NewImage) as _.LegacyTechRecord;
    const techRecords = newImage.techRecord;
    delete newImage.techRecord;
    const result = _.createTimestampRecord(newImage, techRecords[0]);

    expect(result).toEqual(transformedRecord);
  });
});



