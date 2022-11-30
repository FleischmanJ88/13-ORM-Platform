const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try { 
    const categoryData = await Category.findAll({include: [Product],});
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryOne = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    if (!categoryOne) {
      res.status(404).json({message: "No category found with that id"});
      return
    }
    res.status(200).json(categoryOne);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changeCat = await Category.update(req.body, {
        where: {
          id: req.params.id
        }
    });
    if (!changeCat) {
      res.status(404).json({message: "No category found with that id"});
      return
    }
    res.status(200).json(changeCat)
  
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCat) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(delCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
