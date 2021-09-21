exports.omitUserDetails = (doc, obj) => {
    delete obj.__v;
    delete obj.accessToken;
    delete obj.refreshToken;
    return obj
}