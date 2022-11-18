<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class Reserva extends Model
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'fecha',
    'bloque',
    'hora',
    'nombreMascota',
    'especie',
    'sexo',
    'edad',
    'nombreApoderado',
    'email',
    'telefono',
  ];

}