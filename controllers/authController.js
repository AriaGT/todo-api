const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let {
            password: userPassword,
            ...userData
        } = await prisma.user.findUnique({
            where: { email: email.toLocaleString() },
        });

        if (!userData) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, userPassword);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: userData.id },
            process.env.JWT_SECRET, // En producción, usa una variable de entorno
            { expiresIn: '1h' }
        );

        res.json({ user: userData, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
