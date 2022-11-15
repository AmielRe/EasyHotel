const response = {
    "status" : {
        "200" : "OK !",
        "500" : "Something has happend"
    },
    "admin" : {
        "getRolesError": "Failed to aggregate ..., Please try again"
    },
    "auth": {
        "loginError": "User not found.",
        "authFailed": "Authentication failed.",
        "invalidToken": "Invalid token",
        "invalidRole": "Invalid role"
    },
    "chat": {
        "queryError": "Error getting chats."
    },
    "user": {
        "queryError": "Error pulling users.",
        "emailError": "Email already in use.",
        "deleteError": "Error deleting user."
    },
    "verification": {
        "emailError": "Invalid email",
        "firstNameError": "Invalid first name",
        "lastNameError": "Invalid last name",
        "cartError": "Invalid cart data"
    },
    "file": {
        "parse": "Error parsing json file",
        "saving": "Error saving file"
    }
}

module.exports = response