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

    get coordinates () {
      return {
        lat: wellData.Location.Lat,
        lon: wellData.Location.Lon
      }
    },

    get wellStatus () {
      return wellData.WellType
    },

    get owner () {
      return wellData.Licensee
    }
  }
}

module.exports = albertaWellParser
