import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';

describe('HomePage', () => {
  let component: HomePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        IonicStorageModule.forRoot(),
        HttpClientModule // ✅ solución clave
      ]
    }).compileComponents();

    const storage = TestBed.inject(Storage);
    await storage.create();

    const fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
