var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    res.render('reg',{title:'Express'});
})
router.post('/',function(req,res){
});
module.exports=router