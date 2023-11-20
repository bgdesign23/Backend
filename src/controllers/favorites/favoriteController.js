const { Favorite, User } = require("../../db");

const postFavoriteController = async (data, image) => {
   try {
    if (image === "") {
        image =
          "https://img.freepik.com/vector-gratis/gradiente-diseno-letrero-foto_23-2149288316.jpg";
      }
    const findFav = await Favorite.findOne({
        where: {
            id: data.id,
            UserId: data.userId
        },
    })
    if (findFav) throw new Error ("Ya se agrego este producto a sus favoritos");
    const findUser = await User.findOne({
        where: {
            id: data.userId,
        },
    });
    if (!findUser) throw new Error ("No se encontró un usuario con ese id");

    const favoriteObj = {
        id: data.id,
        name: data.name,
        type: data.type,
        material: data.material,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: image,
        color: data.color,
        rating: data.rating,
    };
    const newFavorite = await Favorite.create(favoriteObj); 
    await newFavorite.setUser(findUser);
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

const getFavController = async (id) => {
    if (!id) throw new Error("El servidor no recibió el id de usuario necesario");
    const favorites = await Favorite.findAll({where: {UserId: id}})
    return favorites
}

module.exports = {
    postFavoriteController,
    deleteFavController,
    getFavController
};