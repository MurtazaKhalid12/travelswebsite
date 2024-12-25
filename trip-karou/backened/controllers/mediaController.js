// controllers/mediaController.js
const path = require("path");
const multer = require("multer");
const Media = require("../models/Media"); // Import the Media model
const { Op } = require("sequelize"); // Add this import at the top

// Configure multer storage
const storage = multer.diskStorage({
  destination: "./media_files/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controller function to handle media upload
exports.uploadMedia = async (req, res) => {
  const t = await Media.sequelize.transaction();

  try {
    // Validate required fields
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const { trip_id, media_type, alt_text, description, media_order } =
      req.body;
    console.log(trip_id, media_type, alt_text, description, media_order);

    if (!trip_id || !media_type || !media_order) {
      throw new Error("Missing required fields");
    }

    const media_url = `http://localhost:3302/media/${req.file.filename}`;

    console.log("Attempting upload with:", {
      trip_id,
      media_type,
      alt_text,
      description,
      media_order,
      media_url,
    });

    // Check if media exists at this order
    const existingMedia = await Media.findOne({
      where: {
        trip_id,
        media_order,
      },
      transaction: t,
    });

    let media;

    if (existingMedia) {
      // Update existing record
      await existingMedia.update(
        {
          media_url,
          media_type,
          alt_text,
          description,
        },
        { transaction: t }
      );

      media = existingMedia;
    } else {
      // Create new record
      media = await Media.create(
        {
          trip_id,
          media_type,
          media_url,
          alt_text,
          description,
          media_order,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(200).json({
      success: true,
      message: existingMedia
        ? "Media updated successfully"
        : "Media uploaded successfully",
      media: media.toJSON(),
      replaced: !!existingMedia,
    });
  } catch (err) {
    await t.rollback();

    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to handle media upload",
    });
  }
};

// 1. Controller for updating media WITH a new image file
exports.updateMediaWithImage = async (req, res) => {
  // Start a database transaction
  const t = await Media.sequelize.transaction();

  try {
    // Validate if a file was uploaded
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    // Get media_id from URL parameters and other details from request body
    const { media_id } = req.params;
    const { media_type, alt_text, description, trip_id, media_order } =
      req.body;

    console.log("Update attempt for media_id:", media_id, {
      media_type,
      alt_text,
      description,
      trip_id,
      media_order,
    });

    // Basic validation
    if (!media_id || !media_type) {
      throw new Error("Missing required fields");
    }

    // Find the existing media record
    const existingMedia = await Media.findByPk(media_id, { transaction: t });

    if (!existingMedia) {
      throw new Error("Media not found");
    }

    // Generate new URL for the uploaded file
    const media_url = `http://localhost:3302/media/${req.file.filename}`;

    // Update the database record with new details
    await existingMedia.update(
      {
        media_url, // New file URL
        media_type, // Updated media type
        alt_text, // Updated alt text
        description, // Updated description
      },
      { transaction: t }
    );

    // Delete the old image file from storage
    try {
      const fs = require("fs").promises;
      // Extract old filename from URL
      const oldFilePath = existingMedia.media_url.split("/").pop();
      // Delete the file
      await fs.unlink(`./media_files/${oldFilePath}`);
    } catch (error) {
      console.error("Error deleting old file:", error);
      // Continue even if file deletion fails
    }

    // Commit the transaction if everything succeeded
    await t.commit();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Media updated successfully",
      media: existingMedia.toJSON(),
    });
  } catch (err) {
    // Rollback transaction if anything failed
    await t.rollback();
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to update media",
    });
  }
};

// 2. Controller for updating ONLY media details (without new image)
exports.updateMediaDetails = async (req, res) => {
  // Start a database transaction
  const t = await Media.sequelize.transaction();

  try {
    // Get media_id from URL parameters
    const { media_id } = req.params;
    // Get updated details from request body
    const { media_type, alt_text, description } = req.body;

    console.log("Updating media details for media_id:", media_id, {
      media_type,
      alt_text,
      description,
    });

    // Basic validation
    if (!media_id || !media_type) {
      throw new Error("Missing required fields");
    }

    // Find the existing media record
    const existingMedia = await Media.findByPk(media_id, { transaction: t });

    if (!existingMedia) {
      throw new Error("Media not found");
    }

    // Update only the metadata, keep the same media_url
    await existingMedia.update(
      {
        media_type,
        alt_text,
        description,
      },
      { transaction: t }
    );

    // Commit the transaction if everything succeeded
    await t.commit();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Media details updated successfully",
      media: existingMedia.toJSON(),
    });
  } catch (err) {
    // Rollback transaction if anything failed
    await t.rollback();
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to update media details",
    });
  }
};

exports.getMediaByTripId = async (req, res) => {
  const { trip_id } = req.params;
  console.log("Fetching media for trip_id:", trip_id);

  try {
    // Changed Media.find() to Media.findAll() since we're using Sequelize
    const media = await Media.findAll({
      where: { trip_id },
      order: [["media_order", "ASC"]],
    });

    // Return empty array instead of 404 if no media found
    res.status(200).json({
      success: true,
      media: media || [],
    });
  } catch (err) {
    console.error("Error fetching media by trip ID:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
exports.deleteMediaTripId = async (req, res) => {
  try {
    const { trip_id } = req.params;
    //First find all media records for this trip to get their filenames
    const mediaRecords = await Media.findAll({
      where: { trip_id },
    });
    if (!mediaRecords || mediaRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No media found for this trip",
      });
    }
    const fs = require("fs").promises;
    for (const media of mediaRecords) {
      try {
        const filename = media.media_url.split("/").pop();
        await fs.unlink(`./media_files/${filename}`);
      } catch (error) {
        console.error(`Error deleting for media_id ${media.media_id}:, error`);
      }
    }
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delte media",
      details: error.message,
    });
  }
};

// Export multer middleware to use in the route
exports.upload = upload.single("media");
