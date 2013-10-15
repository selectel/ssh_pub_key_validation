var assert = require("assert")
var sshKeyValidation = require('../lib/ssh_pub_key_validation')

var sshKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9AK1tG4AJy0gIo/1Rmbjd3r6MRFb+b6pxT+RUWTOTd1SvT6QswoLoYrl5N/ioaqZ480E2ahmZKe5vVWuS8crZCdPClrYK1qpo5Blvg5uFXWheFRIZm+D016F96pEwbxNB2j0MtvqBqREsk7deVHTpqYGeuvk3d/IAnU+sJ6zRFPxCIwerGMQScZjXg9eeXG5FzUnWdWFm1mAs1wAkvq0SLGdG6ufwMtdqTpP56gHqszfk09l3ot3TOLOGcwRto0ZTfSlTeLYufOH7oDeu0+LYcMx6V8A/ia5yjWhIiq5Y6m4dYQBOrLRv26MMJPznA5HixC++tMW1qGe2Z0VyNUwb max@max-Aspire-5820TG"
var notValidSshKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9AK1tG4AJy0gIo/1Rmbjd3r6MRFb+b6pxT+RUWTOTd1SvT6QswoLoYrl5N/ioaqZ480E2ahmZKe5vVWuS8crZCdPClrYK1qpo5Blvg5uFXWheFRIZm+D016F96pEwbxNB2j0MtvqBqREsk7deVHTpqYGeuvk3d/IAnU+sJ6zRFPxCIwerGMQScZjXg9eeXG5FzUnWdWFm1mAs1wAkvq0SLGdG6ufwMtdqTpP56gHqszfk09l3ot3TOLOGcwRto0ZTfSlTeLYufOH7oDeu0+LYcMx6V8A/ia5yjWhIiq5Y6m4dYQBOrLRv26MMJPznA5HixC++tMW1qGe2Z0VyNUw max@max-Aspire-"

describe("Ssh key validation", function(){
  it("should return true if key is valid", function(){
    assert.equal(sshKeyValidation.isKeyValid(sshKey), true)
  })
  it("should return false if key is not valid", function(){
    assert.equal(sshKeyValidation.isKeyValid(notValidSshKey), false)
  })
})
