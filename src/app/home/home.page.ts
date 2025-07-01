import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FutbolService } from '../servicios/futbol.service';
import { FormsModule } from '@angular/forms';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario = '';
  equipos: any[] = [];
  segmentActivo = 'noticias';
  textoBusqueda = '';
  constructor(private animationCtrl: AnimationController, private router: Router,
     private changeDetectorRef: ChangeDetectorRef, private storage: Storage, private futbolService: FutbolService){}

  async cargarEquiposDesdeApi(){
    this.futbolService.getEquipos().subscribe(async data => {
      this.equipos = data?.teams || [];
      await this.storage.set('equiposGuardados', this.equipos);
    });
  }

  async cargarEquiposDesdeStorage(){
    const equiposBackup = await this.storage.get('equiposGuardados');
    this.equipos = equiposBackup || [];
  }
  
  async ngOnInit(){
    await this.cargarNombreUsuario();
    this.fadeInNoticias();
    this.cantidadNoticias = 7;
    this.futbolService.getEquipos().subscribe(data => {
      this.equipos = data?.teams || [];
      console.log('🧪 Equipo completo:', this.equipos[0]);
      //console.log('🎯 Escudos:', this.equipos.map(e => e.strTeam + ' ➤ ' + e.strTeamBadge));
    });
    Network.addListener('networkStatusChange', status => {
      console.log('📶 Estado de red:', status.connected ? 'Online' : 'Offline')
      if (!status.connected){
        this.cargarEquiposDesdeStorage();
      } else {
        this.cargarEquiposDesdeApi();
      }
    })
   
  
  }

  async ionViewWillEnter(){
    await this.cargarNombreUsuario();
  }

  equiposFiltrados(){
    return this.equipos.filter(equipo =>
      equipo.strTeam.toLowerCase().includes(this.textoBusqueda.toLocaleLowerCase())
    );
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


  async cargarNombreUsuario(){
    const nombreGuardado = await this.storage.get('usuario');
    this.nombreUsuario = nombreGuardado ? nombreGuardado : 'Invitado';
  }
  noticias = [
    { titulo: '⚽ PSG 4-0 vs Inter Miami ',
      resumen: 'Paris Saint-Germain vapuleó al inter miami de Lionel Messi y se instalo en los 4tos de final',
      detalle: 'Paris Saint-Germain no tuvo piedad y aplastó este domingo por 4-0 al Inter Miami de Lionel Messi en los octavos de final del Mundial de Clubes, en duelo disputado en Atlanta',
      imagen: 'assets/psg-int.jpg',
      expandida: false },
    { titulo: '🏆 Bayern Múnich a 4tos de final', 
      resumen: 'El Bayern Múnich sello su pase a los cuartos de final del Mundial de Clubes, tras imponerse con claridad a Flamengo',
      detalle: 'Bayern Múnich derrotó 2-4 al Flamengo con goles de Leon Goretzka, un doblete de Harry Kane y un autogol de Erick Pulgar, mientras que Gerson y Paulinho descontaron por los brasileños',
      imagen: 'assets/bay-fla.jpg',
      expandida: false },
    { titulo: 'Pogba ficha por el monaco',
      resumen: 'Paul Pogba vuelve a las canchas luego de la suspensión de 2 años por dopaje',
      detalle: 'Pogba ha firmado oficialmente un contrato de dos años con Mónaco, marcando su regreso emocional al fútbol después de casi dos años fuera de la competición. El jugador de 32 años fue suspendido tras una sanción por dopaje y tuvo su contrato con la Juventus rescindido durante este período. Pogba se emocionó al firmar por Mónaco, citando una profunda conexión emocional con la oferta del club y un nuevo comienzo en la Ligue 1.',
      imagen: 'assets/pogba.jpg',
      expandida: false
    },
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

  async cerrarSesion() {
    await this.storage.remove('usuarioAutenticado');
    await this.storage.remove('usuario');
    await this.storage.remove('equipo');
    await this.storage.remove('favoritos');
    await this.storage.remove('estadoUsuario');
    await this.storage.remove('imagenPerfil');
    
    this.router.navigate(['/login']);
  }

  
  navegarA(pagina: string){
    this.router.navigate(['/' + pagina]);
  }

}

