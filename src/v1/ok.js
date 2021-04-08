const drillDirection = require( './util/drillDirection')

function okWellParser (wellData) {
  return {
    get primaryHeader () {
      return {
        label: 'Well NAME',
        value: wellData.WellName
      }
    },

    get subheader () {
      return {
        label: 'UWI',
        value: wellData.Api
      }
    },

    get govId () {
      return {
        label: 'WELLID',
        value: wellData.WELLID
      }
    },

    get surfaceLocation () {
      return {
        label: 'Surface Location',
        value: wellData.surfaceLocation
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
        coordinates: wellData.Coordinates
          ? {
            lat: wellData.Location.split(',')[0],
            lon: wellData.Location.split(',')[1]
          } : null,

        wellStatus: wellData.Status,
        substance: wellData.WellFluid,
        drillDirection: drillDirection(/* na for now */),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

module.exports =  okWellParser
