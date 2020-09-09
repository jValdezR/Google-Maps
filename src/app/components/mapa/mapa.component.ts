import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: [
    './mapa.component.css'
  ]
})
export class MapaComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  marcadores: Marcador[] = [];

  constructor(public _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.cargarStorage();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  agregarMarcador(event) {
    console.log({ evento: event.coords.lat });
    const coords: { lat: number, lng: number } = event.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();
    //this._snackBar.open('Marcador agregado', 'Cerrar');
  }

  // tslint:disable-next-line: typedef
  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  cargarStorage() {
    JSON.parse(localStorage.getItem('marcadores'));
  }
  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    //this._snackBar.open('Marcador borrado', 'Cerrar');
  }
  editarMarcador(mark: Marcador) {

    const dialogRef = this.dialog.open(MapaEditarComponent, {
      data: {
        titulo: mark.titutlo,
        desc: mark.desc
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("close");

      if( !result){return;}
      mark.titutlo = result.titulo;
      mark.desc = result.desc;
      this.guardarStorage();
      //this._snackBar.open('Marcador actualizado', 'Cerrar');
    })
  }


}
