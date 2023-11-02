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
};