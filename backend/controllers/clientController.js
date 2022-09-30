const Clientmodel=require("../models/clientModel");
const Project=require("../models/projectModel")


//get all projects
exports.getData = async (req, res, next) => {
    const allClients= await Clientmodel.find()
  
    if(allClients.length<=0)
    {
        res.send("please create a client")
    }
    else{
        res.send(allClients)
    }
    
}

//create project
exports.create = async (req, res, next)=>{
   const allprojects=await Project.find()
  const userid=req.headers.project
  const{_id,name}=allprojects;

    const {Client_name,Business_Details,Tax,Discount}=req.body;

    const createuser=new Clientmodel({userid:userid,Client_name,Business_Details,Tax,Discount,Projects: {_id,name}})
    try{
      await createuser.save()
      res.send("note created")
    }
    catch(err)
    {
      res.send("something went wrong")
    }
}

//update project
exports.update = async (req, res) => {
    
    const {id}=req.params;
   
    const updateone=await Clientmodel.findOneAndUpdate({_id:id},{...req.body})
    if(updateone)
    {
      res.send("updated")
    }
    else{
      res.send("client not found")
    }
    
}

// delete project
exports.delete = async (req, res) => {
    const{id}=req.params
    //  res.send(id)
    const deletenote=await notesmodel.findOneAndDelete({_id:id})
    if(deletenote)
    {
      res.send(" deleted")
    }
    else
    {
      res.send("client not found")
    }
    
}
