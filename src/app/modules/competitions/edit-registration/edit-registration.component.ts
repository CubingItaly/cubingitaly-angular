import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CompetitionService } from '../services/competition.service';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { isNumber } from 'util';
import { CompetitionModel } from 'src/app/models/competition.model';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';

@Component({
  selector: 'edit-registration-info',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {

  @Input() competition: CompetitionModel;
  registration: RegistrationModel;
  registrationForm: FormGroup;
  paymentMeans: PaymentMeanModel[];
  paymentTypes: { id: string; name: string; isSelected: boolean }[] = [];

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
    this.compSVC.getRegistration(this.competition.id).subscribe((res: RegistrationModel) => {
      this.registration = res;
      this.compSVC.getPaymentMeans().subscribe((res: PaymentMeanModel[]) => {
        this.paymentMeans = res;
        this.setupPayments();
      });

      this.registrationForm = new FormGroup({
        'competitorsLimit': new FormControl('', [Validators.min(20)]),
        'registrationOpen': new FormControl(''),
        'registrationClose': new FormControl(''),
        'isRegistrationPaid': new FormControl(''),
        'registrationFee': new FormControl(''),
        'newcomerDiscount': new FormControl(''),
        'newcomerFee': new FormControl(''),
        'registrationAtTheVenue': new FormControl(''),
        'atTheVenueFee': new FormControl(''),
        'guestsPay': new FormControl(''),
        'guestsFee': new FormControl(''),
        'maxNumberOfGuests': new FormControl(''),
        'refundAvailable': new FormControl('')
      },
        { validators: [this.registrationFeeValidator(), this.newcomerFeeValidator(), this.atTheVenueFeeValidator(), this.guestsFeeValidator()] })
    });
  }

  setupPayments() {
    for (let p of this.paymentMeans) {
      if (this.registration.paymentMeans.findIndex((t: PaymentMeanModel) => t.id === p.id)) {
        this.paymentTypes.push({ id: p.id, name: p.name, isSelected: true });
      } else {
        this.paymentTypes.push({ id: p.id, name: p.name, isSelected: false });
      }
    }
  }

  registrationFeeValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const checkbox = control.get('isRegistrationPaid');
      const fee = control.get('registrationFee');
      if (checkbox.value) {
        if (isNumber(fee.value) && fee.value > 0) {
          return null;
        } else {
          return { 'invalidFee': true };
        }
      } else {
        return null;
      }
    }
  }

  atTheVenueFeeValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const checkbox = control.get('registrationAtTheVenue');
      const fee = control.get('atTheVenueFee');
      if (checkbox.value) {
        if (isNumber(fee.value) && fee.value > 0) {
          return null;
        } else {
          return { 'invalidFee': true };
        }
      } else {
        return null;
      }
    }
  }

  guestsFeeValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const checkbox = control.get('guestsPay');
      const fee = control.get('guestsFee');
      if (checkbox.value) {
        if (isNumber(fee.value) && fee.value > 0) {
          return null;
        } else {
          return { 'invalidFee': true };
        }
      } else {
        return null;
      }
    }
  }

  newcomerFeeValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const checkbox = control.get('isRegistrationPaid');
      const newcomer = control.get('newcomerDiscount');
      const fee = control.get('newcomerFee');
      if (checkbox.value && newcomer.value) {
        if (isNumber(fee.value) && fee.value > 0) {
          return null;
        } else {
          return { 'invalidFee': true };
        }
      } else {
        return null;
      }
    }
  }

  updateRegistration() {
    if (this.registrationForm.valid) {
      this.compSVC.updateRegistration(this.competition.id, this.registration).subscribe((res: RegistrationModel) => this.registration = res);
    } else {
    }
  }

}


