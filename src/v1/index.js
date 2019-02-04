import bc from './bc'
import alberta from './alberta'
import saskatchewan from './saskatchewan'

const parsers = {
  BC: bc,
  AB: alberta,
  SK: saskatchewan
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
    owner: parsedWell.owner,
    attributes: parsedWell.attributes,
    wellData: well
  }

  return standardizedWell
}

export default {
  parse, standardWell
}
