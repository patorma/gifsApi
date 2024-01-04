import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] =[];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'azZ4xIkbziFsRqrnRTzXQJU1m5Ay9ZE4'
  private serviceUrl:   string ='https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    //cuando el constructor es inyectado la primera vez
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }


  get tagsHistory(){
    return  [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
      tag =tag.toLowerCase()

      if(this._tagsHistory.includes(tag) ){
        this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag)
      }
      this._tagsHistory.unshift(tag)
      this._tagsHistory = this._tagsHistory.splice(0,10); // se va a cortar del 0 al 10
      this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
     localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if( !localStorage.getItem('history')) return;
    //este es el caso contrario vuelvo a transformarlo en objeto
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //devuelve algo
    if(this._tagsHistory.length === 0) return;

    //pero si viene más de uno
    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag: string):void{
    if(tag.length === 0 ) return; // no hace
    //unshift pone el elemento al incio del array
    this.organizeHistory(tag);

    const params = new HttpParams()
        .set('api_key',this.apiKey)
        .set('limit','10')
        .set('q',tag)



    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp =>{
      // fixed_height alto fijo
     this.gifList = resp.data;
    //  console.log({gifs: this.gifList})
    })
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=azZ4xIkbziFsRqrnRTzXQJU1m5Ay9ZE4&q=valorant&limit=10')
    // .then(resp => resp.json() )
    // .then( data => console.log(data) )
    // console.log(this.tagsHistory)
  }
}
