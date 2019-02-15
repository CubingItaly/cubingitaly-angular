import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
/**
 *
 *
 * @export
 * @class EventModel
 */
export class EventModel {

    @autoserialize
    public id: string;

    @autoserialize
    public name: string;

    @autoserialize
    public weight: number;

}