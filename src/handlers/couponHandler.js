const {
    createCoupon_Controller,
    getCouponController,
    deleteCouponController,
    restoreCouponController,
    updateCouponController,
} = require("../controllers/coupon/couponController");

const { Coupon } = require("../db");

// Trae los cupones de descuento;
const getCouponHandler = async (req, res) => {
  try {
    const cupones = await getCouponController();
    return res.status(200).json(cupones);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};

// Crear un cupon;
const createCoupon_Handler = async (req, res) => {
    try {
      const data = req.body;
      const { id } = req.params;
  
      if (
        !data.status ||
        !data.expiration ||
        !data.discount ||
        !data.usagesAvailable 
      ) {
        return res.status(400).json({ error: "Faltan datos en el formulario" });
      }
  
      const coupon = await createCoupon_Controller(data, id);
  
      if (coupon.message && coupon.message === "Este cupón ya existe") {
        return res.status(302).json({ error: "Este cupón ya existe" });
      }
  
      return res.json(coupon);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  };

// Eliminar un cupon;
const deleteCouponHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCouponController(id);
    if(response) {
      return res.status(200).json("Delete Succesfully");
    } else return res.status(404).json("Coupon not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
};
// Restaurar un cupon;
const restoreCouponHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const restored = await restoreCouponController(id);
    if(restored) return res.status(200).json(restored);
    return res.status(400).json({error: "Coupon not found"});
  } catch (error) {
    res.status(200).json({error:error.message})
  };
};

// Modificar un cupon;
const updateCouponHandler = async (req, res) => {
  const { status, expiration, discount, usagesAvailable } = req.body;
  const id = req.params.id; 
  const code = req.body.newCode;
  try {
    const response = await updateCouponController(
      status,
      expiration,
      discount,
      usagesAvailable,
      code,
      id,
    );
    if (!response) throw new Error("El cupón no pudo actualizarse");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};
  
  module.exports = {
    createCoupon_Handler,
    getCouponHandler,
    deleteCouponHandler,
    restoreCouponHandler,
    updateCouponHandler,
  };