const express = require('express')
const router = express.Router()

const { 
    userAll, 
    updateUser, 
    changeRole, 
    changeStatus, 
    deleteUser, 
    userResume, 
    userData, 
    resumeId,
    getUserId,
    countUser} = require('../controllers/user')
const { authCheck, adminCheck } = require('../middleware/authCheck')

router.get('/userAll',authCheck, adminCheck, userAll)
router.put('/updateUser/:id',authCheck, adminCheck, updateUser)
router.put('/changRole',authCheck, adminCheck, changeRole)
router.put('/changStatus',authCheck, adminCheck, changeStatus)
router.delete('/deleteUser/:id',authCheck, adminCheck, deleteUser)
router.get('/getResume/:id',authCheck, userResume)
router.get('/userData/:id', authCheck, userData)
router.get('/resumeID/:id', authCheck, resumeId)
router.get('/userId/:id', authCheck, adminCheck, getUserId)
router.get('/count', authCheck, adminCheck, countUser)

module.exports = router

