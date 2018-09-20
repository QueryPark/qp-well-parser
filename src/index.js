'use strict'

import v1Parser from './v1/index'

var versions = {
  v1: v1Parser
}

function ensureVersion (version) {
  // version here refers to the query park api version, not the version of this package
  var versionOk = false
  var acceptableVersions = [
    'v1'
  ]

  for (var i = 0; i < acceptableVersions.length; i++) {
    var acceptableVersion = acceptableVersions[i]
    if (version === acceptableVersion) {
      versionOk = true
      break
    }
  }

  return versionOk
}

function WellParser (apiVersion) {
  if (typeof apiVersion !== 'string') {
    apiVersion = 'v1'
  }

  var isVersionOk = ensureVersion(apiVersion)

  if (!isVersionOk) {
    throw new Error('Please specify a valid apiVersion')
  }

  function parse (well) {
    return versions[apiVersion].parse(well)
  }

  return Object.assign(parse, {
    valueOf () {
      return versions[apiVersion].standardWell
    },

    get version () {
      return apiVersion
    },

    get apiVersion () {
      return apiVersion
    },

    v1Parse (well) {
      return v1Parser.parse(well)
    }
  })
}

export default WellParser
