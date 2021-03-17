module.exports = async (req, res) => {
  res.statusCode = 200;
  try {
    res.json({name: 'John Doe'});
  } catch (e) {
    res.end('ok');
  }
};
