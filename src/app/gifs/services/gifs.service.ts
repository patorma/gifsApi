import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory:string[] = [];

  constructor() { }


  get tagsHistory(){
    return  [...this._tagsHistory];
  }

  searchTag(tag: string):void{
    //unshift pone el elemento al incio del array
    this._tagsHistory.unshift(tag);
    console.log(this.tagsHistory)
  }
}
