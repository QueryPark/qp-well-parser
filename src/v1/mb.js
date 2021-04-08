const drillDirection = require( './util/drillDirection')

function mbWellParser (wellData) {
  return {
    get primaryHeader () {
      return {
        label: 'WELL NAME',
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
        label: 'WELLID',
        value: wellData.WELLID
      }
    },

    get surfaceLocation () {
      return {
        label: 'Surface Location',
        value: wellData.Location
      }
    },

    get owner () {
      return {
        label: 'Operator',
        value: wellData.Company
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

module.exports =  mbWellParser
