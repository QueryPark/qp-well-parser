var standardWell = {
  uwi: '',
  wellName: '',
  surfaceLocation: '',
  licensee: '',
  licenseNumber: '',
  country: '',
  stateProvince: ''
}

function parse (well) {
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

module.exports = {
  parse: parse,
  standardWell: standardWell
}
