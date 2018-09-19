const alberta = require('./alberta')

const parsers = {
  AB: alberta
}

const standardWell = {
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

function parse (well) {
  // A well must have a region to be considered valid
  if (!well || !well.Region) throw new Error(`.Region not provided`)

  // We use the region to determine how to parse the well
  const region = well.Region

  // Check for a valid region, or throw an error if the region is unsupported
  if (!parsers[region]) throw new Error(`.Region not supported: ${region}`)

  const parsedWell = parsers[region](well)

  const standardizedWell = {
    uuid: well.Uuid,
    primaryHeader: parsedWell.primaryHeader,
    subheader: parsedWell.subheader,
    govId: parsedWell.govId,
    surfaceLocation: parsedWell.surfaceLocation,
    attributes: parsedWell.attributes,
    wellData: well
  }

  return standardizedWell
}

module.exports = {
  parse, standardWell
}
