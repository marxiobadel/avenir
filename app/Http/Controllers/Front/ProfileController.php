<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Resources\AddressResource;
use App\Http\Resources\CountryResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('front/profile/index');
    }

    public function edit(Request $request)
    {
        return Inertia::render('front/profile/edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($request->user()->id),
            ],
            'phone' => 'nullable|string|max:255',
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        if ($request->hasFile('image')) {
            $request->user()->addMediaFromRequest('image')->toMediaCollection('profile');
        }

        return back()->with('success', 'Profil mis à jour avec succès.');
    }

    public function addresses(Request $request)
    {
        $countries = getCountries();

        return Inertia::render('front/profile/addresses', [
            'addresses' => AddressResource::collection($request->user()->addresses),
            'countries' => fn() => CountryResource::collection($countries),
        ]);
    }

    public function password()
    {
        return Inertia::render('front/profile/password');
    }
}
