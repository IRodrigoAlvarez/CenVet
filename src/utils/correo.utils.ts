import { Reserva } from "../models/reserva.model";
import * as nodemailer from "nodemailer";
import { ENV } from "../config/env.config";
import { Agenda } from "../models/agenda.model";

export default class CorreoUtils {
  public static async enviarCorreo(reserva: Reserva): Promise<void> {
    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: ENV.email,
        pass: ENV.password,
      },
    });

    const emailHtml: string = `<html lang="en">
   <head>
      <style type="text/css">
         body {
         background-color: #19a25c;
         font-family: Arial;
         }
         .card {
         background-color: #ffffff;
         text-align: left;
         width: 400px;
         padding: 16px;
         border-radius: 5px;
         } 
         h1 {
         color: #19a25c;
         }
         td {
         min-width: 150px;
         }
      </style>
   </head>
   <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
         <tr>
            <td align="center">
               <div class="card">
                  <h1>
                     ¡Reserva exitosa!
                  </h1>
                  <p>
                     A continuación encontrarás los datos de tu cita:
                  </p>
                  <table>
                     <tr>
                        <td>Mascota</td>
                        <td>${reserva.nombreMascota}</td>
                     </tr>
                     <tr>
                        <td>Fecha</td>
                        <td>${reserva.fecha}</td>
                     </tr>
                     <tr>
                        <td>Hora</td>
                        <td>${reserva.hora}</td>
                     </tr>
                     <tr>
                        <td>Servicio</td>
                        <td>${(reserva.agenda as Agenda).nombre}</td>
                     </tr>
                     ${
                       reserva.responsable
                         ? "<tr><td>Médico</td><td>" +
                           reserva.responsable +
                           "</td></tr>"
                         : ""
                     }
                     <tr>
                        <td>Dirección</td>
                        <td>San Francisco 3986, San Miguel</td>
                     </tr>
                     <tr>
                        <th>Nº Reserva</th>
                        <th>${reserva.numero}</th>
                     </tr>
                  </table>
                  <p>Recuerda <a href="https://cenvet-agenda-j5jp5.ondigitalocean.app/anular">anular</a> tu cita si es que no puedes asistir.</p>
               </div>
            </td>
         </tr>
      </table>
   </body>
</html>`;

    console.log("Enviando correo:", reserva.email);
    client.sendMail({
      from: ENV.email,
      to: reserva.email,
      subject: "[CenVet] Confirmación de Reserva",
      html: emailHtml,
    });
  }
}
