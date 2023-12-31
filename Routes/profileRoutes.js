const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const domain = "http://localhost:5000";
const auth = require("../config/auth");
const uploadsServices = require("../services/uploadServices");

// @route POST api/profile by taking the ref of the user
// @desc Create a profile
// @access Private
router.post(
  "/profile/create",
  uploadsServices.profileImage.single("profilepic"),
  auth.verifyUser,
  async (req, res) => {
    const data = req.body; //body bata text data liney
    const file = req.file;
    try {
      if (!file || file.length === 0) {
        return res.status(400).send("Please upload an image");
      }
      const image = domain + "/public/profiles/" + file.filename;
      const profile = new Profile({
        user: req.userData._id,
        name: data.name,
        contact: data.contact,
        address: data.address,
        dob: data.dob,
        profilepic: image,
      });
      await profile.save();
      res.status(200).json({ msg: "Profile created successfully", profile });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

//update the profile by taking the ref of the user
//route put/update profile
// @desc Create a profile
// @access Private
router.put(
  "/profile/update",
  uploadsServices.profileImage.single("profilepic"),
  auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;
    try {
      const profile = await Profile.findOne({ user: req.userData._id });

      if (!profile) {
        return res.status(400).send("Profile not found");
      }
      if (!file || file.length === 0) {
        profile.name = data.name ? data.name : profile.name;
        profile.contact = data.contact ? data.contact : profile.contact;
        profile.address = data.address ? data.address : profile.address;
        profile.profilepic = profile.profilepic;
        const updatedProfile = await profile.save();
        res.json({ msg: "profile updated", success: true, updatedProfile });
      }
      else {
        const image = domain + "public/profileUploads/" + file.filename;
        profile.name = data.name ? data.name : profile.name;
        profile.contact = data.contact ? data.contact : profile.contact;
        profile.address = data.address ? data.address : profile.address;
        profile.profilepic = image ? image : profile.profilepic;
        const updatedProfile = await profile.save();
        res.json({ msg: "profile updated", success: true, updatedProfile });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// code for get the profile by taking the ref of the user
// @route GET profile/get
// @desc Get a profile
// @access Private
router.get("/profile/get", auth.verifyUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userData._id });
    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    res.json({ msg: "profile fetched", success: true, profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// code for delete the profile by taking the ref of the user
// @route DELETE profile/delete
// @desc Delete a profile
// @access Private
router.delete("/profile/delete", auth.verifyUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userData._id });
    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    await profile.deleteOne();
    res.json({ msg: "profile deleted", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;