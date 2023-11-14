const { User, Coupon } = require("../../db");
const couponJson = require("../../utils/json/coupon.json");
const { Op } = require("sequelize");

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
  const coupon = await Coupon.findByPk(id, { paranoid: false });
  if (!coupon) throw new Error("No se encontró el cupón a restaurar");
  await coupon.restore();
  return { message: "Cupón restaurado con éxito", coupon };
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

// Almacenamiento de los cupones eliminados;
const eliminatedCouponController = async () => {
  const eliminatedCoupon = await Coupon.findAll({ paranoid: false, where: { deletedAt: { [Op.not]: null } } });
  console.log(eliminatedCoupon);
  if (!eliminatedCoupon || eliminatedCoupon.length === 0) {
    return { message: "No se encontraron cupones eliminados" };
  }
  return eliminatedCoupon;
};

// Eliminar un cupon;
const deleteCouponController = async (id) => {
 const cupon = await Coupon.findByPk(id);
 if (!cupon) throw new Error ("No se encontró cupón a eliminar");
 await cupon.destroy();
 return { message: "Cupón eliminado exitosamente" };
};

module.exports = {
  createCoupon_Controller,
  getCouponController,
  deleteCouponController,
  restoreCouponController,
  updateCouponController,
  eliminatedCouponController,
};