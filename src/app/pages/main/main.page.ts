import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Nota } from 'src/app/models/Nota';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  
  public editMode : boolean = false;
  public isScrolling : boolean = false;
  public section: string;

  getNotas() : Nota[] {
    return this.dataSvc.notas;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private google : GooglePlus,
    private dataSvc : DataService) {

     }

  ngOnInit() {
    this.section = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onSearchChange(event){
    console.log(event);
  }
  
  loginGoogle() {
    this.google.login({})
    .then( data => {
      alert("THEN");
      alert(data);
      alert("THEN");
      console.log(data);
    })
    .catch( err => {
      alert("ERROR");
      alert(err);
      alert("ERROR");
      console.log(err)
    });
  }

  createNote(){
    this.dataSvc.addNote();
  }

  startEditMode(){
    console.log(this.isScrolling);
    if(!this.isScrolling){
      this.editMode = !this.editMode;
      console.log("edit mode is "+this.editMode)
    }
  }

}
