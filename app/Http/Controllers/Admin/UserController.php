<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SuperAdmin\UserRequest;
use App\Http\Resources\CountryResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => ['integer', 'min:1'],
            'per_page' => ['integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string'],
            'sort' => ['nullable', 'string'],
        ]);

        $query = User::query();

        if ($request->filled('search')) {
            $searchColumns = ['firstname', 'lastname', 'email'];
            $query->whereAny($searchColumns, 'like', '%'.$request->string('search').'%');
        }

        $allowed = ['firstname', 'lastname', 'email', 'status', 'created_at', 'updated_at'];
        if ($request->filled('sort')) {
            $sort = $request->string('sort');
            $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
            $column = ltrim($sort, '-');
            if (in_array($column, $allowed)) {
                $query->orderBy($column, $direction);
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $request->integer('per_page', 10);
        $users = $query->paginate($perPage)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => UserResource::collection($users)->response()->getData(true),
            'filters' => $request->only(['search', 'status', 'sort', 'per_page']),
        ]);
    }
}
