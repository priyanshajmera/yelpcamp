var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var middleware=require("../middleware");
router.get("/campground",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});

        }
    });
});
router.post("/campground",middleware.isloggedin,function(req,res){
    var newname=req.body.name;
    var newimage=req.body.image;
    var newdesc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:newname,image:newimage,description:newdesc,author:author}

    Campground.create(newCampground,function(err,newlycretaed){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    })
   

});
router.get("/campground/new",middleware.isloggedin,function(req,res){
    res.render("campgrounds/new");
});

router.get("/campground/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
   
   

});
//EDIT CAMPGROUND ROUTE
router.get("/campground/:id/edit",middleware.checkcamp,function(req,res){
   
            Campground.findById(req.params.is,function(err,foundCampground){
                        res.render("campgrounds/edit",{campground:foundCampground});
        });
});

router.put("/campgorund/:id",middleware.checkcamp,function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground"+req.params.id);
        }
    });

});
router.delete("/campground/:id",middleware.checkcamp,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground")
        }
    });

});




module.exports=router;