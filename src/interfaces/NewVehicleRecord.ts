import { PrimitiveTypes } from './PrimitiveTypes';

export interface NewVehicleRecord {
  [index: string]: PrimitiveTypes | Array<string>;
}
