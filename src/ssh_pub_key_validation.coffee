isKeyValid = (rawKey) ->

  getBytesAndSplit = (bytes) ->
    sizeLen = 4  # size represent is always 4 bytes in BE
    return false if bytes.length < sizeLen + 1
    # split integer body size and other bytes(body and other integers)
    sizeBytes = bytes[...sizeLen]
    bytesAndTail = bytes[sizeLen..]
    # get body size in bytes (BE)
    size = (((sizeBytes.charCodeAt(0) << (8 * 3)) +
      (sizeBytes.charCodeAt(1) << (8 * 2))) +
      (sizeBytes.charCodeAt(2) << (8 * 1)) +
      (sizeBytes.charCodeAt(3) << (8 * 0)))
    # fail there is no enough bytes in body
    return false if bytesAndTail.length < size
    integerBytes = bytesAndTail[...size]
    tail = bytesAndTail[size..]
    # and return body of integer and remaining bytes
    [integerBytes, tail]

  checkIntregers = (num, bytes) ->
    # check correct numbers count in binary body
    for _intNum in [0...num]
      # try to get one integer
      result = getBytesAndSplit bytes
      return false if result is false
      [_int, bytes] = result  # and repeat with tail
    return bytes.length is 0  # fail if somethink stay in body

  # get human type representation, base64 encoded binary body and
  # optional comment
  keyTokens = rawKey.trim().split " "
  return false if keyTokens.length < 2  # fail if no type or body
  [humanType, keyBase64, _textTail] = keyTokens
  # fail if format is not supported
  return false unless humanType in ["ssh-rsa", "ssh-dss"]
  try
    # decode base64 body
    keyBytes = atob keyBase64
  catch error
    return false
  # parse binary format type
  typeSizeParse = getBytesAndSplit keyBytes
  return false unless typeSizeParse  # fail if no parse
  [_type, keyBody] = typeSizeParse
  switch humanType
    # for RSA body is 2 numbers
    when "ssh-rsa" then checkIntregers 2, keyBody
    # and 4 for DSA
    when "ssh-dss" then checkIntregers 4, keyBody
    else false

if typeof module != "undefined" and module.exports
  atob = require "atob"
  module.exports.isKeyValid = isKeyValid
