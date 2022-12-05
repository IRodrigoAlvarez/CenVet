export default class CustomError extends Error {
  status: string = "error";
  message: any;
  httpCode: any;
  internalCode: any;
  data: any;

  constructor({ message, httpCode, internalCode, data }) {
    super();
    this.message = message ?? "Fallo en el servidor";
    this.httpCode = httpCode ?? 500;
    this.internalCode = internalCode ?? 0;
    this.data = data;
  }

  static EXAMPLE_ERROR = new CustomError({
    message: "This is an example",
    httpCode: 403,
    internalCode: 1,
    data: null,
  });
}
