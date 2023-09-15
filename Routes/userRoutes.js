const express = require('express');
const router = express.Router(); //instance create garya
const User= require('../models/userModels'); 

// api to save user data
router.post('/users/savedata', (req, res) => { //express ko auta method ho, api create garnee method
    const data=req.body; //body:html ko body
    if (!data) {
        res.status(400).json({ msg: 'Data not found' }); 
        return; //optional
    }
    const user = new User({ //User: User model ho
        name: data.name,   //data ko thau ma req.body.name ni lekhna milxa
        email: data.email,
        password: data.password,  //password: field ko name ho
        role: data.role,
        contactNumber: data.contactNumber,
        age: data.age, 
    });
    user.save().then(( data ) => {
        res.json({ msg: 'Data inserted', success: true ,data});
    }
    ).catch((error) => {
        res.status(500).json({ msg: error, success: false });
    }
    );
});

// async await api to get user data by id
router.get("/users/getdata/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ msg: "data fetched successfully", success: true, user });
    } catch (err) {
      res.status(500).json({ msg: err.message, success: false });
    }
  });
  
  // api to update user data by user id also use async await
  router.put("/users/update/:id", async (req, res) => {
    const data = req.body;
    const user = await User.findById(req.params.id); //await: naaaya samma kurnee
    console.log(user);
    if (!data) {
      res.status(400).json({ msg: "Data not found" });
      return;
    }
    if (!user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    try {
        user.name = data.name ? data.name : user.name;
        user.email = data.email ? data.email : user.email;
        user.password = data.password ? data.password : user.password;
        user.role = data.role ? data.role : user.role;
        user.contactNumber = data.contactNumber
          ? data.contactNumber
          : user.contactNumber;
        const updatedUser = await user.save(); //await: wait ko lagi
        res.json({ msg: "Data updated", success: true, updatedUser });
      } catch (error) {
        res.status(500).json({ msg: error, success: false });
      }
    });

    // api to delete user data by user id
// router.delete("/users/deletedata/:id", (req, res) => {
//     User.findByIdAndDelete(req.params.id)
  
//       .then((data) => {
//         res.json({ msg: "Data deleted", success: true, data });
//       })
//       .catch((error) => {
//         res.status(500).json({ msg: error, success: false });
//       });
//   });
  
  router.delete("/users/deletedatas/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json({ msg: "data deleted successfully", success: true, user });
    } catch (err) {
      res.status(500).json({ msg: err.message, success: false });
    }
  });

// api to get all user data
module.exports = router;
