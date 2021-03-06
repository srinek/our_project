import {Staff} from './staff.model';
import {AppointmentSlot} from './appointment-slot.model';
import { Service } from './service.model';
import { weekdays } from 'moment';
import { Category } from './category.model';

export class Business{

    bus_id : string;
    bus_name : string;
    address : string;
    aptSuite : string;
    phone : number;
    email : string;
    website : string;
    images : string[]=[];
    defaultImage : string;
    rating : number[];
    staff? : Staff[] =[];
    defaultStaff : Staff;
    bus_time_zone? : string = "America/new_york";
    bus_hours? : Array<{day:number, endTime?:string, startTime?:string}> = [];
    holidays? : {dates?:Array<string>, weekdays?:Array<number>} = {dates:[], weekdays:[]};
    statement_caption? : string = "";
    statement_notes? : string = "";
    specialized_in? : string = "";
    awards? : string = "";
    appointment_instructions? : string[] = [];
    services? : Service[] = [];
    // services? : string[] = [];
    isOpenNow : boolean = false;
    openTime : Date;
    closeTime : Date;
    category? : Category;

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
    }

    public map(src) : void {
        this.bus_name = src.bus_name;
        this.address = src.address;
        this.bus_id = src.bus_id;
        if(src.staff){
           src.staff.forEach((staffObj) => {
              var staff = new Staff(staffObj);
              this.staff.push(staff);
           });
        }
        this.defaultStaff = this.staff[0];
        this.phone = src.phone;
        this.email = src.email;
        this.holidays = src.holidays;
        this.specialized_in = src.specialized_in;
        this.appointment_instructions = src.appointment_instructions;
        this.awards = src.awards;
        this.images = src.images;
        this.defaultImage = src.defaultImage;
        this.mapServices(src);
        this.bus_hours = src.bus_hours;
        this.bus_time_zone = src.bus_time_zone;
        this.openTime = src.startTime;
        this.closeTime = src.endTime;
        this.isOpenNow = src.open;
        this.website = src.website;
        this.email = src.email;
        this.category = src.category;
    }

    private mapServices(src) : void {
        if(src.services){
            src.services.forEach( (service) => {
                var serviceObj = new Service();
                serviceObj.name = service.name;
                serviceObj.cost = service.cost;
                this.services.push(serviceObj);
            });
        }
    }

    public findService(svcName : string){
        if(svcName){
            return this.services.find( (eachSvc) => {
                return eachSvc.name === svcName;
            });
        }
        return null;
    }

    public findStaff(staffId : string) : Staff{
        if(this.staff){
            return this.staff.find( (eachStaff) => {
                return eachStaff.staff_id === staffId;
            });
        }
        return null;
    }

    getBusinessJsonToSave(){
        this.json = null;
        this.openTime = null;
        this.closeTime = null;
        this.isOpenNow = null;
        return this;
    }
}