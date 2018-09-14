# qp-well-parser
A helper function that parses wells from the api into a standard format


## Usage

Importing:

```js
const WellParser = require('qp-well-parser')
// import WellParser from 'qp-well-parser'

// initialize the parser to use a specific QueryPark api version
// defaults to latest
const wellParser = WellParser('v1')
```

### API

#### version

```js
console.log(wellParser.apiVersion) // v1
```

#### parse

```js
const standardWell = wellParser.valueOf()
console.log(standardWell)
/*
{
  uuid: '',
  primaryHeader: {
    label: '',
    value: ''
  },
  subheader: {
    label: '',
    value: ''
  },
  govId: {
    label: '',
    value: ''
  },
  surfaceLocation: {
    label: '',
    value: ''
  },
  attributes: {
    country: '',
    region: '',
    coordinates: {
      lat: 0,
      lon: 0
    },
    wellStatus: '',
    substance: '',
    drillDirection: '',
    owner: '',

    isLatest: true
  },
  wellData: {}
}
*/

const well = {
  "FieldCenter": "Medicine Hat",
  "WellName": "HANSAR ENERGY DD CHINCO 1-1-8-13",
  "LicenseNumber": "0443004",
  "DrillingOperation": "DIRECTIONAL",
  "UWI": "100/01-01-008-13W4/00",
  "WellType": "PRODUCTION",
  "ProjectedDepth": 1132,
  "TerminatingZone": "LIVINGSTONE FM",
  "Field": "UNDEFINED",
  "GroundElevation": 847.4,
  "WellPurpose": "NEW",
  "LaheeClassification": "NPW (C)",
  "MineralRights": "ALBERTA CROWN",
  "CreatedDate": 1326870000000,
  "SurfaceCoordinates": "N 395.8M W 546.8M",
  "Substance": "GAS",
  "SurfaceLocation": "02-01-008-13W4",
  "Licensee": "HANSAR ENERGY CORP.",
  "Uuid": "30d3c778-ef5e-44b4-903e-3daa26c291b5",
  "Region": "AB",
  "Country": "CA",
  "StatusDate": 1330637400000,
  "Next": "null",
  "Prev": "32e919af-3744-4eb1-a4d1-3846e8f6a264",
  "LicenseeName": "Hansar Energy Corp.",
  "ActivityType": "Drill To LD",
  "ContractorCode": "0ZM7",
  "ContractorName": "Champion Drilling Inc.",
  "LicenseeCode": "A645",
  "RigNumber": "333"
}

const parsedWell = wellParser(well)
// const parsedWell = wellParser.v1Parse(well)

console.log(parsedWell)
/*
{
  uuid: '30d3c778-ef5e-44b4-903e-3daa26c291b5',
  primaryHeader: {
    label: 'Well Name',
    value: 'HANSAR ENERGY DD CHINCO 1-1-8-13'
  },
  subheader: {
    label: 'UWI',
    value: '100/01-01-008-13W4/00'
  },
  govId: {
    label: 'License Number',
    value: '0443004'
  },
  surfaceLocation: {
    label: 'Surface Location',
    value: '02-01-008-13W4'
  },
  attributes: {
    country: 'CA',
    region: 'AB',
    coordinates: null,

    wellStatus: 'NPW (C)',
    substance: 'GAS',
    drillDirection: 'DIRECTIONAL',
    owner: 'HANSAR ENERGY CORP.',

    isLatest: true
  },
  wellData: { ... }
}
*/
```
