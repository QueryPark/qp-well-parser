import test from 'ava'
import drillDirection from '../../../src/v1/util/drillDirection'

test('Parses vertical words', t => {
  const msg = 'VT should be returned'
  const words = [
    'VERTICAL',
    'vertical',
    'VERT',
    'vert',
    'VT',
    'vt'
  ]

  const actual = words.map(drillDirection)
  const expected = Array(words.length).fill('VT')

  t.deepEqual(actual, expected, msg)
})

test('Parses horizontal words', t => {
  const msg = 'HZ should be returned'
  const words = [
    'HORIZONTAL',
    'horizontal',
    'HORZ',
    'horz',
    'HZ',
    'hz'
  ]

  const actual = words.map(drillDirection)
  const expected = Array(words.length).fill('HZ')

  t.deepEqual(actual, expected, msg)
})

test('Parses directional words', t => {
  const msg = 'DIR should be returned'
  const words = [
    'DIRECTIONAL',
    'directional',
    'DIR',
    'dir'
  ]

  const actual = words.map(drillDirection)
  const expected = Array(words.length).fill('DIR')

  t.deepEqual(actual, expected, msg)
})

test('Parses slant words', t => {
  const msg = 'SLT should be returned'
  const words = [
    'SLANT',
    'slant',
    'SLT',
    'slt'
  ]

  const actual = words.map(drillDirection)
  const expected = Array(words.length).fill('SLT')

  t.deepEqual(actual, expected, msg)
})

test('Otherwise, returns false', t => {
  const msg = 'false should be returned'
  const invalids = [
    undefined, null,
    '', 'ANY',
    -1, 0, 1,
    [], {},
    () => {}
  ]

  const actual = invalids.map(drillDirection)
  const expected = Array(invalids.length).fill(false)

  t.deepEqual(actual, expected, msg)
})
