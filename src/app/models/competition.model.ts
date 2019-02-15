import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { UserModel } from './user.model';
import { ScheduleModel } from './competition.schedule.model';
import { EventModel } from './competition.events.model';
/**
 *
 *
 * @export
 * @class CompetitionModel
 */
export class CompetitionModel {

    @autoserialize
    public id: string;

    @autoserialize
    public name: string;

    @autoserialize
    public isOfficial: boolean;

    @autoserialize
    public isHidden: boolean;

    @autoserialize
    public startDate: Date;

    @autoserialize
    public endDate: Date;

    @autoserialize
    public country: string;

    @autoserialize
    public city: string;

    @autoserialize
    public address: string;

    @autoserialize
    public addressURL?: string;

    @autoserialize
    public location: string;

    @autoserialize
    public locationURL?: string;

    @autoserialize
    public locationDetails?: string;

    @autoserialize
    public coordinates: string;

    @autoserialize
    public logoURL?: string;

    @autoserialize
    public competitorsLimit: number;

    @autoserialize
    public registrationFree: boolean;

    @autoserialize
    public registrationFee: number;

    @autoserialize
    public newcomersFee?: number;

    @autoserialize
    public newcomersDetails?: string;

    @autoserialize
    public canRegisterAtVenue: boolean;

    @autoserialize
    public registrationAtVenue?: number;

    @autoserialize
    public atTheVenueDetails?: string;

    @autoserialize
    public registrationOpen: Date;

    @autoserialize
    public registrationClose: Date;

    @autoserialize
    public maxGuestsNumber?: number;

    @autoserialize
    public guestsPay: boolean;

    @autoserialize
    public guestsFee?: number;

    @autoserialize
    public guestsFeeInfo?: string;

    @autoserialize
    public isLimitReached: boolean;

    @autoserialize
    public isRegistrationOpen: boolean;

    @autoserialize
    public contactName: string;

    @autoserialize
    public contactEmail: string;

    @autoserializeAs(UserModel)
    public delegates: UserModel[];

    @autoserializeAs(UserModel)
    public organizers: UserModel[];

    @autoserialize
    public extraInformation?: string;

    @autoserialize
    public paypalLink?: string;

    @autoserializeAs(EventModel)
    public events?: EventModel[];

    public getCompDate(): string {
        if ((this.startDate.getDate() === this.endDate.getDate()) && (this.startDate.getMonth() === this.endDate.getMonth()) && (this.startDate.getFullYear() === this.endDate.getFullYear())) {
            return this.startDate.toLocaleDateString("it-it", { day: "numeric", year: "numeric", month: "long" });
        } else {
            if (this.startDate.getMonth() < this.endDate.getMonth()) {
                return (this.startDate.toLocaleDateString("it-it", { day: "numeric", month: "long" })) + " - " + (this.endDate.toLocaleDateString("it-it", { day: "numeric", month: "long" })) + " " + (this.startDate.toLocaleDateString("it-it", { year: "numeric" }));
            } else {
                return (this.startDate.toLocaleDateString("it-it", { day: "numeric" })) + "-" + (this.endDate.toLocaleDateString("it-it", { day: "numeric", year: "numeric", month: "long" }));
            }
        }
    }
}


