import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  mostrarPassword = false;

  constructor(private fb: FormBuilder, private navCtrl: NavController,
     private loadingCtrl: LoadingController, private storage: Storage) {}

  ngOnInit() {
    // Verifica si el usuario ya ha iniciado sesión
    //const usuarioGuardado = localStorage.getItem('usuario');
    //if (usuarioGuardado) {
      //this.navCtrl.navigateForward('/home');
    //}

    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Verificando...',
        duration: 2000
      });
      await loading.present();

      setTimeout(async  () => {
        await this.storage.set('usuarioAutenticado', true);
        await this.storage.set('usuario', this.loginForm.value.usuario);
        //localStorage.setItem('usuario', this.loginForm.value.usuario);
        console.log('Usuario autenticado:', this.loginForm.value);
        this.navCtrl.navigateForward('/home');
      }, 2000);
    }
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
