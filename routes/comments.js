var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");
var middlewareObj = require("../middleware");
// =====================
// COMMENTS ROUTES
//======================
router.get("/campground/:id/comments/new",middlewareObj.isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
   
});
router.post("/campground/:id/comments",middlewareObj.isloggedin,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{

                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/"+campground._id);
                }
            })
            
        }
    })

})

//Edit comment Route
router.get("/campground/:id/comments/:comment_id/edit",middlewareObj.checkcomment,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
    
});

router.put("/campground/:id/comments/:comment_id",middlewareObj.checkcomment,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,res.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});

router.delete("/campground/:id/comments/:comment_id",middlewareObj.checkcomment,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        } 
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});



module.exports=router;