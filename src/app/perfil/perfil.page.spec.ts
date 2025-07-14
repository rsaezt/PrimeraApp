import { TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FutbolService } from '../servicios/futbol.service';
import { ToastController } from '@ionic/angular';

describe('PerfilPage', () => {
  let component: PerfilPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [
        PerfilPage,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: FutbolService, useValue: {} },
        { provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create']) }
      ]
    }).compileComponents();

    const storage = TestBed.inject(Storage);
    await storage.create();

    const toastSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    toastSpy.create.and.resolveTo({
      present: () => Promise.resolve() } as any);
   

    component = TestBed.inject(PerfilPage);
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería guardar el equipo favorito', async () => {
    const evento = { detail: { value: 'Barcelona' } };
    await component.guardarEquipo(evento);
    expect(component.equipoFavorito).toBe('Barcelona');
    expect(component.favoritos).toContain('Barcelona');
  });

  it('debería agregar y eliminar favoritos correctamente', async () => {
    const evento = { detail: { value: 'Barcelona' } };
    await component.guardarEquipo(evento);
    expect(component.favoritos.includes('Barcelona')).toBe(true);

    await component.eliminarEquipo('Barcelona');
    expect(component.favoritos.includes('Barcelona')).toBe(false);
  });
});