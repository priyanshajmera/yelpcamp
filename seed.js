var mongoose=require("mongoose");
var Campground=require("./models/campgrounds");
var Comment =require("./models/comment");

var data=[
   {
       name:"Cloud",
       image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=350",
       description:"blah,blah,blah"
    },
    {
        name:"Cloud",
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"blah,blah,blah"
     },
     {
        name:"Cloud",
        image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"blah,blah,blah"
     }
];
function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //ADD
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Added a campground");
                    //create a comment
                    Comment.create({text:"this place is great",author:"Priyasnh"},function(err,comment){
                        if(err){
                            console.log(err);
                        }   
                        else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");

                        }
                        
                        
                           
                    });
                }
    
            });
        });
    });

    
}
module.exports=seedDB;