import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Nota } from 'src/app/models/Nota';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public editMode: boolean = false;
  public isScrolling: boolean = false;
  public section: string;

  getNotas(): Nota[] {
    return this.dataSvc.notas;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private dataSvc: DataService,
    private router: Router,
    private uiSvc : UiService) {

  }

  ngOnInit() {
    this.section = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onSearchChange(event) {
    console.log(event);
  }

  onLoginGoogle() {
    this.authSvc.loginGoogle()
      .then(()=>{
        console.log("Google logged");
      })
      .catch( err => {
        this.uiSvc.presentToast("Hubo un error al intentar enlazar a su cuenta de Google. Pruebe otra vez.", 2000, "danger");
      })
  }

  onLogout() {
    this.authSvc.logOut()
      .then(() => {

        console.log("Google signed out");
      })
  }

  createNote() {
    this.dataSvc.addNote();
  }

  startEditMode() {
    console.log(this.isScrolling);
    if (!this.isScrolling) {
      this.editMode = !this.editMode;
      console.log("edit mode is " + this.editMode)
    }
  }

}
