import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  usuario = 'Invitado';
  modoOscuro = localStorage.getItem('modoOscuro') === 'true';
  constructor(private router: Router, private storage: Storage, private navCtrl: NavController, private toastController: ToastController) {}
  navegarA(pagina: string){
    this.router.navigate(['/' + pagina]);
  }

  imagenPerfil = '';
  async ngOnInit() {
    const nombre = await this.storage.get('usuario');
    this.usuario = nombre || 'Invitado';
    this.imagenPerfil = await this.storage.get('imagenPerfil') || '';
    this.modoOscuro = localStorage.getItem('modoOscuro') === 'true';
    this.storage.get('estadoUsuario').then(estado => {
      this.estadoUsuario = estado || '';
    })

    document.body.setAttribute('color-theme', this.modoOscuro ? 'dark' : 'light');

    //document.body.classList.toggle('dark', this.modoOscuro);
    //this.aplicarTema(); // ✅ Aplicar tema al iniciar la página
  } 

  async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  async guardarUsuario() {
    await this.storage.set('usuario', this.usuario);

    const status = await Network.getStatus();
    if (status.connected) {
      await this.mostrarToast('✅ Nombre actualizado correctamente');
    } else {
      await this.mostrarToast('✅ Nombre guardado (sin conexión)', 'warning');
    }
    //localStorage.setItem('usuario', this.usuario);
  }

  cambiarTema(event: any) {
    this.modoOscuro = event.detail.checked;
    localStorage.setItem('modoOscuro', String(this.modoOscuro));
    document.body.setAttribute('color-theme', this.modoOscuro ? 'dark' : 'light');

    //this.aplicarTema();
    //document.body.classList.toggle('dark', this.modoOscuro);
    //document.documentElement.setAttribute('data-theme', this.modoOscuro ? 'dark' : 'light');
  }

  aplicarTema() {
    //const root = document.documentElement; // ✅ Aplicar el modo oscuro de forma global
    if (this.modoOscuro) {
      document.body.classList.add('dark');
      //root.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark');
      //root.classList.remove('dark-mode');
    }
  }

  resetearDatos() {
    localStorage.clear();
    location.reload(); // ✅ Recargar para reflejar los cambios
  }

  

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPerfil = reader.result as string;
        this.storage.set('imagenPerfil', this.imagenPerfil);
      };
      reader.readAsDataURL(archivo);
    }
  }

  estadoUsuario = '';

  async guardarEstado() {
    await this.storage.set('estadoUsuario', this.estadoUsuario);
    const status = await Network.getStatus();
    if (status.connected) {
      await this.mostrarToast('✅ Estado actualizado correctamente');
    } else {
      await this.mostrarToast('✅ Estado guardado (sin conexión)', 'warning');
    }
  } 

  //cerrarSesion() {
    //localStorage.clear(); // ✅ Elimina datos del usuario
    //this.router.navigate(['/login']); // ✅ Redirige al login
  //}
  async logout() {
    await this.storage.remove('usuarioAutenticado');
    await this.storage.remove('usuario');
    await this.storage.remove('equipo');
    await this.storage.remove('favoritos');
    await this.storage.remove('estadoUsuario');
    await this.storage.remove('imagenPerfil');

    this.navCtrl.navigateRoot('/login');
  }
}
