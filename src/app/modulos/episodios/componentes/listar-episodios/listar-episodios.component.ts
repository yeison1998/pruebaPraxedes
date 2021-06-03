import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Episodio } from 'src/app/modelos/episodio';
import { EpisodiosService } from 'src/app/servicios/episodios.service';


@Component({
  selector: 'app-listar-episodios',
  templateUrl: './listar-episodios.component.html',
  styleUrls: ['./listar-episodios.component.css']
})
export class ListarEpisodiosComponent implements OnInit, AfterViewInit {

  totalDatos: number;
  totalPorPag: number;
  registrosPorPagina: number = 20;
  displayedColumns: string[] = ['name', 'air_date', 'episode', 'created'];
  dataSource = new MatTableDataSource<Episodio>([]);

  pageEvent: PageEvent;
  
  constructor(
    private espisodiosService: EpisodiosService
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.cargarEpisodios();
  }

  cargarEpisodios() {
    this.espisodiosService.listarEpisodios().subscribe(resultado => {
      this.dataSource.data = resultado.results;
      this.totalDatos = resultado.info.count;
      this.totalPorPag = resultado.results.length;

    });
  }
}