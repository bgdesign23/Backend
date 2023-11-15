const { postFavoriteController } = require("../controllers/favorites/favoriteController");

const postFavoriteHandler = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params; 
        const image = typeof req.file === 'object' ? req.file.path : req.body.image;
        if (
            !data.name ||
            !data.type ||
            !data.description ||
            !data.material ||
            !data.price ||
            !data.stock ||
            !data.color
        )
            return res.status(400).json("missing form data");
        const newFavorite = await postFavoriteController(data, image, id);
        return res.json(newFavorite)
    } catch (error) {
        return res.status(500).json({ erorr: error.message });
    };
};

module.exports = {
    postFavoriteHandler
}