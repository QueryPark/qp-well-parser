import test from 'ava'
import WellParser from '../../src'

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

test('Calling the v1Parse directly should equal calling parse', t => {
  const msg = 'Parse results should be equal'
  wells.forEach(well => {
    const actual = wellParser(well)
    const expected = wellParser.v1Parse(well)
    t.deepEqual(actual, expected, msg)
  })
})

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
      value: 'Hansar Energy Corp.'
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
      value: 'Hansar Energy Corp.'
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

test('Correctly parses a BC well', t => {
  const msg = 'Well should be parsed'
  const well = wells[2]
  const actual = wellParser(well)
  const expected = {
    uuid: '1b9277cd-376d-48bb-bf55-827f082206cd',
    primaryHeader: {
      label: 'Well Name',
      value: 'TAQA NORTH   DRAKE C- 089-J/094-A-16'
    },
    subheader: {
      label: 'UWI',
      value: '200C089J094A1602'
    },
    govId: {
      label: 'Well Authorization',
      value: '20609'
    },
    surfaceLocation: {
      label: 'Surface Location',
      value: 'C- 089-J/094-A-16'
    },
    owner: {
      label: 'Operator Abbreviation',
      value: 'TAQA NORTH'
    },
    attributes: {
      country: 'CA',
      region: 'BC',
      coordinates: {
        lat: 56.989252116743806,
        lon: -120.23508913272731
      },

      wellStatus: 'ABAN',
      substance: 'UND',
      drillDirection: false,

      isLatest: true
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

test('Correctly parses a SK well', t => {
  const msg = 'Well should be parsed'
  const well = wells[3]
  const actual = wellParser(well)
  const expected = {
    uuid: 'a3b6d939-d9d1-4a4d-a4c5-ab36b4d550d8',
    primaryHeader: {
      label: 'Well Name',
      value: 'NORTHERN BLIZZARD RESOURCES INC. HZ 15-22-42-25 7-22-42-25'
    },
    subheader: {
      label: 'UWI',
      value: 'SK WI 101072204225W300'
    },
    govId: {
      label: 'License Number',
      value: '50241'
    },
    surfaceLocation: {
      label: 'Surface Land Description',
      value: '15-22-042-25W3'
    },
    owner: {
      label: 'Licensee',
      value: 'NORTHERN BLIZZARD RESOURCES INC.'
    },
    attributes: {
      country: 'CA',
      region: 'SK',
      coordinates: null,

      wellStatus: 'Dev Well',
      substance: null,
      drillDirection: 'HZ',

      isLatest: false
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

/*
Create some tests that actually use the real qp api using an internal dev api key
*/
