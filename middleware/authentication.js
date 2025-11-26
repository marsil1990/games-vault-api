const is_Authenticated = (req, res, next) => {
  // If passport session exists, use it
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // Allow a developer/testing token via header `Authorization: Bearer <TOKEN>`
  // or `x-dev-token: <TOKEN>` when DEV_TOKEN is set in environment.
  const devToken = process.env.DEV_TOKEN;
  if (devToken) {
    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();
      if (token === devToken) return next();
    }

    const xdev = req.headers["x-dev-token"];
    if (xdev && xdev === devToken) return next();
  }

  return res.status(401).json({ message: "You need to login" });
};

module.exports = is_Authenticated;
