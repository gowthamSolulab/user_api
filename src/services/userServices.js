import User from '../modals/userModal';

module.exports = {
  createService: async (data) => {
    const { username, email, password, mobileno, countryCode } = data;
    const newUser = await User.create({
      username,
      email,
      password,
      mobileno,
      countryCode,
    });
    if (!newUser) return null;
    return newUser;
  },
  getService: async (id) => {
    const user = await User.findById(id);
    if (!user) return;
    return user;
  },
  getAllService: async () => {
    const user = await User.find();
    if (!user) return null;
    return user;
  },
  updateService: async (id, body) => {
    const user = await User.findByIdAndUpdate(id, body);
    if (!user) return null;
    return user;
  },
  deleteService: async (id) => {
    const user = await User.findById(id);
    if (!user) return null;
    const deletedUser = await User.deleteOne(user);
    return deletedUser;
  },
};
