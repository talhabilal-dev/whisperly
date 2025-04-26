<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::get('/check-username/{username}', [RegisteredUserController::class, 'checkUsername']);
