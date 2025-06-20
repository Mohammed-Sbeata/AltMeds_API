const pharmacyValidator = require('./pharmacy')
const medicineValidator = require('./medicine')
const altMedicineValidator = require('./altMedicine')
module.exports = {
    pharmacyValidator: pharmacyValidator, 
    medicineValidator: medicineValidator,
    altMedicineValidator: altMedicineValidator
}