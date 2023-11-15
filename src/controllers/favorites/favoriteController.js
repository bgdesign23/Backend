const { Favorite, User } = require("../../db");

const postFavoriteController = async (data, image, id) => {
   try {
    if (image === "") {
        image =
          "https://img.freepik.com/vector-gratis/gradiente-diseno-letrero-foto_23-2149288316.jpg";
      }
    const findFav = await Favorite.findOne({
        where: {
            name: data.name.toLowerCase(),
            type: data.type,
            material: data.material,
            description: data.description,
            price: data.price,
            stock: data.stock,
            image: image,
            color: data.color,  
        },
    })
    if (findFav) return res.status(302).json({ message: "this favorite already exists "});
    const findUser = await User.findOne({
        where: {
            id: id,
        },
    });
    if (!findUser) throw new Error ("no existe un usario");

    const favoriteObj = {
        name: data.name.toLowerCase(),
        type: data.type,
        material: data.material,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: image,
        color: data.color,  
    };
    const newFavorite = await Favorite.create(favoriteObj); 
    await newFavorite.addUser(findUser);
    return newFavorite; 
   } catch (error) {
    throw new Error(error.message);
   };
};
const deleteFavController = async (id) => {
    const favs = await Favorite.findByPk(id);
    if (!favs) throw new Error ("No se encontró un favorito a eliminar");
    await favs.destroy();
    return { message: "Favorito eliminado exitosamente" };
};

module.exports = {
    postFavoriteController,
    deleteFavController,
};