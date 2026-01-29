<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function home()
    {
        return Inertia::render('front/home');
    }

    public function privacy()
    {
        return Inertia::render('front/privacy');
    }

    public function legal()
    {
        return Inertia::render('front/legal');
    }

    public function cgv()
    {
        return Inertia::render('front/cgv');
    }

    public function about()
    {
        return Inertia::render('front/about');
    }

    public function faqs()
    {
        $faqs = Faq::active()->latest()->paginate(10);

        return Inertia::render('front/faqs', [
            'faqs' => Inertia::scroll(FaqResource::collection($faqs)),
        ]);
    }
}
