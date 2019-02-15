import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
/**
 *
 *
 * @export
 * @class ScheduleModel
 */
export class ScheduleModel {

    @autoserialize
    public id: number;

    @autoserialize
    public eventId: string;

    @autoserialize
    public roundId: string;

    @autoserialize
    public roundFormat: string;

    @autoserialize
    public advanceToNext: string;

    @autoserialize
    public cutoff: string;

    @autoserialize
    public timeLimit: string;

    @autoserialize
    public startTime: string;

    @autoserialize
    public endTime: string;

    @autoserialize
    public compDay: number;

    @autoserialize
    public dayIndex: number;

}