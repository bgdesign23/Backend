const { 
    postFavoriteController, 
    deleteFavController, 
    getFavController
} = require("../controllers/favorites/favoriteController");

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
        return res.status(500).json({ error: error.message });
    };
};

const deleteFavHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteFavController(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const getFavHandler = async (req, res) => {
    try {
        const favs = await getFavController()
        return res.status(200).json(favs)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}



module.exports = {
    postFavoriteHandler,
    deleteFavHandler,
    getFavHandler
}