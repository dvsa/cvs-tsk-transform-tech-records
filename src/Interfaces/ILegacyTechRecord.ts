interface LegacyKeyStructure {
  [index: string]: string | boolean | number | Array<string> | Array<LegacyKeyStructure> | LegacyKeyStructure;
}

interface LegacyTechRecord {
  systemNumber: string,
  vin: string,
  primaryVrm: string,
  partialVin: string,
  trailerID?: string,
  secondaryVrms: string[]
  techRecord: SingleTechRecord[]
}

interface SingleTechRecord extends LegacyKeyStructure {
  createdAt: string; 
}

export { SingleTechRecord, LegacyTechRecord, LegacyKeyStructure };
