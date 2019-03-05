import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { CompetitionModel } from 'src/app/models/competition.model';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { RefundPolicyModel } from 'src/app/models/competition/refundpolicy.model';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { isNumber } from 'util';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'edit-registration-info',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.css']
})
export class RegistrationEditComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Input() registration: RegistrationModel;
  @Output() registrationChange: EventEmitter<RegistrationModel> = new EventEmitter<RegistrationModel>();

  registrationForm: FormGroup;
  creditCard: boolean = false;
  cash: boolean = false;
  paypal: boolean = false;
  paymentMeans: PaymentMeanModel[];
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private compSVC: CompetitionEditService) { }

  ngOnInit() {
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
      'paypal': new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "paypal") >= 0)),
      'cash': new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "cash") >= 0)),
      'cc': new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "cc") >= 0)),
      'paypalLink': new FormControl(''),
      'refundAvailable': new FormControl(''),
      'newRefundPolicy': new FormGroup({
        'percentage': new FormControl(),
        'deadline': new FormControl()
      })
    },
      { validators: [this.registrationFeeValidator(), this.newcomerFeeValidator(), this.atTheVenueFeeValidator(), this.guestsFeeValidator(), this.atLeastOnePaymentMethod(), this.paypalMeRequired()] });
    this.sortPolicies(this.registration.refundPolicy);
    this.compSVC.getPaymentMeans().subscribe((res: PaymentMeanModel[]) => this.paymentMeans = res);
  }

  atLeastOnePaymentMethod(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const registrationPaid = control.get('isRegistrationPaid').value;
      const paypal = control.get('paypal').value;
      const creditCard = control.get('cc').value;
      const cash = control.get('cash').value;
      if (registrationPaid && (creditCard || paypal || cash)) {
        return null;
      } else if (!registrationPaid) {
        return null;
      }
      return { 'noPaymentMethod': true };
    }
  }

  paypalMeRequired(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const paypal = control.get('paypal').value;
      const paypalLink = control.get('paypalLink');
      if (paypal) {
        if (paypalLink.value) {
          return null;
        }
        return { 'missingPaypalLink': true }
      }
      return null;
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

  refundPolicyValidator(): boolean {

    const registrationPaid = this.registration.isRegistrationPaid;
    const refund = this.registration.refundAvailable;
    const paypal = this.registrationForm.get('paypal').value;
    const creditCard = this.registrationForm.get('cc').value;

    if (registrationPaid) {
      if (refund && (paypal || creditCard)) {
        if (this.registration.refundPolicy.length === 0) {
          return false;
        }
      }
    }
    return true;
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

  setPaymentMeans() {
    this.registration.paymentMeans = [];
    for (let p of this.paymentMeans) {
      let checkbox = this.registrationForm.get(p.id).value;
      if (checkbox) {
        this.registration.paymentMeans.push(p);
      }
    }
  }

  addPolicy() {
    const deadline = this.registrationForm.get('newRefundPolicy').get('deadline');
    const percentage = this.registrationForm.get('newRefundPolicy').get('percentage');
    if (deadline.value && percentage.value) {
      let tempPolicy = new RefundPolicyModel();
      tempPolicy.deadline = deadline.value;
      tempPolicy.percentage = percentage.value;
      this.registration.refundPolicy.push(tempPolicy);
      this.registration.refundPolicy = this.sortPolicies(this.registration.refundPolicy);
      this.registration.refundPolicy = [...this.registration.refundPolicy];
      deadline.setValue("");
      percentage.setValue("");
      deadline.reset();
      percentage.reset();
    } else {
      throw new BadRequestError("È necessario inserire sia una percentuale di rimborso che una data di scadenza");
    }
  }

  removePolicy(percentage: number, deadline: Date) {
    this.registration.refundPolicy = this.registration.refundPolicy.filter((p: RefundPolicyModel) => p.percentage !== percentage && p.deadline !== deadline);
  }


  sortPolicies(policies: RefundPolicyModel[]) {
    return policies.sort((a: RefundPolicyModel, b: RefundPolicyModel) => {
      if (a.percentage > b.percentage) {
        return 1
      } if (a.percentage < b.percentage) {
        return -1;
      }
      return 0;
    })
  }

  updateRegistration() {
    if (this.registrationForm.valid && this.refundPolicyValidator()) {
      this.setPaymentMeans();
      this.compSVC.updateRegistration(this.competition.id, this.registration).subscribe((res: RegistrationModel) => {
        this.registration = res;
        this.registrationChange.emit(this.registration);
        this.actionAfterUpdate()
      });
    } else {
      throw new BadRequestError("Per poter aggiornare la registrazione è necessario compilare tutti i campi richiesti");
    }
  }


  private actionAfterUpdate() {
    const pageTitle = document.querySelector('h1') as HTMLElement;
    pageTitle.scrollIntoView();
    this.updated.emit(true);
    setTimeout(() => {
      this.updated.emit(false);
    }, 7000);
  }
}