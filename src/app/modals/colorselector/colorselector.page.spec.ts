import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorselectorPage } from './colorselector.page';

describe('ColorselectorPage', () => {
  let component: ColorselectorPage;
  let fixture: ComponentFixture<ColorselectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorselectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorselectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
