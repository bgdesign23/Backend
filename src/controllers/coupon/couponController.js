const { User, Coupon } = require("../../db");
const couponJson = require("../../utils/json/coupon.json");

// Trae los cupones;
const getCouponController = async () => {
  try {
    const couponFound = await Coupon.findAll();
    if (couponFound.length > 0) {
      return couponFound;
    } else {
      const couponDb = await Coupon.bulkCreate(couponJson.coupon);
      return couponDb;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crear un cupon;
const createCoupon_Controller = async (data, id) => {
  try {
    const findCoupon = await Coupon.findOne({
        where: {
            status: data.status,
            expiration: data.expiration,
            discount: data.discount,
            usagesAvailable: data.usagesAvailable,
            code: data.code,
        },
    });
    if(findCoupon) return res.status(302).json( { message: "este cupon ya existe" } ); 
    
    // Crea el objeto del cupón con los datos proporcionados
    const couponObj = {
      status: data.status,
      expiration: data.expiration,
      discount: data.discount,
      usagesAvailable: data.usagesAvailable,
      code: data.code, // Asigna el código proporcionado en el cuerpo de la solicitud
    };

    // Crea el nuevo cupón en la base de datos
    const newCoupon = await Coupon.create(couponObj);
    return newCoupon;

  } catch (error) {
    throw new Error(error.message);
  };
};

// Restaurar un cupon;
const restoreCouponController = async (id) => {
  const restored = await Coupon.restore({
    where: {id}
});
if(restored === 1) return "Cupón restaurado con éxito"
throw Error("No se pudo restaurar el cupón");
};

// Modificar un cupon;
const updateCouponController = async (
  status,
  expiration,
  discount,
  usagesAvailable,
  code,
  id  
) => {
  try {
    if (!id) throw new Error("El servidor no recibió el ID necesario"); 
    const foundCoupon = await Coupon.findOne({ where: { id: id } }); 
    if (!foundCoupon) {
      throw new Error("No se encontró el cupón a actualizar");
    }
    if (code !== undefined) {
      const newCode = code;
      await foundCoupon.update({ code: newCode });
    }
    if (status !== undefined) await foundCoupon.update({ status: status });
    if (expiration !== undefined) await foundCoupon.update({ expiration: expiration });
    if (discount !== undefined) await foundCoupon.update({ discount: discount });
    if (usagesAvailable !== undefined) await foundCoupon.update({ usagesAvailable: usagesAvailable });

    const couponUpdated = await Coupon.findOne({ where: { id: id } }); 
    if (!couponUpdated) throw new Error("No se encontró el cupón actualizado");
    return couponUpdated; // Devuelve el cupón actualizado
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar un cupon;
const deleteCouponController = async (id) => {
  if (id) {
     const data = await Coupon.destroy({
       where: { id: id } });
     return true;  
  } else return false;
};

module.exports = {
  createCoupon_Controller,
  getCouponController,
  deleteCouponController,
  restoreCouponController,
  updateCouponController,
};