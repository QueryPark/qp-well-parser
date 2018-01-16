// 'use strict'

function ensureVersion (version) {
  var versionOk = false
  var acceptableVersions = ['v1']

  for (var i = 0; i < acceptableVersions.length; i++) {
    var acceptableVersion = acceptableVersions[i]
    if (version === acceptableVersion) {
      versionOk = true
      break
    }
  }

  return versionOk
}

console.log(typeof Object.assign)

function WellParser (apiVersion) {
  if (typeof apiVersion !== 'string') {
    apiVersion = 'v1'
  }

  var isVersionOk = ensureVersion(apiVersion)

  if (!isVersionOk) {
    throw new Error('Please specify a valid apiVersion')
  }

  var standardWell = {
    uwi: '',
    wellName: '',
    surfaceLocation: '',
    licensee: '',
    licenseNumber: '',
    country: '',
    stateProvince: ''
  }

  function v1Parse (well) {
    // destruct the well if required
    if (well.data) well = well.data

    var pairs = [
      ['uwi', well['UWI']],
      ['wellName', well['WellName']],
      ['surfaceLocation',
        well['SurfaceLocation'] ||
        well['SurfaceLandDescription']
      ],
      ['licensee',
        well['Licensee'] ||
        well['LicenseeName']
      ],
      ['licenseNumber', well['LicenseNumber']],
      ['country',
        well['Country'] ||
        (well['UWI'] && 'CA')
      ],
      ['stateProvince',
        well['StateProvince'] ||
        (well['SKUWI'] && 'SK')
      ]
    ]

    var standardizedWell = {}

    // avoid array methods (browser inconsistencies)
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]
      var key = pair[0]
      var value = pair[1]
      if (typeof value !== 'string') continue

      standardizedWell[key] = value
    }

    return Object.assign({}, standardWell, standardizedWell)
  }

  function parse (well) {
    switch (apiVersion) {
      case 'v1':
        return v1Parse(well)
    }
  }

  return Object.assign({}, parse, {
    valueOf: function () {
      return standardWell
    },

    get version () {
      return apiVersion
    },

    get apiVersion () {
      return apiVersion
    },

    v1Parse: function (well) {
      return v1Parse(well)
    }
  })
}

module.exports = WellParser
