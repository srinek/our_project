import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacadeService} from '../service/facade.service';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../model/category.model';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public categories:Array<Category> = [];
  public categoryValues : Array<string> = [];
  isMainPage : boolean = true;
  showNav : boolean = false;
  showProfile : boolean = false;
  loggedIn : boolean = false;
  imageRoot : string = environment.imageRoot;
  categorySelected : string = "";

  private mainPageUnloadedSubscription : Subscription;
  private loginSubscription : Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService, 
    private authenticationService : AuthenticationService) {

   }

  ngOnInit() {
      this.mainPageUnloadedSubscription = this.facadeService.mainPageUnLoaded.subscribe(
         (mainPageUnloaded : boolean) => {
           this.isMainPage = !mainPageUnloaded;
           if(!this.isMainPage){
              this.categories = this.facadeService.getAllCategories();
              this.categories && this.categories.forEach( (category : Category) => {
                 this.categoryValues.push(category.getCategoryName());
                 this.categorySelected = this.categoryValues[0];
              });
           }
         }
      );

      this.loginSubscription = this.facadeService.loginSubject.subscribe(
        (loginSucess : boolean) => {
          if(loginSucess){
            this.loggedIn = true;
          }
          else{
            this.loggedIn = false;
          }
        },
        (error : Error) => {
          this.loggedIn = false;
        }
      ); 

      this.authenticationService.isAuthenticated().subscribe(
        (result : boolean) => {
          if(result){
            this.loggedIn = true;
          }
          else{
            this.loggedIn = false;
          }
        },
        (error : Error) => {
          this.loggedIn = false;
        }
      );
      
  }

  ngOnDestroy(){
    console.log("header component destroyed");
    this.mainPageUnloadedSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  toggleNav(){
    this.showNav = !this.showNav;
  }

  toggleProifle(){
    this.showProfile = !this.showProfile;
  }

  onSearch(searchVal) : void{
    console.log("searchVal", searchVal);
    this.router.navigate(['/search'],{relativeTo:this.route, queryParams : {'look_for' : searchVal}});
  }

  logout() : void {
    this.authenticationService.logout();
    this.facadeService.triggerLoginSubject(false);
    this.router.navigate([''],{relativeTo:this.route, queryParams : {'signout' : true}});
  }
}
