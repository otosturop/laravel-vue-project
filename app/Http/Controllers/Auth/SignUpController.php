<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Validator;
use Illuminate\Support\Facades\Hash;

class SignUpController extends Controller {

    public function __invoke(Request $request) {

        $validationRules = array(
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        );
        $credentials = $request->only(['email', 'password', 'password_confirmation']);

        $rulers = Validator::make($credentials, $validationRules);

        if($rulers->fails()){
            return response()->json(['errors'=>$rulers->errors()], 422);
        }else {
            $user = User::insert(
                array(
                    "email"    => $request->email,
                    "password" => Hash::make($request->password)
                )
            );
            if ($user) {
                return response()->json(compact('success'));
            } else {
                return response()->json(['error' => 'insert error']);
            }

        }
    }
}
