var Campground=require("../models/campgrounds");
var Comment=require("../models/comment")
var middlewareObj={};

middlewareObj.checkcamp=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back");
            }else{
                //does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                          next(); 
                }
                else{
                    res.redirect("back");
                }

               
             }
    });

    }else{
        res.redirect("back");
    }

}
middlewareObj.checkcomment=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                //does the user own the campground
                if(foundComment.author.id.equals(req.user._id)){
                          next(); 
                }
                else{
                    res.redirect("back");
                }

               
             }
    });

    }else{
        res.redirect("back");
    }

}
middlewareObj.isloggedin=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login first");
    res.redirect("/login");
    
}

module.exports=middlewareObj;