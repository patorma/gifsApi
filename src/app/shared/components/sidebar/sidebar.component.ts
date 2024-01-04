import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
//tarea inyectar el servicio aqui
//servicio private
public gifs: string[] =[]

constructor(private gifsService: GifsService){}

get tags(): string []{
  return this.gifsService.tagsHistory
}
searchTag(tag: string): void{
  this.gifsService.searchTag(tag)
}
}
