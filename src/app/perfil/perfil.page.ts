import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';
import { FutbolService } from '../servicios/futbol.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = 'Invitado';
  latitud!: number;
  longitud!: number;
  mostrarUbicacion = false;
  equiposDisponibles: { nombre: string; imagen: string }[] = [];

  equipoFavorito =  '';
  favoritos: string[] = [];

  async ngOnInit() {
    this.usuario = await this.storage.get('usuario') || 'Invitado';
    this.equipoFavorito = await this.storage.get('equipo') || '';
    this.favoritos = await this.storage.get('favoritos') || [];
    this.apiService.getEquipos().subscribe(data => {
      this.equiposDisponibles = data?.teams.map((team: any) => ({
        nombre: team.strTeam,
        imagen: team.strBadge
      }));
    });

    console.log('Favoritos cargados:', this.favoritos);
     if (this.favoritos.length === 0) {
    console.warn('⚠ Favoritos está vacío en Storage.');
    }
  }

  async obtenerUbicacion(){
    if(this.mostrarUbicacion) {
      this.mostrarUbicacion = false;
      return;
    }
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
      this.mostrarUbicacion = true;
      console.log('📍 Ubicación obtenida:', this.latitud, this.longitud);
    } catch (error) {
      console.error('❌ Error obteniendo ubicación:', error);
    }
  }

  ionViewWillEnter() {
    this.cargarUsuario();
  }
  async cargarUsuario() {
    const nombre = await this.storage.get('usuario');
    this.usuario = nombre || 'Invitado';
  }

  async guardarUsuario() {
    await this.storage.set('usuario', this.usuario);
    //localStorage.setItem('usuario', this.usuario);
  }

  async guardarEquipo(event: any) {
  this.equipoFavorito = event.detail.value;
  await this.storage.set('equipo', this.equipoFavorito); 
  this.mostrarToast('✅ Equipo guardado como favorito');
  //localStorage.setItem('equipo', this.equipoFavorito);
  
  if (this.equipoFavorito && !this.favoritos.includes(this.equipoFavorito)) {
    this.favoritos.push(this.equipoFavorito); // ✅ Guarda solo el nombre, no el objeto
    await this.storage.set('favoritos', this.favoritos);
    //localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  console.log('Favoritos actualizados:', JSON.stringify(this.favoritos)); // Verifica en consola
  }

  async eliminarEquipo(equipo: string) {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.mostrarToast('❌ Estás sin conexión. Acción no permitida.', 'danger');
      return;
    }
    this.favoritos = this.favoritos.filter(e => e !== equipo);
    await this.storage.set('favoritos', this.favoritos);
    this.mostrarToast('🗑️ Equipo eliminado');
    //localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  async limpiarFavoritos(){
    const status = await Network.getStatus();
    if (!status.connected) {
      this.mostrarToast('❌ Estás sin conexión. Acción no permitida.', 'danger');
      return;
    }
    this.favoritos = [];
    await this.storage.set('favoritos', []);
    this.mostrarToast('🌪️ Lista de favoritos vaciada', 'medium');
  }

  async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  getImagenEquipo(equipo: any): string {
  if (!equipo || typeof equipo !== 'string') {
    console.error('⚠ Error en getImagenEquipo: equipo no es válido', equipo);
    return 'assets/default.jpeg'; // ✅ Imagen por defecto si el valor es incorrecto
  }

  const equipoEncontrado = this.equiposDisponibles.find(e => e.nombre.trim().toLowerCase() === equipo.trim().toLowerCase());
  
  if (!equipoEncontrado) {
    console.error('⚠ No se encontró imagen para:', equipo);
  }
  
  return equipoEncontrado ? equipoEncontrado.imagen : 'assets/default.jpeg';
  }

  constructor(private router: Router, private storage: Storage,
     private apiService: FutbolService, private toastController: ToastController) {}

  navegarA(pagina: string) {
    this.router.navigate(['/' + pagina]);
  }
}