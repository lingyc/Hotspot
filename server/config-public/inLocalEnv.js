export default function() {
  return fs.readdirSync(path.join(__dirname)).indexOf('config') >= 0;
}
