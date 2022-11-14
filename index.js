const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-school')

.then(()=>console.log("mongodb connected successfully"))
.catch(err=>console.log("connection failed"))


const studentSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type:String, required:[true, "please insert lastName"] }, //built in validator
    dob: {type:Date, validate:{
        validator:(value)=> value > new Date("1 January 2000"),  //custom validators
        message:"Date must be after 1 january 2000"
    } },
    hobbies: {type:Array, of:String, validate:{                //custom validators
        validator: (value)=>value.length >0,
        message:"There must be at least one hobby"
    }},
    passed: Boolean,


})


 const Student = mongoose.model('my-students', studentSchema)

async function createStudent(){
    try{
        const data =await Student.create({
            firstName:"Shohidul",
            // lastName: "Arifin",
            dob: new Date("30 december 1987"),
            hobbies: [],
            passed: true
        
            })
            console.log(data)

    }catch(err){
        for(field in err.errors)
        console.log(err.errors[field].message)                  //Error messages

    }
    
    
      
    

}
createStudent();










