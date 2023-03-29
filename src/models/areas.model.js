const areas = require("./areas.mongo");

const DEFAULT_ID_NUMBER = 0;

//HELPING FUNCTIONS
const getLatestIdNumber = async () => {
  const latestIdNumber = await areas.findOne().sort("-id");
  
  if (latestIdNumber === null) {
    return DEFAULT_ID_NUMBER;
  }
  return latestIdNumber.id;
};

async function saveArea(area) {
  await areas.updateOne(
    {
      id: area.id,
    },
    area,
    { upsert: true }
  );
}

async function findArea(filter) {
  return await areas.findOne(filter);
}

async function existsAreaWithId(areaId) {
  return await findArea({
    id: areaId,
  });
}
//CRUD
const getAllAreas = async () => {
  return await areas.find({}, { __id: 0, __v: 0 });
};

const addNewArea = async (area) => {
  const newIdNumber = (await getLatestIdNumber()) + 1;

  const registeredAreas = await areas.findOne({
    area: area.area,
  });

  if(registeredAreas){
    return { error: "the area is already registered "};
  }else{
    const newArea = Object.assign(area, {
      id: newIdNumber,
    });
  
    await saveArea(newArea);

    return newArea
  }


};

const deleteAreaById = async (areaId) => {
  return await areas.deleteOne({ id: areaId });
};

module.exports = { getAllAreas, addNewArea, deleteAreaById, existsAreaWithId };
