// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Паёми навро нигоҳ доштан
router.post('/contacts', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Ҳамаи майдонҳоро пур кунед'
            });
        }

        // Эҷод кардани паёми нав
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();

        // Опционалӣ: Email-и огоҳӣ фиристодан
        // await sendEmailNotification(contact);

        res.status(201).json({
            success: true,
            message: 'Паёми шумо бо муваффақият ирсол шуд!',
            data: contact
        });

    } catch (error) {
        console.error('Хатогӣ дар нигоҳдории паём:', error);
        res.status(500).json({
            success: false,
            message: 'Хатогӣ дар сервер',
            error: error.message
        });
    }
});

// GET - Гирифтани ҳамаи паёмҳо (барои Admin)
router.get('/contacts', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = status ? { status } : {};

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Хатогӣ дар гирифтани паёмҳо',
            error: error.message
        });
    }
});

// GET - Гирифтани паёми муайян
router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Паём ёфт нашуд'
            });
        }

        // Нишон додан ки паём хонда шуд
        if (contact.status === 'new') {
            contact.status = 'read';
            await contact.save();
        }

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Хатогӣ',
            error: error.message
        });
    }
});

// PUT - Ҷавоб додан ба паём (барои Admin)
router.put('/contacts/:id/reply', async (req, res) => {
    try {
        const { reply } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                reply,
                status: 'replied',
                repliedAt: new Date()
            },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Паём ёфт нашуд'
            });
        }

        // Опционалӣ: Email-и ҷавоб фиристодан
        // await sendReplyEmail(contact);

        res.json({
            success: true,
            message: 'Ҷавоб ирсол шуд',
            data: contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Хатогӣ',
            error: error.message
        });
    }
});

// DELETE - Нобуд кардани паём
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Паём ёфт нашуд'
            });
        }

        res.json({
            success: true,
            message: 'Паём нест карда шуд'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Хатогӣ',
            error: error.message
        });
    }
});

module.exports = router;