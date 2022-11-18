<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;


class ReservaHorasController extends Controller
{
  private $bloques = [
    ['bloque' => 1, 'hora' => "09:00 - 09:30"],
    ['bloque' => 2, 'hora' => "09:30 - 10:00"],
    ['bloque' => 3, 'hora' => "10:00 - 10:30"],
    ['bloque' => 4, 'hora' => "10:30 - 11:00"],
    ['bloque' => 5, 'hora' => "11:00 - 11:30"],
    ['bloque' => 6, 'hora' => "11:30 - 12:00"],
    ['bloque' => 7, 'hora' => "12:00 - 12:30"],
    ['bloque' => 8, 'hora' => "12:30 - 13:00"],
    ['bloque' => 9, 'hora' => "14:30 - 15:00"],
    ['bloque' => 10, 'hora' => "15:00 - 15:30"],
    ['bloque' => 11, 'hora' => "15:30 - 16:00"],
    ['bloque' => 12, 'hora' => "16:00 - 16:30"],
    ['bloque' => 13, 'hora' => "16:30 - 17:00"],
    ['bloque' => 14, 'hora' => "17:00 - 17:30"],
    ['bloque' => 15, 'hora' => "17:30 - 18:00"],
  ];

  function dates_month($month, $year)
  {
    $num = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    $dates_month = array();

    for ($i = 1; $i <= $num; $i++) {
      $mktime = mktime(0, 0, 0, $month, $i, $year);
      $date = date("Y-m-d", $mktime);
      array_push($dates_month, ["fecha" => $date]);
    }

    return $dates_month;
  }

  function diaDisponible($dia)
  {
    $key = array_keys($this->bloques);
    $size = sizeOf($key);
    for ($i = 0; $i < $size; $i++) {
      $reserva = Reserva::where("fecha", $dia)->where("bloque", $this->bloques[$key[$i]]["bloque"])
        ->get();

      if (count($reserva) == 0) {
        return true;
      }
    }
    return false;
  }


  public function obtenerFechas(Request $request)
  {
    $año = $request->route('año');
    $mes = $request->route('mes');
    $fechas = $this->dates_month($mes, $año);

    $key = array_keys($fechas);
    $size = sizeOf($key);
    for ($i = 0; $i < $size; $i++) {
      $fechas[$key[$i]]['disponible'] = $this->diaDisponible($fechas[$key[$i]]["fecha"]);
    }

    return response()->json($fechas, 200);
  }

  public function obtenerHoras(Request $request)
  {
    $año = $request->route('año');
    $mes = $request->route('mes');
    $dia = $request->route('dia');
    $fecha = $año . '-' . $mes . '-' . $dia;

    $key = array_keys($this->bloques);
    $size = sizeOf($key);

    $reservas = array();

    for ($i = 0; $i < $size; $i++) {
      $reserva = Reserva::where("fecha", $fecha)->where("bloque", $this->bloques[$key[$i]]["bloque"])
        ->get();

      array_push($reservas, [
        "bloque" => $this->bloques[$key[$i]]["bloque"],
        "hora" => $this->bloques[$key[$i]]["hora"],
        "disponible" => (count($reserva) == 0)
      ]);

    }
    return response()->json($reservas, 201);
  }

  public function reservarHora(Request $request)
  {
    $fecha = $request->fecha;
    $bloque = $request->bloque;
    $hora = $request->hora;

    if (!$fecha || !$bloque || !$hora) {
      return response()->json(null, 418);
    }

    $reservaExistente = Reserva::where("fecha", $fecha)
      ->where("hora", $hora)
      ->get();

    if (count($reservaExistente) > 0) {
      return response()->json(null, 400);
    }

    $reserva = Reserva::create($request->all());
    return response()->json($reserva, 201);
  }
}