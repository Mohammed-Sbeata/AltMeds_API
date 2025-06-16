const managerValidator = require('./manager')
const pharmacyValidator = require('./pharmacy')
const medicineValidator = require('./medicine')
const altMedicineValidator = require('./altMedicine')
module.exports = {
    loginValidator: managerValidator.loginSchema,
    pharmacyValidator: pharmacyValidator, 
    medicineValidator: medicineValidator,
    altMedicineValidator: altMedicineValidator
}