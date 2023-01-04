import logger from './util/logger';
import _ from 'lodash';
import { LegacyVehicleRecord, LegacyTechnicalRecord } from './interfaces/LegacyVehicleRecord';
import { NewVehicleRecord } from './interfaces/NewVehicleRecord';
import { PrimitiveTypes } from './interfaces/PrimitiveTypes';

const isDefined = (a: unknown) => {
  return typeof a !== 'undefined';
};

const flattenAttributes = (vehicle: NewVehicleRecord, recordPiece: object, prefix: string) => {
  if (!isDefined(recordPiece)) {
    return;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const [key, value] of Object.entries(recordPiece)) {
    if (!isDefined(value)) {
      logger.debug(`skipping ${key}`);
      continue;
    }
    const fullKey = `${prefix}_${key}`;

    if (!_.isObject(value)) {
      vehicle[fullKey.toString()] = value as PrimitiveTypes;
      continue;
    }

    if (!Array.isArray(value)) {
      flattenAttributes(vehicle, value, fullKey);
      continue;
    }

    value.forEach((arrItem, index) => {
      if (_.isObject(arrItem)) {
        flattenAttributes(vehicle, arrItem, `${fullKey}_${index}`);
      } else if (isDefined(arrItem)) {
        vehicle[`${fullKey}_${index}`] = arrItem as PrimitiveTypes;
      }
    });
  }

  return vehicle;
};

export const createTimestampRecord = (newImage: LegacyVehicleRecord, record: LegacyTechnicalRecord) => {
  const vehicle: NewVehicleRecord = {
    systemNumber: newImage.systemNumber,
    createdTimestamp: record.createdAt,
  };
    
  for (const [key, value] of Object.entries(newImage)) {
    if (key !== 'techRecord' && isDefined(key)) {
      vehicle[key.toString()] = value as PrimitiveTypes;
    }
  }
    
  logger.info('flattening techRecord');
  return flattenAttributes(vehicle, record, 'techRecord');
};
