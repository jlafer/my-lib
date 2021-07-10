//TODO this fn shd probably go into a `cli-util` library
module.exports = (message, exit) => {
  console.error(message);
  exit && process.exit(1);
}
