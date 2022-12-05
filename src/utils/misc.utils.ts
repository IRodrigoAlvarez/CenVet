const bloques = [
  { bloque: 1, hora: "09:00 - 09:30" },
  { bloque: 2, hora: "09:30 - 10:00" },
  { bloque: 3, hora: "10:00 - 10:30" },
  { bloque: 4, hora: "10:30 - 11:00" },
  { bloque: 5, hora: "11:00 - 11:30" },
  { bloque: 6, hora: "11:30 - 12:00" },
  { bloque: 7, hora: "12:00 - 12:30" },
  { bloque: 8, hora: "12:30 - 13:00" },
  { bloque: 9, hora: "14:30 - 15:00" },
  { bloque: 10, hora: "15:00 - 15:30" },
  { bloque: 11, hora: "15:30 - 16:00" },
  { bloque: 12, hora: "16:00 - 16:30" },
  { bloque: 13, hora: "16:30 - 17:00" },
  { bloque: 14, hora: "17:00 - 17:30" },
  { bloque: 15, hora: "17:30 - 18:00" },
];

export default class MiscUtils {
  public static obtenerBloques(): any[] {
    return bloques;
  }

  public static obtenerDiasPorMes(mes: number, año: number) {
    var date = new Date(año, mes, 1);
    var dias = [];
    while (date.getMonth() === mes) {
      let fecha = new Date(date).toISOString().split("T")[0];
      dias.push(fecha);
      date.setDate(date.getDate() + 1);
    }
    return dias;
  }
}
