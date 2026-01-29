<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $validated = Validator::make($input, [
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => $this->passwordRules(),
        ])->validate();

        return DB::transaction(function () use ($validated) {
            $user = User::create($validated);

            return $user;
        });
    }
}
