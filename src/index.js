'use strict'

var v1Parser = require('./v1')
var v2Parser = require('./v2')

var versions = {
  v1: v1Parser,
  v2: v2Parser
}

function ensureVersion (version) {
  var versionOk = false
  var acceptableVersions = [
    'v1',
    'v2'
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
    apiVersion = 'v2'
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

module.exports = WellParser
