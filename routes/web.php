<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\EnseigantRole;
use App\Http\Middleware\EtudiantRole;
use App\Http\Controllers\CourDetailsController;
use App\Http\Controllers\EducatorsController;
use App\Http\Controllers\KPIsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\RecommandationsController;

use Inertia\Inertia;

Route::resource('courDetail', CourDetailsController::class);
Route::resource('kpi', KPIsController::class);
Route::resource('dash', DashboardController::class);
Route::resource('dashEdu', EducatorsController::class);
Route::resource('reco', RecommandationsController::class);
Route::get('/', function(){
    return inertia('Welcome',[
        'isAuthenticated' => auth()->check(),
    ]);
})->name('home');

Route::middleware(['auth',EtudiantRole::class])->group(function(){
    
    
    Route::get('/meeting', function(){
        return inertia('meeting');
    })->name('meeting');
    Route::get('/dashbord', [DashboardController::class,'index'])->name('dashboard');
    Route::get('/StudentForm', [CourDetailsController::class, 'index'])->name('CourDetail');
    Route::get('/StudentKPI', [KPIsController::class,'index'] )->name('KPIdash');
    Route::get('/Prediction', [PredictionController::class,'index'] )->name('pred');
    Route::get('/Recomandation', [RecommandationsController::class,'index'] )->name('recom');

});

Route::get('/EducatorHome', [EducatorsController::class, 'index'])->name('enseignant_dashboard')->middleware(['auth', EnseigantRole::class]);
Route::post('/dashEdu/update-rattrapages', [EducatorsController::class, 'updateRattrapages'])->name('dashEdu.updateRattrapages');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
