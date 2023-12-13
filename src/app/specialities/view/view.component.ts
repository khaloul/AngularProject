import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../specialities';
import { CategoriesService } from '../specialities.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() cateID: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";


  cate = new Categories();

  constructor(

    private categ: CategoriesService) { }
  ngOnInit() {
    this.categ.find(this.cateID).subscribe(data => {
      this.cate = data;

    });
  }

  openModal() {
    this.display = "block";
  }
  closeModal() {
    this.display = "none";
    this.cate=new Categories()
  }

}
