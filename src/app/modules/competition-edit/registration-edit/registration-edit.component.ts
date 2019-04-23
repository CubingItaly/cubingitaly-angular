import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { CompetitionModel } from 'src/app/models/competition.model';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { RefundPolicyModel } from 'src/app/models/competition/refundpolicy.model';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { isNumber } from 'util';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';
import { CompetitionEditService } from '../services/competition-edit.service';
import { Deserialize, Serialize } from 'cerialize';

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
  card: boolean = false;
  cash: boolean = false;
  paypal: boolean = false;
  paymentMeans: PaymentMeanModel[];
  selectedPaymenMeans: PaymentMeanModel[];
  refund: RefundPolicyModel[];
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.setupFormGroup();
    this.refund = [...this.registration.refundPolicy];
    this.sortPolicies(this.refund);
    this.compSVC.getPaymentMeans().subscribe((res: PaymentMeanModel[]) => this.paymentMeans = res);
  }

  setupFormGroup() {
    this.registrationForm = new FormGroup({
      competitorsLimit: new FormControl(this.registration.competitorsLimit, [Validators.required, Validators.min(2)]),
      registrationOpen: new FormControl(this.registration.registrationOpen, Validators.required),
      registrationClose: new FormControl(this.registration.registrationClose, Validators.required),
      isRegistrationPaid: new FormControl(this.registration.isRegistrationPaid),
      registrationFee: new FormControl(this.registration.registrationFee),
      newcomerDiscount: new FormControl(this.registration.newcomerDiscount),
      newcomerFee: new FormControl(this.registration.newcomerFee),
      newcomerDetails: new FormControl(this.registration.newcomerDetails),
      registrationAtTheVenue: new FormControl(this.registration.registrationAtTheVenue),
      atTheVenueFee: new FormControl(this.registration.atTheVenueFee),
      atTheVenueDetails: new FormControl(this.registration.atTheVenueDetails),
      maxNumberOfGuests: new FormControl(this.registration.maxNumberOfGuests),
      guestsNeedToRegister: new FormControl(this.registration.guestsNeedToRegister),
      guestsPay: new FormControl(this.registration.guestsPay),
      guestsFee: new FormControl(this.registration.guestsFee),
      guestsDetails: new FormControl(this.registration.guestsDetails),
      isThereWaitingList: new FormControl(this.registration.isThereWaitingList),
      paypal: new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "paypal") >= 0)),
      cash: new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "cash") >= 0)),
      card: new FormControl((this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "card") >= 0)),
      paypalLink: new FormControl(this.registration.paypalLink),
      refundAvailable: new FormControl(this.registration.refundAvailable),
      newRefundPolicy: new FormGroup({
        percentage: new FormControl(),
        deadline: new FormControl()
      })
    }, {
        validators: [
          this.atLeastOnePaymentMethod(), this.paypalMeRequired(), this.registrationFeeValidator(),
          this.atTheVenueFeeValidator(), this.guestsFeeValidator(), this.newcomerFeeValidator()
        ]
      });

  }


  atLeastOnePaymentMethod(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const registrationPaid = control.get('isRegistrationPaid').value;
      const paypal = control.get('paypal').value;
      const card = control.get('card').value;
      const cash = control.get('cash').value;
      if (registrationPaid && (card || paypal || cash)) {
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

    const registrationPaid = this.registrationForm.get('isRegistrationPaid').value;
    const refund = this.registrationForm.get('refundAvailable').value;
    const paypal = this.registrationForm.get('paypal').value;
    const card = this.registrationForm.get('card').value;

    if (registrationPaid) {
      if (refund && (paypal || card)) {
        if (this.refund.length === 0) {
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
    this.selectedPaymenMeans = [];
    for (let p of this.paymentMeans) {
      let checkbox = this.registrationForm.get(p.id).value;
      if (checkbox) {
        this.selectedPaymenMeans.push(p);
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
      this.refund.push(tempPolicy);
      this.refund = this.sortPolicies(this.refund);
      this.refund = [...this.refund];
      deadline.setValue("");
      percentage.setValue("");
      deadline.reset();
      percentage.reset();
    } else {
      throw new BadRequestError("È necessario inserire sia una percentuale di rimborso che una data di scadenza");
    }
  }

  removePolicy(percentage: number, deadline: Date) {
    this.refund = this.refund.filter((p: RefundPolicyModel) => p.percentage !== percentage && p.deadline !== deadline);
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
      let updatedRegistration: RegistrationModel = Deserialize(Serialize(this.registration), RegistrationModel);
      updatedRegistration.competitorsLimit = this.registrationForm.get('competitorsLimit').value;
      updatedRegistration.registrationOpen = this.registrationForm.get('registrationOpen').value;
      updatedRegistration.registrationClose = this.registrationForm.get('registrationClose').value;
      updatedRegistration.isRegistrationPaid = this.registrationForm.get('isRegistrationPaid').value;
      updatedRegistration.registrationFee = this.registrationForm.get('registrationFee').value;
      updatedRegistration.newcomerDiscount = this.registrationForm.get('newcomerDiscount').value;
      updatedRegistration.newcomerFee = this.registrationForm.get('newcomerFee').value;
      updatedRegistration.newcomerDetails = this.registrationForm.get('newcomerDetails').value;
      updatedRegistration.registrationAtTheVenue = this.registrationForm.get('registrationAtTheVenue').value;
      updatedRegistration.atTheVenueFee = this.registrationForm.get('atTheVenueFee').value;
      updatedRegistration.atTheVenueDetails = this.registrationForm.get('atTheVenueDetails').value;
      updatedRegistration.maxNumberOfGuests = this.registrationForm.get('maxNumberOfGuests').value;
      updatedRegistration.guestsNeedToRegister = this.registrationForm.get('guestsNeedToRegister').value;
      updatedRegistration.guestsPay = this.registrationForm.get('guestsPay').value;
      updatedRegistration.guestsFee = this.registrationForm.get('guestsFee').value;
      updatedRegistration.guestsDetails = this.registrationForm.get('guestsDetails').value;
      updatedRegistration.paypalLink = this.registrationForm.get('paypalLink').value;
      updatedRegistration.refundAvailable = this.registrationForm.get('refundAvailable').value;
      updatedRegistration.isThereWaitingList = this.registrationForm.get('isThereWaitingList').value;
      updatedRegistration.refundPolicy = this.refund;
      updatedRegistration.paymentMeans = this.selectedPaymenMeans;

      this.compSVC.updateRegistration(this.competition.id, updatedRegistration).subscribe((res: RegistrationModel) => {
        this.registration = res;
        this.registrationChange.emit(res);
        this.actionAfterUpdate();
      })
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