<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:Etudiant,Enseignant'],
            'etudiant_id' => ['required_if:role,Etudiant', 'nullable', 'string', 'max:20', 'unique:users,etudiant_id'],
            'educator_id' => ['required_if:role,Enseignant', 'nullable', 'string', 'max:20', 'unique:users,educator_id'],
        ]);

        // Create a new user instance
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'etudiant_id' => $request->role === 'Etudiant' || true? $request->etudiant_id : null,
            'educator_id' => $request->role === 'Enseignant' ? $request->educator_id : null,
        ]);

        event(new Registered($user));

        Auth::login($user);

        $request->session()->regenerate();

        if ($user->role === 'Enseignant') {
            return redirect()->route('enseignant.dashboard');
        } elseif ($user->role === 'Etudiant') {
            return redirect()->route('CourDetail');
        }

        return redirect()->intended('dashboard');
    }
}
