import test from 'ava'
import WellParser from '../src/index'
const LATEST_VERSION = 'v1'

test('Initiating WellParser with no version defaults to the latest', t => {
  const msg = 'Should default to the latest version'
  const actual = WellParser().apiVersion
  const expected = LATEST_VERSION
  t.deepEqual(actual, expected, msg)
})

test('Throws if provided an invalid version', t => {
  const msg = 'Should throw when provided an invalid version'
  const expected = 'Please specify a valid apiVersion'
  try {
    WellParser('v0')
  } catch (err) {
    const actual = err.message
    t.deepEqual(actual, expected, msg)
  }
})
