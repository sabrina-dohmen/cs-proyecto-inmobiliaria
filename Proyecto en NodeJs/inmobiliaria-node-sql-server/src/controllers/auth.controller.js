// function verifyToken(req, res, next) {
//     const token = req.header('authorization');
//     if (typeof token !== 'undefined') {
//         req.token = token;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

function verifyToken(req, res, next) {
    const token = req.header('authorization');
    if (typeof token !== 'undefined') {
        req.token = token.split(" ")[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}