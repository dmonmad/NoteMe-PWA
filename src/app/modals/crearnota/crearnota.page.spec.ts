import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearnotaPage } from './crearnota.page';

describe('CrearnotaPage', () => {
  let component: CrearnotaPage;
  let fixture: ComponentFixture<CrearnotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearnotaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearnotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
