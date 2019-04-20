import { Component, OnInit, Input } from '@angular/core';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { RefundPolicyModel } from 'src/app/models/competition/refundpolicy.model';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';

@Component({
  selector: 'registration-info',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registration: RegistrationModel;
  @Input() competitionId: string;
  isPaymentCash: boolean = false;
  isPaymentPaypal: boolean = false;
  isPaymentCC: boolean = false;

  constructor() { }

  ngOnInit() {
    this.registration.refundPolicy.sort((a: RefundPolicyModel, b: RefundPolicyModel) => {
      if (a.deadline > b.deadline) {
        return 1;
      } else if (a.deadline < b.deadline) {
        return -1;
      }
      return 0;
    })
    if (this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "cash") >= 0) {
      this.isPaymentCash = true;
    }
    if (this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "card") >= 0) {
      this.isPaymentCC = true;
    }
    if (this.registration.paymentMeans.findIndex((p: PaymentMeanModel) => p.id === "paypal") >= 0) {
      this.isPaymentPaypal = true;
    }
  }
}
