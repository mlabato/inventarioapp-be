const {
  getAllUsers,
  existsUserWithId,
  addNewUser,
  deleteUserById,
  editUserById,
} = require("../../models/users.model");

const httpGetAllUsers = async (req, res) => {
  const responseUsers = await getAllUsers();
  return res.status(200).json(responseUsers);
};

const httpAddNewUser = async (req, res) => {
  const user = req.body;

  if (!user.username || !user.area) {
    return res.status(400).json({
      error: "Missing required user property",
    });
  }
  const userResponse = await addNewUser(user);

  return res.status(201).json(userResponse);
};

const httpDeleteUser = async (req, res) => {
  const userId = Number(req.params.id);

  const existsUser = await existsUserWithId(userId);

  if (!existsUser) {
    return res.status(404).json({
      error: "user no found",
    });
  }

  const deleted = await deleteUserById(userId);

  if (!deleted) {
    return res.status(400).json({
      error: "user not deleted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
};

const httpEditUserById = async (req, res) => {
  const userId = req.params.id;

  const userToEdit = req.body;

  const edited = await editUserById(userToEdit, userId);

  if (edited.error) {
    return res.status(400).json({
      msg: "user not edited",
      error: edited.error
    });
  }

  return res.status(200).json({
    ok: true,
    edited,
  });
};

module.exports = {
  httpGetAllUsers,
  httpAddNewUser,
  httpDeleteUser,
  httpEditUserById,
};
