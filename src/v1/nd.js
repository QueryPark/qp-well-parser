const drillDirection = require( './util/drillDirection')

function ndWellParser (wellData) {
  return {
    get primaryHeader () {
      return {
        label: 'FIELD NAME',
        value: wellData.FieldName
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
        value: wellData.Coordinates
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
            lat: (wellData.Coordinates.split('lat')[1]).split('lon')[0],
            lon: (wellData.Coordinates.split('lat')[1]).split('lon')[1]
          } : null,

        wellStatus: wellData.Status,
        substance: wellData.WellFluid,
        drillDirection: drillDirection(/* na for now */),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

module.exports =  ndWellParser
