import test from 'ava'
import WellParser from '../../src'

test('', t => {
  t.pass()
})

const wellParser = WellParser('v1')

const wells = require('../wellData.json')

const standardWell = wellParser.valueOf()

test('valueOf returns the standard well', t => {
  const msg = 'Standard Well should be returned'
  const actual = standardWell
  const expected = {
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
    owner: {
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

      isLatest: true
    },
    wellData: {}
  }
  t.deepEqual(actual, expected, msg)
})

test('Throws if no Region is provided', t => {
  const msg = 'Should return ".Region not provided" error'
  const expected = '.Region not provided'
  try {
    wellParser()
  } catch (err) {
    const actual = err.message
    t.deepEqual(actual, expected, msg)
  }
})

test('Invalid region should fail gracefully', t => {
  const msg = 'Should return ".Region invalid" error'
  const expected = '.Region not supported: FAKE'
  try {
    wellParser({ Region: 'FAKE' })
  } catch (err) {
    const actual = err.message
    t.deepEqual(actual, expected, msg)
  }
})

wells.forEach(well => {
  test('Calling the v1Parse directly should equal calling parse', t => {
    const msg = 'Parse results should be equal'
    const actual = wellParser(well)
    const expected = wellParser.v1Parse(well)
    t.deepEqual(actual, expected, msg)
  })
})

/*
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
  const well = wells[0]
  const actual = wellParser(well)
  const expected = {
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
    owner: {
      label: 'Licensee',
      value: 'HANSAR ENERGY CORP.'
    },
    attributes: {
      country: 'CA',
      region: 'AB',
      coordinates: null,

      wellStatus: 'NPW (C)',
      substance: 'GAS',
      drillDirection: 'DIR',

      isLatest: true
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

test('Correctly parses an AB well (2)', t => {
  const msg = 'Well should be parsed'
  const well = wells[1]
  const actual = wellParser(well)
  const expected = {
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
    owner: {
      label: 'Licensee',
      value: 'HANSAR ENERGY CORP.'
    },
    attributes: {
      country: 'CA',
      region: 'AB',
      coordinates: {
        lat: 12.34567,
        lon: 12.34567
      },

      wellStatus: 'NPW (C)',
      substance: 'GAS',
      drillDirection: 'DIR',

      isLatest: false
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

/*
Create some tests that actually use the real qp api using an internal dev api key
*/
