const test = require('ava')
const WellParser = require('../src/index.js')

const wellParser = WellParser('v1')

const wells = require('./wellData.json')

const standardWell = wellParser.valueOf()

test('valueOf returns the standard well', t => {
  const msg = 'Standard Well should be returned'
  const actual = standardWell
  const expected = {
    uwi: '',
    wellName: '',
    surfaceLocation: '',
    licensee: '',
    licenseNumber: '',
    country: '',
    stateProvince: ''
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

test('Correctly parses an AB well', t => {
  const msg = 'Well should be parsed'
  const well = wells[2]
  const actual = wellParser(well)
  const expected = {
    uwi: '100/01-01-016-15W4/00',
    wellName: 'CVE 2-7 HZ ALDSON 1-1-16-15',
    surfaceLocation: '02-07-016-14W4',
    licensee: 'CENOVUS ENERGY INC.',
    licenseNumber: '0470862',
    country: 'CA',
    stateProvince: 'AB'
  }
  t.deepEqual(actual, expected, msg)
})
