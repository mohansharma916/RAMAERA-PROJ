const router = require("express").Router();
const { generateToken } = require("./utils");
const passport = require("passport");
const { prisma } = require("@prisma/client");


router.post("/signup", (req, res, next) => {
passport.authenticate("signup", { session: false }, (err, user, info) => {
// Check for errors
if (err) throw new Error(err);
// Generate token
const token = generateToken(user.id);
return res.status(201).json({
status: "success",
data: {
message: "Account created.",
user,
token
},
statusCode: res.statusCode
});
})(req, res, next);
});
router.post("/login", (req, res, next) => {
passport.authenticate("login", 
    { session: false }, 
    (err, user, info) => {
// Check for errors
if (err) throw new Error(err);
// Generate token
const token = generateToken(user.id);
return res.status(201).json({
status: "success",
data: {
message: "Welcome back.",
user,
token
},
statusCode: res.statusCode
});
})(req, res, next);
});


router.put("/kyc/:id",async(req,res,next)=>{
    const {id}=req.params
    const kyc=await prisma.kyc.update({
        where : { id : Number(id)},
        data:{
            param
        }
    })
    res.json(kyc)

})

module.exports = router;