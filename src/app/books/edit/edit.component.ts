import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FilePondComponent } from 'ngx-filepond';
import { Movie } from '../book';
import { Categories } from 'src/app/specialities/specialities';
import { Publisher } from 'src/app/publisher/publisher';
import { Authors } from 'src/app/authors/authors';
import { CategoriesService } from 'src/app/specialities/specialities.service';
import { PublisherService } from 'src/app/publisher/publisher.service';
import { MovieServiceService } from '../book-service.service';
import { AuthorsService } from 'src/app/authors/authors.service';
import { FilePondOptions } from 'filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() MovieID: object;
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  display = "none";
  Movie: Movie = new Movie()
  Categories!: Categories[];
  showForm = false;
  constructor(
    private Movieserv: MovieServiceService,
    private categerv: CategoriesService,) { }
  ngOnInit(): void {
    this.loadcateg()
    this.Movieserv.find(this.MovieID).subscribe(data => {
      this.Movie = data;
      this.updatePondFiles();
    });

  }
  pondFiles: FilePondOptions["files"]
  updatePondFiles() {
    this.pondFiles = [
      {
        source: this.Movie.couverture,
        options: {
          type: 'local'
        },
      },
    ];


  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      load: (source: any, load: any, error: any, progress: any, abort: any,
        headers: any) => {

        if (typeof source === 'string' && source !== '') {
          var myRequest = new Request(source);
          fetch(myRequest).then(function (response) {
            response.blob().then(function (myBlob) {
              load(myBlob);
            });
          });
        }
        else {
          error('Invalid URL');
        }
      },
      process: (fieldName: any, file: any, metadata: any, load: any, error: any,
        progress: any, abort: any) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax')
        data.append('public_id', file.name)
        this.Movieserv
          .uploadSignature(data)
          .subscribe({
            next: (res) => {
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
            }
          })
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();

      },
    }
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
  loadcateg() {
    return this.categerv.getAll().subscribe(data =>
      this.Categories = data),
      (error: any) => console.log(error)
  }
  updateMovie = () => {

    this.Movieserv.update(this.Movie._id,this.Movie).subscribe((data => {
      console.log(data)
      this.closeModal()
      window.location.reload();
    }))
  }
  
  

}
