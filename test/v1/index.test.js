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
  t.log(well.SurfaceCoordinates)
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

test('Correctly parses a SK well (1)', t => {
  const msg = 'Well should be parsed'
  const well = wells[3]
  const actual = wellParser(well)
  const expected = {
    uuid: '5c27fb41eff7bf1498a4d4e5d97b046c0cae7222',
    primaryHeader: {
      label: 'Well Name',
      value: 'VOC ET AL NORTH PORTAL HZ 3D16-1-3A1-1-1-4'
    },
    subheader: {
      label: 'UWI',
      value: 'SK WI 191010100104W200'
    },
    govId: {
      label: 'License Number',
      value: '12L264'
    },
    surfaceLocation: {
      label: 'Surface Land Description',
      value: '16-01-001-04W2'
    },
    owner: {
      label: 'Licensee',
      value: 'CRESCENT POINT ENERGY CORP.'
    },
    attributes: {
      country: 'CA',
      region: 'SK',
      coordinates: {
        lat: 49.0127449,
        lon: -102.41203308
      },
      wellStatus: null,
      substance: null,
      drillDirection: 'HZ',
      isLatest: true
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

test('Correctly parses a SK well (2)', t => {
  const msg = 'Well should be parsed'
  const well = wells[4]
  const actual = wellParser(well)
  const expected = {
    uuid: '813531c66630903152f2671713ba298e8e4cfe34',
    primaryHeader: {
      label: 'Well Name',
      value: 'ALDON OILS LTD. HZ 12-11-6-7 4-11-6-7'
    },
    subheader: {
      label: 'UWI',
      value: 'SK WI 104041100607W202'
    },
    govId: {
      label: 'License Number',
      value: '100000'
    },
    surfaceLocation: {
      label: 'Surface Land Description',
      value: '12-11-006-07W2'
    },
    owner: {
      label: 'Licensee',
      value: 'ALDON OILS LTD.'
    },
    attributes: {
      country: 'CA',
      region: 'SK',
      coordinates: {
        lat: 49.45926285,
        lon: -102.85360718
      },
      wellStatus: 'Dev Well',
      substance: null,
      drillDirection: 'HZ',
      isLatest: true
    },
    wellData: well
  }
  t.deepEqual(actual, expected, msg)
})

/*
Create some tests that actually use the real qp api using an internal dev api key
*/
