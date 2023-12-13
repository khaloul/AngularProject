
import { Categories } from "../specialities/specialities"

export class Movie {
    _id:object
    titre:string
    prix:number
    couverture:any
    categorie:Categories;
    constructor() {
        this.categorie = new Categories();
      }



}
