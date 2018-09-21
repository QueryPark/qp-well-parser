function drillDirectionParser (drillDirection) {
  if (typeof drillDirection !== 'string') {
    // not a string; early fail
    return false
  }

  let drillCode

  // Return Value | Meaning
  // -------------|----------------------
  // VT           | Vertical Wellbore
  // HZ           | Horizontal Wellbore
  // DIR          | Directional Wellbore
  // SLT          | Slanted Wellbore
  // false        | Unknown Wellbore
  switch (drillDirection.toLowerCase()) {
    case 'vt':
    case 'vert':
    case 'vertical':
      drillCode = 'VT'
      break
    case 'hz':
    case 'horz':
    case 'horizontal':
      drillCode = 'HZ'
      break
    case 'dir':
    case 'directional':
      drillCode = 'DIR'
      break
    case 'slt':
    case 'slant':
      drillCode = 'SLT'
      break
    default:
      drillCode = false
      break
  }

  return drillCode
}

export default drillDirectionParser
