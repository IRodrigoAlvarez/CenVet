<?php

namespace Database\Seeders;

use App\Models\Agenda;
use Illuminate\Database\Seeder;

class AgendaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Agenda::create([
            'atiendeDomingo' => false,
            'atiendeSabado' => false,
            'horasDisponibles' => true,
            'unidadDesfaseInicio' => 'D',
            'cantidadDesfaseInicio' => 2,
            'unidadDesfaseFin' => 'M',
            'cantidadDesfaseFin' => 2
        ]);

    }
}