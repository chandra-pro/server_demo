const asynchandler = func => {
  async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        successs: false,
        message: error.message,
      });
    }
  };
};

module.exports = { asynchandler };
