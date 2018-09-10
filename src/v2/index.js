var alberta = require('./alberta')

var parsers = {
  AB: alberta
}

var standardWell = {
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

function parse (well) {
  var wellData = well.data

  // All wells must have a region (state, province)
  if (!wellData || !wellData.Region) return standardWell
  // We use the region to determine how to parse the well
  var region = wellData.Region
  var parsedWell = parsers[region](wellData)

  var attributes = {
    // region, country, and latest are standard (no need to parse)
    region: region,
    country: wellData.Country,
    latest: wellData.Latest,

    coordinates: parsedWell.coordinates,
    wellStatus: parsedWell.wellStatus,
    owner: parsedWell.owner
  }

  var qpReference = well._internalId
  var standardizedWell = {
    qpReference: qpReference,
    primaryHeader: parsedWell.primaryHeader,
    subheader: parsedWell.subheader,
    govId: parsedWell.govId,
    surfaceLocation: parsedWell.surfaceLocation,
    attributes: attributes,
    wellData: wellData
  }

  return Object.assign({}, standardWell, standardizedWell)
}

module.exports = {
  parse: parse,
  standardWell: standardWell
}
