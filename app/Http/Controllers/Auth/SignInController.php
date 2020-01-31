<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class SignInController extends Controller {

    public function __invoke(Request $request) {

        $validationRules = array(
            'email'    => 'required|email',
            'password' => 'required',
        );
        $credentials = $request->only(['email', 'password']);

        $rulers = Validator::make($credentials, $validationRules);

        if($rulers->fails()){
            return response()->json(['error' => 'fill the blank'], 401);
        }else {
            if (! $token = auth()->attempt($credentials))
                return response()->json(['error' => 'Unauthorized'], 401);

            return response()->json(compact('token'));
        }
    }

}
