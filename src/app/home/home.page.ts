import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nombreUsuario = '';
  constructor(private animationCtrl: AnimationController, private router: Router, private changeDetectorRef: ChangeDetectorRef){}
  ngOnInit(){
    this.cargarNombreUsuario();
    this.fadeInNoticias();
    this.cantidadNoticias = 7;
    setInterval(() => {
      const nuevoNombre = localStorage.getItem('usuario');
      if (nuevoNombre && nuevoNombre !== this.nombreUsuario){
        this.nombreUsuario = nuevoNombre;
      }
    }, 1000);
  
  }

  fadeInNoticias(){
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.fade-in'))
      .duration(800)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(10px)', 'translateY(0)');

    animation.play();
  }

  expandirNoticia(noticia: any) {
    const elemento = document.querySelector(`#noticia-${noticia.titulo}`);

    if (elemento) { // 🔹 Verificamos que el elemento existe antes de animarlo
      const animation = this.animationCtrl.create()
        .addElement(elemento)
        .duration(500)
        .fromTo('max-height', '0px', '200px');

      animation.play();
    }

    noticia.expandida = !noticia.expandida;
  } 


  cargarNombreUsuario(){
    const nombreGuardado = localStorage.getItem('usuario');
    this.nombreUsuario = nombreGuardado ? nombreGuardado : 'Invitado';
  }
  noticias = [
    { titulo: '⚽ Alemania vs. Francia en la Nations League',
      resumen: 'El 8 de junio, Alemania y Francia se enfrentaron en Stuttgart para definir al tercer lugar',
      detalle: 'Tras la derrota que sufrió ante España en semifinales, Francia se quedó con el tercer puesto de la UEFA Nations League. El elenco galo batió por 2-0 a Alemania en el MHP Arena de Stuttgart y se quedó con la medalla de bronce en el certamen europeo. recuperándose de la dolorosa derrota ante el conjunto hispano en semifinales. ',
      imagen: 'assets/francia.jpg',
      expandida: false },
    { titulo: '🏆 El Mundial de Clubes inicia la próxima semana', 
      resumen: 'El torneo arranca el 14 de junio en EE.UU. con 32 equipos compitiendo.',
      detalle: 'El partido inaugural sera entre el Inter Miami y el Al Ahly',
      imagen: 'assets/clubes.jpg',
      expandida: false },
    { titulo: 'El Fichaje de Florian Wirtz',
      resumen: 'Liverpool espera concretar el fichaje pronto',
      detalle: 'El Liverpool, a punto de fichar a Florian Wirtz en un traspaso récord tras enviar una nueva oferta por la estrella de Bayer Leverkusen de €150 millones',
      imagen: 'assets/florian.jpg',
      expandida: false
    },

    { titulo: 'Reijnders al Manchester City',
      resumen: 'Reijnders se hara las pruebas medicas este fin de semana',
      detalle: 'El Manchester City ha llegado a un acuerdo por valor de 55 millones de euros (62 millones de dólares) con el AC Milan por el centrocampista Tijjani Reijnders, Si firma a tiempo, el primer partido de Reijnders en el City podría llegar en el Mundial de Clubes de Estados Unidos.',
      imagen: 'assets/reij.jpg',
      expandida: false
    },
    { titulo: 'Aït-Nouri al  Manchester City',
      resumen: 'El lateral izquierdo del Wolverhampton, Rayan Aït-Nouri, será nuevo jugador del Manchester City',
      detalle: ' El Manchester City está a punto de asegurar un gran golpe en el mercado de fichajes, ya que el lateral Rayan Ait-Nouri ha pasado con éxito su reconocimiento médico con el club.',
      imagen: 'assets/rayan.jpg',
      expandida: false
    },
    { titulo: 'Chelsea piensa en Maignan',
      resumen: 'El Milán rechaza la primera oferta por Mike Maignan',
      detalle: 'El Chelsea ha iniciado su ofensiva por Mike Maignan, pero el AC Milan no está dispuesto a dejar marchar tan fácilmente a su guardameta titular. La propuesta inicial del club londinense, que incluía variables, no alcanzaba los 20 millones de euros, una cifra considerada muy baja por los dirigentes del Milan. La respuesta desde San Siro fue clara y contundente: no están interesados en negociar por debajo de los 30 millones, cantidad mínima que consideran acorde al valor del arquero.',
      imagen: 'assets/mike.jpg',
      expandida: false
    },
    { titulo: '¡Victor Osimhen rechaza la desorbitada oferta del Al-Hilal!',
      resumen: 'Victor Osimhen quiere tomarse su tiempo',
      detalle: 'El club saudí, que sufrió una temporada decepcionante tras perder el título ante el Al-Ittihad, buscaba -como era de esperar- causar un notable impacto. De esta forma, ha tirado la casa por la ventana para acoger a Simone Inzaghi, entrenador que ha dejado un buen legado en el Inter de Milán. Un técnico que ha dado prioridad a la incorporación de Osimhen, así que el Al-Hilal le había presentado una descomunal oferta salarial de 120 M€ por tres años -40 M€ anuales-.',
      imagen: 'assets/osi.jpg',
      expandida: false
    },
    { titulo: '¡Acuerdo sellado por Jobe Bellingham!',
      resumen: 'Sera jugador del Borussia Dortmund',
      detalle: 'El acuerdo está encauzado para una operación de 33 M€ fijos + otros 5 M€ en variables. Los ingleses(Sunderland) se guardarán el 15 % de una futura venta del jugador, un diamante en bruto que aterrizará en la Bundesliga. Jobe seguirá los pasos de su hermano Jude, quien se sumó al BVB antes de su posterior fichaje por el Real Madrid.',
      imagen: 'assets/jobe.jpg',
      expandida: false
    },
    { titulo: 'Luciano Spalleti, Destituido',
      resumen: 'La selección Italiana despidio al entrenador',
      detalle: 'La Selección Italiana se llevó un severo correctivo en la casa de Noruega, todo ello en su camino por acudir al Mundial 2026. Pese a ello, ha sido sorprendente la decisión que ha tomado la Federación Transalpina en la sesión dominical. En concreto, ha optado por cesar en su cargo en el banquillo a Luciano Spalletti.',
      imagen: 'assets/spa.jpg',
      expandida: false
    },
    { titulo: 'Portugal Campeón de la Nations League',
      resumen: 'Consagración por penales de Portugal en la UEFA Nations League',
      detalle: 'Portugal, se impuso a España en la tanda de penaltis de la final de Múnich por 5-4 tras empatar el partido a dos tantos, convirtiéndose en la primera selección que se impone en dos ediciones de la Nations League',
      imagen: 'assets/final.jpg',
      expandida: false
    }
  ];


  toggleNoticia(noticia: any){
    noticia.expandida = !noticia.expandida;
  }

  cantidadNoticias = 3;
  cargarMasNoticias(event: any){
    setTimeout(() => {
      
      if (this.cantidadNoticias + 3 <= this.noticias.length){
        this.cantidadNoticias += 3;
      } else {
        this.cantidadNoticias = this.noticias.length;
        event.target.disabled = true;
      }
    
      event.target.complete();
    }, 500);
  
  }

  cerrarSesion() {
    localStorage.removeItem('usuario'); // Borra la sesión del usuario
    window.location.href = '/login'; // Redirige a la pantalla de login
  }

  
  navegarA(pagina: string){
    this.router.navigate(['/' + pagina]);
  }

}

