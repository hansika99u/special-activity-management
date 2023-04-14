import Reservation from '../models/reservationModel.js';

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createReservation = async (req, res) => {
    try {
        const reservation = req.body;
        const newReservation = new Reservation(reservation);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.query;
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) {
            res.status(404).json({ message: 'Reservation not found' });
        } else {
            res.status(200).json(deletedReservation);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
