import { PrimitiveTypes } from './PrimitiveTypes';

interface LegacyIndexSignature {
  [index: string]: PrimitiveTypes | string[] | LegacyIndexSignature[] | LegacyIndexSignature;
}

interface LegacyVehicleRecord {
  systemNumber: string,
  vin: string,
  primaryVrm?: string,
  partialVin: string,
  trailerID?: string,
  secondaryVrms: string[]
  techRecord: LegacyTechnicalRecord[]
}

interface LegacyTechnicalRecord extends LegacyIndexSignature {
  createdAt: string; 
}

export { LegacyTechnicalRecord, LegacyVehicleRecord, LegacyIndexSignature };
