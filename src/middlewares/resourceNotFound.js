const resourceNotFoundMiddleware = (req, res) => (
  res.status(404).json({ message: `Resource '${req.method}' to '${req.path}' not found` })
);

export default resourceNotFoundMiddleware;
