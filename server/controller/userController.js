const { generateToken } = require("../middleware/auth")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
    try{
        const {firstName, lastName, email, password, confirmPassword } = req.body

        if(password !== confirmPassword){
            res.status(400).json({ message: 'les mot de pass de son pas le meme'})
        }

        const hasedPassword = await bcrypt.hash(password, 10)
        const user = new User ({
            firstName, 
            lastName, 
            email, 
            password: hasedPassword
        })

        await user.save()

        const token = generateToken(user.id);

        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
          })
          .json(user);

    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.login = async (req, res) => {
  try{
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if(!user){
          return res.status(400).json({ message: 'utilisateur introuvable'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
          return res.status(400).json({ message: "mot de passe incorrect"})
      }

      const token = generateToken(user.id)

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json(user);
        
  }catch(err){
      return res.status(500).json({ message: err.message})
  }
}

exports.getUserById = async (req, res) => {
    try{
        const id  = req.params.id

        const user = await User.findById(id)

        res.status(200).json(user)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find({})

        res.status(200).json(users)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id)

        res.json(user)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  };

  exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if(newPassword !== confirmNewPassword) {
    return res.status(400).send({ message: 'New passwords do not match.' });
  }

  try {
    const user = await User.findById(req.params.id);

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(401).send({ message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password updated successfully.' });

  } catch (err) {
    res.status(500).send({ message: 'Error updating password.' });
  }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.logout = async (req, res) => {
    res.clearCookie("token", {path: "/"})
    res.status(200).json({ message: "deconnection succées"})
  }