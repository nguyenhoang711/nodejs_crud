const USER_NAME = /^(?=.*[a-zA-Z])(?=.*[!.@#$%^&_])[A-Za-z\d!.@#$%^&_]+$/;
const EMAIL = /^[A-Za-z0-9](\.?[A-Za-z0-9]){5,}@gmail\.com$/;
const NAME = /^[^\d\/_!@#$%^&*.~_]+$/;
const REGEX_PASSWORD = 
// 1thuong   1 hoa     1 so      1 ki tu dac biet                            con lai
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_])[A-Za-z\d~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_]{6,15}$/;
const VALIDATED_DATE = /^\b(0?[1-9]|[12]\d|3?[01])[\-](0?[1-9]|1?[012])[\-](1?9?[0-9]{2}|2?[0-9]{3}){2}\b$/;
module.exports = {
    USER_NAME,
    EMAIL,
    NAME,
    REGEX_PASSWORD,
    VALIDATED_DATE
}