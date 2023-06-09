import { handleErrors } from "../database/errors.js";
import { myPreciousModel } from "../models/myPrecious.model.js";

const getStock = (result) => {
  let totalStock = 0;
  result.map((product) => (totalStock += product.stock));
  return totalStock;
};

const inventory = async (req, res) => {
  const { sort, limit = 5, page = 1 } = req.query;
  try {
    const result = await myPreciousModel.getInventory(sort, limit, page);
    if (result === undefined) {
      throw { code: "404" };
    } else if (result.name === "error") {
      throw { code: result.code, message: result.message };
    } else if (result === 400) {
      throw { code: "400" };
    }
    const resultInfo = result.map((item) => ({
      name: item.nombre,
      href: `/joyas/joya/${item.id}`,
    }));
    return res.json({
      totalJoyas: result.length,
      stockTotal: getStock(result),
      results: resultInfo,
    });
  } catch (error) {
    const { status, message } = handleErrors(error.code, error.message);
    return res.status(status).json({ status, message });
  }
};

const product = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await myPreciousModel.getProduct(id);
    if (result === undefined) {
      throw { code: "404" };
    } else if (result.name === "error") {
      throw { code: result.code, message: result.message };
    }
    return res.json({
      ok: true,
      result,
    });
  } catch (error) {
    const { status, message } = handleErrors(error.code, error.message);
    return res.status(status).json({ status, message });
  }
};

const filterInventory = async (req, res) => {
  const { sort, limit = 5, page = 1, filters } = req.query;
  try {
    const result = await myPreciousModel.filterProducts(
      sort,
      limit,
      page,
      filters
    );
    if (result === undefined) {
      throw { code: "404" };
    } else if (result.name === "error") {
      throw { code: result.code, message: result.message };
    } else if (result === 400) {
      throw { code: "400" };
    }
    return res.json({
      totalJoyas: result.length,
      stockTotal: getStock(result),
      result,
    });
  } catch (error) {
    const { status, message } = handleErrors(error.code, error.message);
    return res.status(status).json({ status, message });
  }
};

export const myPreciousController = {
  inventory,
  filterInventory,
  product,
};
