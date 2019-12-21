
import { Component, OnInit } from '@angular/core';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { SetupService } from 'src/app/services/setup-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PingService } from 'src/app/services/ping-service';
import { logWarnings } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-evaluator',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  private selectedDatabaseType: string = null;
  private databaseTypes: string[] = ['mysql', 'mssql'];
  private username = 'root';
  private password: string = null;
  private passwordRepeat: string = null;
  private validDatabaseConnectionString = false;
  private validJwtSecret = false;
  private appsettingsJson = '';

  constructor(
    private setupService: SetupService,
    private pingService: PingService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.setupService.getAppSettingsJson().subscribe(res => {
      this.appsettingsJson = res;
    });
  }
  
  databaseTypeChanged(e: MatSelectChange) {
    this.checkDatabaseConfiguration(this.selectedDatabaseType);
  }

  checkDatabaseConfiguration(databaseType: string) {
    this.setupService.checkDatabaseConfiguration(databaseType).subscribe(res => {
      this.validDatabaseConnectionString = true;
      this.pingService.ping().subscribe(res => {
        if (res.warnings.jwt !== undefined) {
          this.showError('You have to change your JWT secret');
        } else {
          this.validJwtSecret = true;
          this.showInfo('Choose a root password and click Setup');
        }
      });
    }, err => {
      this.validDatabaseConnectionString = false;
      this.showError('Provide a valid connection string, and save your appsettings.json file');
    });
  }

  setupAuthentication() {
    if (this.password !== this.passwordRepeat) {
      this.showError('Passwords are not matching');
      return;
    }
    if (this.password == null || this.password.length === 0) {
      this.showError('You must supply a root password');
      return;
    }

    this.setupService.setupAuthentication(this.selectedDatabaseType, this.username, this.password).subscribe(res => {
      if (res.ticket) {
        localStorage.setItem('access_token', res.ticket);
        this.showInfo('New root user was created, and you are already logged in as it.');
      } else {
        localStorage.removeItem('access_token');
        this.showInfo('The root user already exists, hence you were logged out of system.');
      }
      environment.defaultAuth = false;
      this.router.navigate(['']);
    }, error => {
      this.showError(error.error.message);
    });
  }

  getCodeMirrorOptions() {
    return {
      lineNumbers: true,
      theme: 'material',
      mode: 'application/ld+json',
    };
  }

  saveConfigurationFile() {
    this.setupService.saveAppSettingsJson(this.appsettingsJson).subscribe(res => {
      setTimeout(() => {
        this.checkDatabaseConfiguration(this.selectedDatabaseType);
      }, 1000);
    });
  }

  showError(error: string) {
    this.snackBar.open(error, 'Close', {
      duration: 10000,
      panelClass: ['error-snackbar'],
    });
  }

  showInfo(error: string) {
    this.snackBar.open(error, 'Close', {
      duration: 10000,
      panelClass: ['info-snackbar'],
    });
  }
}
