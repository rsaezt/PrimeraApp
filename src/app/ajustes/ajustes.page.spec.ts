import { TestBed } from '@angular/core/testing';
import { AjustesPage } from './ajustes.page';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

describe('AjustesPage', () => {
  let component: AjustesPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesPage, IonicStorageModule.forRoot()]
    }).compileComponents();

    const storage = TestBed.inject(Storage);
    await storage.create();

    const fixture = TestBed.createComponent(AjustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});