const authRouter = require('./auth')
const pharmacyRouter = require('./pharmacy')
const medicineRouter = require('./medicine')
const altMedicineRouter = require('./altMedicine')
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.status(200).json({
            status: true,
            message: null,
        })
    })


    app.use('/auth', authRouter);
    app.use('/pharmacy', pharmacyRouter);
    app.use('/medicine', medicineRouter);
    app.use('/altMedicine', altMedicineRouter);

}