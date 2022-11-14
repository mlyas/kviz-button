import * as fs from 'fs';

const USER_MODS = {
    DEFAULT_USER: 'default-user',
    ADMINISTRATOR: 'admin'
}
const userList = []
const pressedUsers = []
let isRegistrationActive = true
const adminKey = USER_MODS.ADMINISTRATOR;

const __path__ = 'back/services/';
const usersFileName = 'users.json';

const saveUserListToFile = () => {
    fs.writeFile( `${__path__}${usersFileName}`, JSON.stringify(userList), 'utf8', ()=> {});
}

fs.readFile(`${__path__}${usersFileName}`, 'utf8', (err, data) => {
    if (data) userList.push(...JSON.parse(data))
});

async function isRegistered({ uuid }) {
    const user = userList.find(el => el.uuid === uuid)

    const isRegistered = Boolean(user)
    return { isRegistered, teamTitle: user?.teamTitle }
}

async function signUp(params, trigger) {
    if (!isRegistrationActive) return { mode: 'error' }
    if (params.teamTitle === adminKey) return { mode: USER_MODS.ADMINISTRATOR }

    if (userList.find(el => el.uuid === params.uuid)) throw Error('Ошибка регистрации')

    userList.push(params)

    trigger({event: 'updateUserList', payload: {}})

    saveUserListToFile()

    return { mode: USER_MODS.DEFAULT_USER }
}

async function getUserList() {
    return { userList }
}

async function clearUserList() {
    userList.length = 0;
    saveUserListToFile()
    return 'SUCCESS'
}

async function clearFromUserList({ uuid }) {
    const index = userList.findIndex(el => el.uuid = uuid)
    userList.splice(index, 1)
    saveUserListToFile()
    return 'SUCCESS'
}

async function toggleRegistration({ isActive }) {
    if (isActive !== undefined) isRegistrationActive = isActive
    return { isRegistrationActive }
}

async function pressButton({ uuid }, trigger) {
    const user = userList.find(el => el.uuid === uuid)
    if (pressedUsers.findIndex(el => el.uuid === uuid) !== -1) pressedUsers.push(user)
    trigger({event: 'updatePressedUsers', payload: {}})
    return { users: pressedUsers }
}

async function getPressedUsers() {
    return { pressedUsers }
}

export default {
    signUp,
    isRegistered,
    getUserList,
    clearUserList,
    clearFromUserList,
    toggleRegistration,
    pressButton,
    getPressedUsers,
}
