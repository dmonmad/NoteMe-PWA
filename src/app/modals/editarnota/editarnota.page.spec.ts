import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarnotaPage } from './editarnota.page';

describe('EditarnotaPage', () => {
  let component: EditarnotaPage;
  let fixture: ComponentFixture<EditarnotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarnotaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarnotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
