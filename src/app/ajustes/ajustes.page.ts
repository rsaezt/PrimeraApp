import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  usuario = localStorage.getItem('usuario') || 'Ricardo';
  modoOscuro = localStorage.getItem('modoOscuro') === 'true';
  constructor(private router: Router) {}
  navegarA(pagina: string){
    this.router.navigate(['/' + pagina]);
  }

  ngOnInit() {
    this.modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    document.body.setAttribute('color-theme', this.modoOscuro ? 'dark' : 'light');

    //document.body.classList.toggle('dark', this.modoOscuro);
    //this.aplicarTema(); // ✅ Aplicar tema al iniciar la página
  } 

  guardarUsuario() {
    localStorage.setItem('usuario', this.usuario);
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

  imagenPerfil = localStorage.getItem('imagenPerfil') || '';

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPerfil = reader.result as string;
        localStorage.setItem('imagenPerfil', this.imagenPerfil);
      };
      reader.readAsDataURL(archivo);
    }
  }

  estadoUsuario = localStorage.getItem('estadoUsuario') || '';

  guardarEstado() {
    localStorage.setItem('estadoUsuario', this.estadoUsuario);
  } 

  cerrarSesion() {
    localStorage.clear(); // ✅ Elimina datos del usuario
    this.router.navigate(['/login']); // ✅ Redirige al login
  }
}
