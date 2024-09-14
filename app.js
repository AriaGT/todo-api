const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
