const requestTrackMiddleware = (req, res, next) => {
  console.log(`Receiving "${req.method}" request to route "${req.path}"`);
  next();
};

export default requestTrackMiddleware;
