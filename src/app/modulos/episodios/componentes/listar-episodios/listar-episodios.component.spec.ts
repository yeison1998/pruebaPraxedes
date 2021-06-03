import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEpisodiosComponent } from './listar-episodios.component';

describe('ListarEpisodiosComponent', () => {
  let component: ListarEpisodiosComponent;
  let fixture: ComponentFixture<ListarEpisodiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEpisodiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEpisodiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
