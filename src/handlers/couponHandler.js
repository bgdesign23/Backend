const {
    createCoupon_Controller,
    getCouponController,
    deleteCouponController,
    restoreCouponController,
    updateCouponController,
    eliminatedCouponController,
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

// Almacena los cupones eliminados;
const eliminatedCouponHandler = async (req, res) => {
  try {
    const couponEliminated = await eliminatedCouponController();
    return res.status(200).json(couponEliminated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};  

// Eliminar un cupon;
const deleteCouponHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCoupon = await deleteCouponController(id);
      return res.status(200).json(deletedCoupon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};
// Restaurar un cupon;
const restoreCouponHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const restored = await restoreCouponController(id);
    return res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error:error.message });
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
    eliminatedCouponHandler,
  };