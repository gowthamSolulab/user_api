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
    const date1 = new Date();
    const date2 = new Date();
    date1.setDate(date1.getDate() - 1);
    date1.setUTCHours(18, 30, 0, 0);
    date2.setDate(date2.getDate());
    date2.setUTCHours(18, 29, 0, 0);

    const user = await modal.aggregate([
      {
        $match: {
          createdAt: {
            $gte: date1,
            $lte: date2,
          },
        },
      },
    ]);
    console.log(user);
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
