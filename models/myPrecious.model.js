import format from "pg-format";
import { pool } from "../database/myPrecious.connection.js";

const filteredQueryGen = (filteredQuery, filteredQueryProps, name, items) => {
  const queryOperators = {
    $eq: "=",
    $gt: ">",
    $gte: ">=",
    $lt: "<",
    $lte: "<=",
    $ne: "!=",
  };
  for (const i in items) {
    const propertys = Object.keys(items);
    const operator = i;
    const value = items[i];
    filteredQuery += "%s %s '%s' ";
    filteredQueryProps.push(name, queryOperators[operator], value);
    if (i !== propertys[propertys.length - 1]) {
      filteredQuery += "AND ";
    }
  }
  return { filteredQuery, filteredQueryProps };
};

const queryBaseGen = (sort, limit, page, filters) => {
  let query = "select * from inventario ";
  let queryProps = [];
  if (filters) {
    query += "WHERE ";
    const propertys = Object.keys(filters);
    for (const key in filters) {
      const name = key;
      const { filteredQuery, filteredQueryProps } = filteredQueryGen(
        query,
        queryProps,
        name,
        filters[name]
      );
      query = filteredQuery;
      queryProps = filteredQueryProps;
      if (key !== propertys[propertys.length - 1]) {
        query += "AND ";
      }
    }
  }
  if (sort) {
    query += "ORDER BY %s %s ";
    const prop = Object.keys(sort)[0];
    queryProps.push(prop, sort[prop]);
  }
  if (limit) {
    query += "LIMIT %s";
    queryProps.push(limit);
  }
  if (page) {
    query += " OFFSET %s";
    queryProps.push((page - 1) * limit);
  }
  return { query, queryProps };
};

const getInventory = async (sort, limit, page) => {
  const { query, queryProps } = queryBaseGen(sort, limit, page);
  try {
    if (page === "0") {
      throw 400;
    }
    const finalQuery = format(query, ...queryProps);
    const result = await pool.query(finalQuery);
    if (result.fields[0] === undefined || result.rows.length === 0) {
      throw undefined;
    }
    return result.rows;
  } catch (error) {
    return error;
  }
};

const getProduct = async (id) => {
  const query = "select * from inventario where id = $1";
  try {
    const result = await pool.query(query, [id]);
    if (result.fields[0] === undefined || result.rows.length === 0) {
      throw undefined;
    }
    return result.rows;
  } catch (error) {
    return error;
  }
};

const filterProducts = async (sort, limit, page, filters) => {
  let { query, queryProps } = queryBaseGen(sort, limit, page, filters);
  try {
    if (page === "0") {
      throw 400;
    }
    const finalQuery = format(query, ...queryProps);
    const result = await pool.query(finalQuery);
    if (result.fields[0] === undefined || result.rows.length === 0) {
      throw undefined;
    }
    return result.rows;
  } catch (error) {
    return error;
  }
};

export const myPreciousModel = { getInventory, getProduct, filterProducts };
