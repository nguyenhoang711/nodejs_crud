function canCreateDep(user) {
    return user.role === 'ADMIN';
}

module.exports = {
    canCreateDep
}