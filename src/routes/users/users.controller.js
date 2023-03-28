const {getAllUsers, existsUserWithId, addNewUser} = require("../../models/users.model")

const httpGetAllUsers = async (req, res) => {
    const responseUsers = await getAllUsers();
    return res.status(200).json(responseUsers);
  };

  const httpAddNewUser = async (req,res) => {
    const user = req.body;

    if(!user.username || !user.area){
        return res.status(400).json({
            error: "Missing required user property",
          });
    }
    addNewUser(user)
    
    return res.status(201).json(user)
}


  module.exports = {httpGetAllUsers, httpAddNewUser }


  //, httpDeleteArea