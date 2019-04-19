import { Directive, TemplateRef, ViewContainerRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[ifRole]'
})
export class RoleDirective implements OnChanges {
  @Input("ifRole") role: string;
  @Input("ifRoleIfParam") extraParam: any;

  user$: Subscription;
  private user: UserModel;

  constructor(private auth: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.user$ = this.auth.user().pipe(
      tap(() => this.viewContainer.clear()))
      .subscribe((u: UserModel) => {
        this.user = u;
        this.managePermission();
      });

  }
  private managePermission() {
    let reverse: boolean = false;
    let actualRole: string = this.role;
    if (this.role.startsWith("!")) {
      reverse = true;
      actualRole = actualRole.substr(1);
    }
    let check: boolean = this.checkCondition(this.user, actualRole);
    check = reverse ? !check : check;
    if (check) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.extraParam && changes.extraParam.currentValue) {
      if (this.user) {
        this.managePermission();
      }
    }
  }

  checkCondition(u: UserModel, role: string): boolean {
    switch (role) {
      case "guest":
        return (u.id === undefined)
      case "user":
        return (u.id !== undefined);
      case "aUsers":
        return (u.id !== undefined) && u.canAdminUsers();
      case "aTeams":
        return (u.id !== undefined) && u.canAdminTeams();
      case "lTeam":
        return (u.id !== undefined) && u.isLeaderOf(this.extraParam);
      case "mTeam":
        return (u.id !== undefined) && u.canManageTeam(this.extraParam);
      case "mTeams":
        return (u.id !== undefined) && u.canManageTeams();
      case "aArticles":
        return (u.id !== undefined) && u.canAdminArticles();
      case "eArticles":
        return (u.id !== undefined) && u.canEditArticles();
      case "aTutorials":
        return (u.id !== undefined) && u.canAdminTutorials();
      case "cTutorials":
        return (u.id !== undefined) && u.canCreateTutorials();
      case "pTutorials":
        return (u.id !== undefined) && u.canPublishTutorials();
      case "ePages":
        return (u.id !== undefined) && u.canEditPages();
      case "aFaq":
        return (u.id !== undefined) && u.canAdminFAQs();
      case "eFaq":
        return (u.id !== undefined) && u.canEditFAQs();
      case "eComp":
        return (u.id !== undefined) && u.canEditCompetition(this.extraParam);
      case "aComp":
        return (u.id !== undefined) && u.canAdminCompetitions();
      case "cComp":
        return (u.id !== undefined) && u.canCreateCompetitions();
      case "annComp":
        return (u.id !== undefined) && u.canAnnounceCompetition(this.extraParam);
      case "delOrgComp":
        return (u.id !== undefined) && u.isDelOrgOf(this.extraParam);
      default:
        return false;
    }
  }

}
