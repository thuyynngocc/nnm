<?php

namespace App\Http\Middleware;

class CheckLoginAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        if (get_data_user('admins')) {
            return $next($request);
        }

        return redirect()->route('get.login');
    }
}
