const test = require('ava')
const WellParser = require('../src/index.js')

test('', t => {
  t.pass()
})

const wellParser = WellParser('v2')

const wells = require('./wellData.json')

const standardWell = wellParser.valueOf()

test('valueOf returns the standard well', t => {
  const msg = 'Standard Well should be returned'
  const actual = standardWell
  const expected = {
    qpReference: '',
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
        lat: '',
        lon: ''
      },
      wellStatus: '',
      owner: '',
      latest: ''
    },
    wellData: {}
  }
  t.deepEqual(actual, expected, msg)
})

test('Returns the standard well on an empty parse', t => {
  const msg = 'Well should be parsed'
  const well = wells[0]
  const actual = wellParser(well)
  const expected = standardWell
  t.deepEqual(actual, expected, msg)
})

/*
wells.forEach(well => {
  test('Calling the v1Parse directly should equal calling parse', t => {
    const msg = 'Parse results should be equal'
    const actual = wellParser(well)
    const expected = wellParser.v1Parse(well)
    t.deepEqual(actual, expected, msg)
  })
})

test('Correctly parses an SK well', t => {
  const msg = 'Well should be parsed'
  const well = wells[1]
  const actual = wellParser(well)
  const expected = {
    uwi: '102/01-06-030-20W3/00',
    wellName: '',
    surfaceLocation: '01-07-030-20W3',
    licensee: 'CRESCENT POINT ENERGY CORP.',
    licenseNumber: '84673',
    country: 'CA',
    stateProvince: 'SK'
  }
  t.deepEqual(actual, expected, msg)
})
*/

test('Correctly parses an AB well', t => {
  const msg = 'Well should be parsed'
  const well = wells[2]
  const actual = wellParser(well)
  const expected = {
    qpReference: '1414130400000-0470862',
    primaryHeader: {
      label: 'Well Name',
      value: 'CVE 2-7 HZ ALDSON 1-1-16-15'
    },
    subheader: {
      label: 'UWI',
      value: '100/01-01-016-15W4/00'
    },
    govId: {
      label: 'License Number',
      value: '0470862'
    },
    surfaceLocation: {
      label: 'Surface Location',
      value: '02-07-016-14W4'
    },
    attributes: {
      country: 'CA',
      region: 'AB',
      coordinates: {
        lat: 50.32366744872713,
        lon: -111.91887171145898
      },
      wellStatus: 'PRODUCTION',
      owner: 'CENOVUS ENERGY INC.',
      latest: '1414130400000-0470862'
    },
    wellData: {
      'IssuanceDate': 1414130400000,
      'StatusDate': 1414130400000,
      'LicenseStatus': 'Issued',
      'WellName': 'CVE 2-7 HZ ALDSON 1-1-16-15',
      'LicenseNumber': '0470862',
      'MineralRights': 'FREEHOLD',
      'GroundElevation': 797.6,
      'UWI': '100/01-01-016-15W4/00',
      'ProjectedDepth': 2875.5,
      'BoardFieldCentre': 'MEDICINE HAT',
      'SurfaceCoordinates': 'N 102.0M W 745.8M',
      'LaheeClassification': 'DEV (NC)',
      'Field': 'ALDERSON',
      'TerminatingZone': 'GLAUCONITIC SS',
      'DrillingOperation': 'HORIZONTAL',
      'WellPurpose': 'NEW',
      'WellType': 'PRODUCTION',
      'Substance': 'CRUDE OIL',
      'Licensee': 'CENOVUS ENERGY INC.',
      'SurfaceLocation': '02-07-016-14W4',
      'StateProvince': 'AB',
      'Country': 'CA',
      'Region': 'AB',
      'SurfaceEW': -745.8,
      'SurfaceNS': 102,
      'Location': {
        'Lon': -111.91887171145898,
        'Lat': 50.32366744872713
      },
      'Latest': '1414130400000-0470862'
    }
  }
  t.deepEqual(actual, expected, msg)
})

/*
Create some tests that actually use the real qp api using an internal dev api key
*/
