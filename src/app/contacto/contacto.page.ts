import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {
  // ✅ Datos del Foro de Fútbol
  mensajes = [
    { usuario: 'Juan', texto: '¿Vieron el último partido? ¡Fue increíble!' },
    { usuario: 'Ana', texto: 'Sí, el gol de último minuto fue espectacular!' }
  ];

  mensajeNuevo = '';

  enviarMensaje() {
    if (this.mensajeNuevo.trim() !== '') {
      this.mensajes.push({ usuario: 'Tú', texto: this.mensajeNuevo });

      
      this.mensajeNuevo = '';

      
    }
  }

  // ✅ Datos del Formulario de Contacto
  correoUsuario = '';
  mensajeUsuario = '';

  validarCorreo(correo: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  enviarCorreo() {
    if (this.correoUsuario.trim() === '' || this.mensajeUsuario.trim() === '') {
      alert('Por favor, completa todos los campos antes de enviar el mensaje.');
      return;
    }
    console.log('Correo enviado a:', this.correoUsuario);
    console.log('Mensaje:', this.mensajeUsuario);

   

    if (!this.validarCorreo(this.correoUsuario)) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    const destinatario = 'correo@ejemplo.com';
    const asunto = 'Consulta desde la app';
    const cuerpo = encodeURIComponent(`Correo: ${this.correoUsuario}\nMensaje: ${this.mensajeUsuario}`);
    
    window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;

    alert('✅ Mensaje enviado correctamente.');
    this.correoUsuario = '';
    this.mensajeUsuario = '';
 
  }

  constructor(private router: Router) {}

  navegarA(pagina: string) {
    this.router.navigate(['/' + pagina]);
  }

} 