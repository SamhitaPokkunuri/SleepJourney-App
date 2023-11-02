import protectApi from 'middleware/protectApi';

function handler(req, res) {
  const { youtubeMovieId } = req.body;

  if (youtubeMovieId) {
    fetch(`https://i.ytimg.com/vi/${youtubeMovieId}/maxresdefault.jpg`)
      .then((el) => {
        if (el.status === 200) {
          res
            .status(200)
            .end(JSON.stringify({ message: 'Max res found', url: el.url }));
        } else {
          res.status(400).end(
            JSON.stringify({
              message: `Error: ${el.status} ${el.statusText}`,
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).end(JSON.stringify({ message: `Error: ${err}` }));
      });
  } else {
    res.status(400).end(JSON.stringify({ message: `Error: No yt id found` }));
  }
}

export default protectApi(handler);
