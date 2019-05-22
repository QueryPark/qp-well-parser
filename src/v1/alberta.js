import drillDirection from './util/drillDirection'

function albertaWellParser (wellData) {
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
        label: 'License Number',
        value: wellData.LicenseNumber
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
        label: 'Licensee',
        value: wellData.LicenseeName
      }
    },

    get attributes () {
      return {
        region: wellData.Region,
        country: wellData.Country,
        coordinates: wellData.SurfaceCoordinates
          ? {
            lat: wellData.SurfaceCoordinates.lat,
            lon: wellData.SurfaceCoordinates.lon
          } : null,

        wellStatus: wellData.LaheeClassification,
        substance: wellData.Substance,
        drillDirection: drillDirection(wellData.DrillingOperation),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

export default albertaWellParser
