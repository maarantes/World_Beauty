const jwt = require('jsonwebtoken');

function PegarTokenUsuario(req, res, next) {
    // Pegar o token do header da requisição
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401); // Se não houver token, retornar um erro 401 

    jwt.verify(token, "world_beauty", (err, user) => {
        if (err) return res.sendStatus(403); // Se o token for inválido, retornar um erro 403
        req.user = user;
        next();
    });
}

module.exports = PegarTokenUsuario;
