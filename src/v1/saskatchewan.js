import drillDirection from './util/drillDirection'

function saskatchewanWellParser (wellData) {
  const relevantComponent = wellData.Components.reduce((current, component) =>
    (!current.UWI || current.UWI.slice(-2) < component.UWI.slice(-2))
      ? component
      : current, {})

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
        value: relevantComponent.UWI
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
        coordinates: wellData.SurfaceCoordinates
          ? wellData.SurfaceCoordinates
          : null,

        wellStatus: wellData.LaheeClass || null,
        substance: null,
        drillDirection: drillDirection(relevantComponent.Trajectory),

        isLatest: wellData.Next === 'null' || !wellData.Next
      }
    }
  }
}

export default saskatchewanWellParser
