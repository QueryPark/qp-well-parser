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
  uwi: '',
  wellName: '',
  surfaceLocation: '',
  licensee: '',
  licenseNumber: '',
  country: '',
  stateProvince: ''
}
*/

const well = {
  "data": {
    "IssuanceDate": 1414130400000,
    "StatusDate": 1414130400000,
    "LicenseStatus": "Issued",
    "WellName": "CVE 2-7 HZ ALDSON 1-1-16-15",
    "LicenseNumber": "0470862",
    "MineralRights": "FREEHOLD",
    "GroundElevation": 797.6,
    "UWI": "100/01-01-016-15W4/00",
    "ProjectedDepth": 2875.5,
    "BoardFieldCentre": "MEDICINE HAT",
    "SurfaceCoordinates": "N 102.0M W 745.8M",
    "LaheeClassification": "DEV (NC)",
    "Field": "ALDERSON",
    "TerminatingZone": "GLAUCONITIC SS",
    "DrillingOperation": "HORIZONTAL",
    "WellPurpose": "NEW",
    "WellType": "PRODUCTION",
    "Substance": "CRUDE OIL",
    "Licensee": "CENOVUS ENERGY INC.",
    "SurfaceLocation": "02-07-016-14W4",
    "StateProvince": "AB",
    "Country": "CA",
    "SurfaceEW": -745.8,
    "SurfaceNS": 102,
    "location": {
      "lon": -111.91887171145898,
      "lat": 50.32366744872713
    }
  },
  "_internalId": "1414130400000-0470862"
}

const parsedWell = wellParser(well)
// const parsedWell = wellParser.v1Parse(well)

console.log(parsedWell)
/*
{ 
  uwi: '100/01-01-016-15W4/00',
  wellName: 'CVE 2-7 HZ ALDSON 1-1-16-15',
  surfaceLocation: '02-07-016-14W4',
  licensee: 'CENOVUS ENERGY INC.',
  licenseNumber: '0470862',
  country: 'CA',
  stateProvince: 'AB'
  }
*/
```