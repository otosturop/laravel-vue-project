<?php


Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
    Route::post('signin', 'SignInController');
    Route::post('signup', 'SignUpController');
    Route::post('signout', 'SignOutController');
    Route::get('me', 'MeController');

    Route::post('profile', 'ProfileController@index');
    Route::post('profile-update', 'ProfileController@update');
});
