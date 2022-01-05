module.exports = {
  create: async (data, modal) => {
    const newUser = await modal.create(data);
    if (!newUser) return false;
    return {
      message: 'User created successfully',
      email: newUser.email,
      username: newUser.username,
    };
  },

  get: async (id, modal) => {
    const user = await modal.findById(id);
    if (!user) return false;
    return user;
  },

  getAll: async (modal) => {
    const user = await modal.find();
    if (!user) return false;
    return user;
  },

  update: async (id, body, modal) => {
    const user = await modal.findByIdAndUpdate(id, body);
    if (!user) return false;
    return user;
  },

  deleteDoc: async (id, modal) => {
    const user = await modal.findById(id);
    if (!user) return false;
    await modal.deleteOne(user);
    return {
      message: 'User deleted successfully',
      email: user.email,
      username: user.username,
    };
  },
};
