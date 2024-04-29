const id        = /^[a-zA-Z0-9\-_]+$/;
const name      = /^([a-zA-Z]+[\s_]*)+$/;
const email     = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const username  = /^[a-z0-9]+$/;
const password  = /^[a-zA-Z0-9]+[\-_#]*$/;
const phrase    = /^([a-zA-Z0-9]+[\s-_#%]*)+$/;
const paragraph = /^([a-zA-Z0-9]+[\s-_#(),.%!@]*)+$/;
const number    = /^[0-9]+$/;
const time      = /^([01][0-9]|2[0-3]):([0-5][0-9])+$/;

export const regExp = {
    id,
    name,
    email,
    username,
    password,
    phrase,
    paragraph,
    number,
    time,
};