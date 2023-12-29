import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  // va hacer la referencia directa del html
  // con ! le indicamos que siempre estara ese valor osea nunca sera nulo
  //@ViewChild() sirve para tomar un referencia local
  @ViewChild('txtTagInput')
  @Output()
 public tagInput!: ElementRef<HTMLInputElement>;


  constructor(private gifsService:GifsService){}

  searchTag( ){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = '';
  }
}
