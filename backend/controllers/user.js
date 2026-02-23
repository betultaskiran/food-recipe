const mongooseUser = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id; // ID params üzerinden alınır
      const updatedData = req.body; // Formdan gelen veriler

      // Kullanıcıyı ID ile bul
      const user = await mongooseUser.findById(userId);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Kullanıcıyı güncelle
      // Tüm gelen verileri kullanarak güncelleme yapıyoruz
      user.firstName = updatedData.firstName || user.firstName;
      user.lastName = updatedData.lastName || user.lastName;
      user.email = updatedData.email || user.email;
      user.description = updatedData.description || user.description;
      user.instagram = updatedData.instagram || user.instagram;
      user.twitter = updatedData.twitter || user.twitter;
      user.youtube = updatedData.youtube || user.youtube;

      // Eğer bir dosya geldiyse (yani resim yüklendiyse)
      if (req.file) {
        user.image = req.file.filename; // Dosya adını kaydediyoruz (uploads klasörüne kaydoldu zaten)
      }

      // Güncellenmiş kullanıcıyı kaydet
      const updatedUser = await user.save();

      console.log(updatedUser, "result");
      res.status(200).send({ response: updatedUser });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.params.id; // Kullanıcı ID'si URL üzerinden alınır
      const { currentPassword, newPassword } = req.body; // Mevcut şifre ve yeni şifreyi body'den alıyoruz

      // Kullanıcıyı ID ile bul
      const user = await mongooseUser.findById(userId);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Mevcut şifreyi kontrol et
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: "Current password is incorrect" });
      }

      // Yeni şifreyi bcrypt ile şifrele
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;

      // Güncellenmiş kullanıcıyı kaydet
      const updatedUser = await user.save();

      res.status(200).send({ response: "Password updated successfully" });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await mongooseUser.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).send({ error: "User not found" });
      }

      console.log(deletedUser, "result");
      res.status(200).send({ response: deletedUser });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await mongooseUser.findById(id);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      console.log(user, "result");
      res.status(200).send({ response: user });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await mongooseUser.find();
      console.log(users, "result");
      res.status(200).send({ response: users });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new mongooseUser({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(newUser, "created user");
      res.status(201).send({ response: newUser });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "An error occurred" });
    }
  },
};

module.exports = userController;

/*Kullanıcı kaydı sadece register üzerinden yapılıyorsa	createUser'a gerek yok
Farklı yerlerden kullanıcı oluşturulacaksa (mesela admin paneli gibi)createUser ayrı bir servis olarak kalabilir
 */
