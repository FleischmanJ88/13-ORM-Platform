const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: [Product]
      });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagOne = await Tag.findByPk(req.params.id, {
      include: [Product]
    })
    if (!tagOne) {
      res.status(404).json({ message: "No tag found with that id" });
      return
    }
    res.status(200).json(tagOne);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changeTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!changeTag) {
      res.status(404).json({ message: "No tag found with that id" });
      return
    }
    res.status(200).json(changeTag)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
