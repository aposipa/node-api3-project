const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "Error GETing posts", err });
    });
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    Posts.getById(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "error GETing post"})
      });
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error deleting post"})
    });
});

router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Posts.update(id, body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error updating post"})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id).then(post => {
    if (post) {
      req.post;
      next();
    } else {
      res.status(404).json({ error: "post not found" })
    }
  })
}

module.exports = router;
