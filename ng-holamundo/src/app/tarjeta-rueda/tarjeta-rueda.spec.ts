import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaRueda } from './tarjeta-rueda';

describe('TarjetaRueda', () => {
  let component: TarjetaRueda;
  let fixture: ComponentFixture<TarjetaRueda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaRueda],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaRueda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
