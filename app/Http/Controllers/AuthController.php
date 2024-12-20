<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /**  @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt(
                $data['password']
            )
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember= $data['remember'] ?? false;
        unset($credentials['remember']);
        if(!Auth::attempt($credentials,$remember)){
            return response([
                'error'=>'The provided credentials are not corrected'
            ],422);
        }
        $user = Auth::user();
        $token=$user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
      //  dd($request);
        $user = Auth::user();
        //dd($user);
        $user->currentAccessToken()->delete();
        return response([
            'success'=>true
        ])->header('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
    public function me(Request $request)
    {
        return $request->user();
    }
}
