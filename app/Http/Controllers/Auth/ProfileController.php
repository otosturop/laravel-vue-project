<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Validator;
use App\Helper\ImageHelper;

class ProfileController extends Controller {

    public function __construct() {
        $this->middleware(['auth:api']);
    }

    public function index(Request $request) {
        $user = $request->user();

        return response()->json([
            'id'       => $user->id,
            'email'    => $user->email,
            'name'     => $user->name,
            'phone'    => $user->phone,
            'user_img' => $user->user_img
        ]);
    }

    public function update(Request $request) {

        if($request->hasFile('image')) {
            $validationRules = array(
                'email' => 'required|email',
                'image' => 'required|image|mimes:jpg,jpeg,png|max:4096'
            );
        } else {
            $validationRules = array(
                'email' => 'required|email'
            );
        }
        $rulers = Validator::make($request->all(), $validationRules);

        if($rulers->fails()) {
            return response()->json(['errors'=>$rulers->errors()], 422);
        }else {
            if($request->hasFile('image')) {

                $image = ImageHelper::upload(rand(1,9000), "/", $request->image, 250,250);
                $imageUpdate = User::where("id", $request->id)->update(
                    array(
                        "user_img"  => $image,
                        "name"      => $request->name,
                        "email"     => $request->email,
                        "phone"     => $request->phone,
                    )
                );
                if($imageUpdate){
                    return response()->json(['url' => $image], 200);
                }
            }else {
                $update = User::where("id", $request->id)->update(
                    array(
                        "name"      => $request->name,
                        "email"     => $request->email,
                        "phone"     => $request->phone,
                    )
                );
                if($update){
                    return response()->json(['success' => 'true'], 200);
                }
            }
        }

    }

}
