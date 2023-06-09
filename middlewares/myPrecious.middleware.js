export const reportQuery = async (req, res, next) => {
  let result = [];
  const { id } = req.params;
  const queryParams = req.query;
  const url = req.url;
  if (id) {
    result.push({ id });
  }
  if (Object.keys(queryParams).length !== 0) {
    result.push(queryParams);
  }
  console.log(
    `
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    ${
      result.length === 0
        ? `sin parametros. Se adoptan parametros por defecto.`
        : `con los parámetros:`
    }
    `,
    result
  );
  next();
};
