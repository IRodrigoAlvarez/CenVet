<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $user = User::where("email", $email)
            ->get();

        if (count($user) == 0) {
            return response()->json(null, 404);
        } else {
            $user = $user[0];
            $checkPass = Hash::check($password, $user->password);

            if ($checkPass) {
                $apiToken = $user->createToken("apiToken")->plainTextToken;
                return response()->json($apiToken, 200);
            } else {
                return response()->json(null, 401);
            }
        }

    }
}