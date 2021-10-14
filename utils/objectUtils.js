exports.omitUserDetails = (doc, obj) => {
    delete obj.__v;
    delete obj.accessToken;
    delete obj.refreshToken;
    delete obj.password;
    delete obj.accessScopes
    return obj
};