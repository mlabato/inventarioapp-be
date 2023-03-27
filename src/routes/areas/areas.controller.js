const {getAllAreas, addNewArea, existsAreaWithId, deleteAreaById} = require("../../models/areas.model");

const httpGetAllAreas = async (req, res) => {
    const responseAreas = await getAllAreas();
    return res.status(200).json(responseAreas);
  };

  const httpAddNewArea = async (req,res) => {
    const area = req.body;

    if(!area.area){
        return res.status(400).json({
            error: "Missing required area property",
          });
    }
    addNewArea(area)
    
    return res.status(201).json(area)
}

const httpDeleteArea = async (req, res) => {
    const areaId = Number(req.params.id)
    
    const existsArea = await existsAreaWithId(areaId)
    
    if (!existsArea) {
        return res.status(404).json({
          error: "area no found",
        });
      }

      const deleted = await deleteAreaById(areaId)

      if(!deleted){
        return res.status(400).json({
          error: "area not deleted"
        })
      }
    
      return res.status(200).json({
        ok: true
      });
}


  module.exports = {httpGetAllAreas, httpAddNewArea, httpDeleteArea}