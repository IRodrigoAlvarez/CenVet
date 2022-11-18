<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model;

class Agenda extends Model
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'atiendeDomingo',
    'atiendeSabado',
    'horasDisponibles',
    'unidadDesfaseInicio',
    'cantidadDesfaseInicio',
    'unidadDesfaseFin',
    'cantidadDesfaseFin'
  ];

}