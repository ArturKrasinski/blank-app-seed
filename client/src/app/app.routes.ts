import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authHostPath } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  /**
   * Re-direct to dashboard when the route / is hit.
   */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  /**
   * Main dashboard, guarded by our AuthGuard.
   */
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  /**
   * An example of lazy loading a micro frontend.
   */
  { path: authHostPath, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
  /**
   * Catch all to not-found.
   */
  { path: '**', component: NotFoundComponent },
];

