/**
 * Set manual origin access to solve cors error to google map api
 * @param {Object} req - request object
 * @param {Object} res - respose object
 * @param {function} next - function that passes control to the next matching route
 */
exports.setCorsAuth = (req, res, next) => {
  //set headers to resolve cors error
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  return next(); //passing control to next function in line --e.g. app.get('url', middleware, next_function);
}