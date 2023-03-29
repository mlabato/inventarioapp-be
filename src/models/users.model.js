const users = require("./users.mongo");

const DEFAULT_ID_NUMBER = 0;

//HELPING FUNCTIONS
const getLatestIdNumber = async () => {
  const latestIdNumber = await users.findOne().sort("-id");

  if (latestIdNumber === null) {
    return DEFAULT_ID_NUMBER;
  }

  return latestIdNumber.id;
};

async function saveUser(user) {
    
  await users.updateOne(
    {
      id: user.id,
    },
    user,
    { upsert: true, strict:false }
  );
}

async function findUser(filter) {
  return await users.findOne(filter);
}

async function existsUserWithId(userId) {
  return await findUser({
    id: userId,
  });
}

//CRUD
const getAllUsers = async () => {
  return await users.find({}, { __id: 0, __v: 0 });
};

const addNewUser = async (user) => {
  const newIdNumber = (await getLatestIdNumber()) + 1;

  const registeredUsers = await users.findOne({
    username: user.username,
  });



  if(registeredUsers){
    return { error: "the user is already registered "};
  }else{
    const newUser = Object.assign(user, {
      id: newIdNumber,
    });
  
    await saveUser(newUser);

    return newUser
  }
  

};

const deleteUserById = async (userId) => {
  return await users.deleteOne({ id: userId });
};

module.exports = { getAllUsers, addNewUser, deleteUserById, existsUserWithId };
