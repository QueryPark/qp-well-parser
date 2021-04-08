const drillDirection = require( './util/drillDirection')

function txWellParser (wellData) {
  return {
    get primaryHeader () {
      return {
        label: 'FIELD NAME',
        value: wellData.FIELD_NAME
      }
    },

    get subheader () {
      return {
        label: 'UWI',
        value: wellData.UWI
      }
    },

    get govId () {
      return {
        label: 'WELLID',
        value: wellData.PERMIT_NUM
      }
    },

    get surfaceLocation () {
      return {
        label: 'Surface Location',
        value: wellData.SurfaceLocation
      }
    },

    get owner () {
      return {
        label: 'Operator',
        value: wellData.OPERATOR
      }
    },

    get attributes () {
      return {
        region: wellData.Region,
        country: wellData.Country,
        coordinates: wellData.Location
          ? {
            lat: wellData.Location.lat,
            lon: wellData.Location.lon
          } : null,

        wellStatus: wellData.WellMode,
        substance: wellData.WellFluid,
        drillDirection: drillDirection(/* na for now */),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

module.exports =  txWellParser
