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
        "authFailed": "Authentication failed."
    },
    "chat": {
        "queryError": "Error getting chats."
    },
    "user": {
        "queryError": "Error pulling users.",
        "emailError": "Email already in use.",
        "deleteError": "Error deleting user."
    }
}

module.exports = response