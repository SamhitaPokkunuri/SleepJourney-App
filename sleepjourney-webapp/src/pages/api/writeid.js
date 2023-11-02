const fs = require('fs');

export default function handler(req, res) {
  const stream = fs.createWriteStream("speechmark/ids.txt", {flags:'a'});
  const id =  req.body.id;
  const timestamp = new Date().getTime();
  stream.write(timestamp +"_"+id+ "\n");
  stream.end();
  const reply={
    id:id,
    timestamp:timestamp
  }
  res.send(reply);
}
