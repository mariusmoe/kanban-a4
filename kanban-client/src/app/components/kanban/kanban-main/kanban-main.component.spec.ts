import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanMainComponent } from './kanban-main.component';

describe('KanbanMainComponent', () => {
  let component: KanbanMainComponent;
  let fixture: ComponentFixture<KanbanMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
