const Requests = require("../../../../models/Requests");

    //Find total blog by countDocuments
    const requestCount =  async (req, res) => {
        const query = {};
        const email = req.query.email;
 
        if (email) {
          query.requesterEmail = email;
        }
        
        try {
          const result = await Requests.estimatedDocumentCount(query);
          res.send({ result });
        } catch (error) {
          res.status(500).send("Server error!");
        }
      };

      module.exports = requestCount;