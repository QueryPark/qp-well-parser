const drillDirection = require( './util/drillDirection')

function coWellParser (wellData) {
  return {
    get primaryHeader () {
      return {
        label: 'Well Name',
        value: wellData.WellName
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
        label: 'Well Authorization',
        value: wellData.WellAuthorization
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
        value: wellData.Operator
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

module.exports =  coWellParser
