var AV = require('leancloud-storage');
var APP_ID = 'Cq846eABT06Jse8YwqavT0Aj-gzGzoHsz';
var APP_KEY = 'P7GhyCurG4aX3b3Q5iaISRAg';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV

export function signUp(username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);

    user.signUp().then(function (loggedInUser) {
        let user = getUserFromAVUser(loggedInUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    });


    return undefined
}

export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function signOut() {
    AV.User.logOut()
    return undefined
}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}
