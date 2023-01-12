import logger from './util/logger';
import { LegacyVehicleRecord, LegacyTechnicalRecord } from './interfaces/LegacyVehicleRecord';
import { NewVehicleRecord } from './interfaces/NewVehicleRecord';
import { PrimitiveTypes } from './interfaces/PrimitiveTypes';

const isObject = (a: unknown): a is object => {
  const type = typeof a;
  return type !== 'function' && type === 'object';
};

const isPrimitive = (a: unknown): a is PrimitiveTypes => {
  return a === null || a.constructor == String || a.constructor == Number || a.constructor == Boolean;
};

const addAttributeToVehicle = (newVehicleRecord: NewVehicleRecord, item: unknown, index: string) => {
  if (isPrimitive(item)) {
    newVehicleRecord[index.toString()] = item;
  } else if (isObject(item)) {
    flattenAttributes(newVehicleRecord, item, index);
  }
};

const flattenAttributes = (newVehicleRecord: NewVehicleRecord, recordPiece: object, prefix: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const [key, value] of Object.entries(recordPiece)) {
    const fullKey = `${prefix}_${key}`;

    if (Array.isArray(value)) {
      value.forEach((arrItem, index) => {
        addAttributeToVehicle(newVehicleRecord, arrItem, `${fullKey}_${index}`);
      });
    } else {
      addAttributeToVehicle(newVehicleRecord, value, fullKey);
    }
  }

  return newVehicleRecord;
};

export const createTimestampRecord = (newImage: LegacyVehicleRecord, legacyTechnicalRecord: LegacyTechnicalRecord) => {
  const newVehicleRecord: NewVehicleRecord = {
    systemNumber: newImage.systemNumber,
    createdTimestamp: legacyTechnicalRecord.createdAt,
  };
    
  for (const [key, value] of Object.entries(newImage)) {
    if (key !== 'techRecord') {
      newVehicleRecord[key.toString()] = value as PrimitiveTypes;
    }
  }
    
  logger.info('flattening techRecord');
  return flattenAttributes(newVehicleRecord, legacyTechnicalRecord, 'techRecord');
};
