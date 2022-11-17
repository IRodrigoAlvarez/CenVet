<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Let's clear the users table first
        User::truncate();

        $faker = \Faker\Factory::create();

        // Let's make sure everyone has the same password and 
        // let's hash it before the loop, or else our seeder 
        // will be too slow.
        $password = Hash::make('12345');

        User::create([
            'nombre' => 'Administrator',
            'apellido' => 'User',
            'email' => 'admin',
            'password' => $password,
            'apiToken' => null,
        ]);

        // And now let's generate a few dozen users for our app:
        for ($i = 0; $i < 4; $i++) {
            User::create([
                'nombre' => $faker->firstName,
                'apellido' => $faker->lastName,
                'email' => $faker->email,
                'password' => $password,
                'apiToken' => null,
            ]);
        }
    }
}