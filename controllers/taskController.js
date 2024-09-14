const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTask = async (req, res) => {
    const { userId } = req.user;
    const { name, description, deadline } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                name,
                description,
                deadline: new Date(deadline),
                userId,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const { userId } = req.user;
        const tasks = await prisma.task.findMany({
            where: { userId }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, deadline } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { name, description, deadline: new Date(deadline) },
        });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
