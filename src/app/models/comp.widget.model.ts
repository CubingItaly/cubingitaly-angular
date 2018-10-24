import { Deserialize, autoserializeAs, autoserialize } from "cerialize";


const DateDeserializer = {
    Deserialize(json: any): Date {
        let date: Date = Deserialize(json, Date);
        date.setHours(0, 0, 0, 0);
        return date;
    }
}

export class CompWidgetModel {
    @autoserialize
    public id: string;
    @autoserialize
    public name: string;
    @autoserialize
    public website: string;
    @autoserialize
    public short_name: string;
    @autoserializeAs(DateDeserializer)
    public start_date: Date;
    @autoserializeAs(DateDeserializer)
    public end_date: Date;
    @autoserialize
    public city: string;

}