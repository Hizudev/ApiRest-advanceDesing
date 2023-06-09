export const handleErrors = (code, message) => {
  if (!code) {
    return {
      status: 500,
      message: "Error de servidor: Error desconocido",
    };
  }
  switch (code) {
    case "22P02":
      return {
        status: 400,
        message: message,
      };

    case "42703":
      return {
        status: 400,
        message: message,
      };
    case "2201W":
      return {
        status: 400,
        message: message,
      };

    case "2201X":
      return {
        status: 400,
        message: message,
      };

    case "42601":
      return {
        status: 400,
        message: message,
      };
    case "42P01":
      return {
        status: 404,
        message: message,
      };
    case "400":
      return {
        status: 400,
        message: "Error: parametro 'page' no puede ser 0",
      };
    case "404":
      return {
        status: 404,
        message: "Error: Solicitud no encontrada",
      };
  }
};
