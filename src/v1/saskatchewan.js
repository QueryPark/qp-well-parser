import drillDirection from './util/drillDirection'

function saskatchewanWellParser (wellData) {
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
        label: 'Surface Land Description',
        value: wellData.SurfaceLandDescription
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
        coordinates: wellData.Location
          ? {
            lat: wellData.Location.Lat,
            lon: wellData.Location.Lon
          } : null,

        wellStatus: wellData.LaheeClass,
        substance: null,
        drillDirection: drillDirection(wellData.Trajectory),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

export default saskatchewanWellParser
