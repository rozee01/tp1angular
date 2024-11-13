import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ROUTES, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  login(credentials: CredentialsDto) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.id);
        localStorage.setItem('userId', String(response.userId));
        localStorage.setItem('userEmail', response.email);
        this.authService.isAuthenticated.set(true);
        this.authService.userId.set(response.userId);
        this.authService.userEmail.set(response.email);
        this.toastr.success(`Bienvenu chez vous :)`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (error) => {
        this.toastr.error('Veuillez vérifier vos credentials');
      },
    });
  }
}
