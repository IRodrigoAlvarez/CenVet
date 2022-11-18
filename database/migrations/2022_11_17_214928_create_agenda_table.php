<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agendas', function (Blueprint $table) {
            $table->id();
            $table->boolean('atiendeDomingo')->default(false);
            $table->boolean('atiendeSabado')->default(false);
            $table->boolean('horasDisponibles')->default(true);
            $table->string('unidadDesfaseInicio')->default("D");
            $table->integer('cantidadDesfaseInicio')->default(2);
            $table->string('unidadDesfaseFin')->default("M");
            $table->integer('cantidadDesfaseFin')->default(2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agendas');
    }
};