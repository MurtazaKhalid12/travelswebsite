const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");

// Define routes
router.get("/search-trips", tripController.search);
router.post("/create", tripController.createTrip);
router.post("/create/destinations", tripController.createDestination);
router.get("/destinations", tripController.getUserDestinations);
router.delete(
  "/destination/delete/:destination_id",
  tripController.deleteDestination
);
router.put(
  "/destination/update/:destination_id",
  tripController.updateDestination
);
router.get("/getUserTrips/:user_id", tripController.getUserTrips);
router.get(
  "/getdestinationsByID/:destination_id",
  tripController.iddestinations
);
router.put("/updateTrip/:trip_id", tripController.updateTrips);
router.delete('/delete/:trip_id',tripController.deleteTrip);

//
module.exports = router;

//  app.js using routes controllers uses models and middleware crud 