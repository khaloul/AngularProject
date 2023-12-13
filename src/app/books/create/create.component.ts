import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../book';
import { Categories } from 'src/app/specialities/specialities';
import { MovieServiceService } from '../book-service.service';
import { CategoriesService } from 'src/app/specialities/specialities.service';
import { PublisherService } from 'src/app/publisher/publisher.service';
import { Publisher } from 'src/app/publisher/publisher';
import { AuthorsService } from 'src/app/authors/authors.service';
import { Authors } from 'src/app/authors/authors';
import { FilePondComponent } from 'ngx-filepond';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  display = "none";
  Movie: Movie = new Movie()
  Categories!: Categories[];
  showForm = false;
  constructor(
    private Movieserv: MovieServiceService,
    private categserv: CategoriesService,) { }
  ngOnInit(): void {
    this.loadspec()
  }
  openModal() {
    this.display = "block";
    this.showForm = true;
  }
  closeModal() {
    this.display = "none";
    this.showForm = false;
    this.Movie = new Movie();
  }
  loadspec() {
    return this.categserv.getAll().subscribe(data =>
      this.Categories = data),
      (error: any) => console.log(error)
  }
  ajoutMovie = () => {

    this.Movieserv.create(this.Movie).subscribe((data => {
      console.log(data)
      this.closeModal()
      window.location.reload();
    }))
  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (
        fieldName: any,
        file: any,
        metadata: any,
        load: any,
        error: (error: any) => void, // Specify the type for the error parameter
        progress: any,
        abort: any
      ) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax');
        data.append('public_id', file.name);
  
        this.Movieserv.uploadSignature(data).subscribe({
          next: (res:any) => {
            this.Movie.couverture = res.url;
            load(res);
          },
          error: (e) => {
            console.log(e);
            error(e);
            return () => {
              abort();
            };
          },
          complete: () => {
            console.log('done');
            return () => {
              abort();
            };
          },
        });
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();
      },
    },
  };
  
}
