import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    storageSpy = jasmine.createSpyObj('Storage', ['get']);
    guard = new AuthGuard(storageSpy, routerSpy);
  });

  it('debería permitir el acceso si el usuario está autenticado', async () => {
    storageSpy.get.and.resolveTo(true);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('debería redirigir si el usuario NO está autenticado', async () => {
    storageSpy.get.and.resolveTo(false);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
