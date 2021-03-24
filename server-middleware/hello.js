export default (req, res) => {
  console.log(new Date().toLocaleString());
  res.end('hello');
}
