import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = localStorage.getItem('usuario') || 'Ricardo';
  equiposDisponibles = [
    { nombre: 'Barcelona', imagen: 'assets/barca.jpg' },
    { nombre: 'Madrid', imagen: 'assets/real.jpg' },
    { nombre: 'Liverpool', imagen: 'assets/liverpool.png' },
    { nombre: 'Borussia Dortmund', imagen: 'assets/bvb.png' },
    { nombre: 'PSG', imagen: 'assets/psg.png' },
    { nombre: 'Manchester City', imagen: 'assets/city.png' }
  ];

  equipoFavorito = localStorage.getItem('equipo') || '';
  favoritos: string[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

  ngOnInit() {
  console.log('Favoritos cargados:', this.favoritos);
     if (this.favoritos.length === 0) {
    console.warn('⚠ Favoritos está vacío, revisa localStorage.');
    }
  }

  guardarUsuario() {
    localStorage.setItem('usuario', this.usuario);
  }

  guardarEquipo(event: any) {
  this.equipoFavorito = event.detail.value; 
  localStorage.setItem('equipo', this.equipoFavorito);
  
  if (this.equipoFavorito && !this.favoritos.includes(this.equipoFavorito)) {
    this.favoritos.push(this.equipoFavorito); // ✅ Guarda solo el nombre, no el objeto
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  console.log('Favoritos actualizados:', JSON.stringify(this.favoritos)); // Verifica en consola
  }

  eliminarEquipo(equipo: string) {
    this.favoritos = this.favoritos.filter(e => e !== equipo);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
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

  constructor(private router: Router) {}

  navegarA(pagina: string) {
    this.router.navigate(['/' + pagina]);
  }
}