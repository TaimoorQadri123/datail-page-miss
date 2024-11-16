class employees{
    constructor(id,name,email,Phone,slot){
this.id = id;
this.name = name;
this.email=email;
this.Phone=Phone;
this.slot=slot;
    }
    Job(Developer){
    console.log(this.name+" is a "+this.skills+" and it's salary "+Developer+this.slot)
    }

 

}

class person extends employees{
    constructor(id,name,email,Phone,slot,skills,status){
        super(id,name,email,Phone,slot);
        this.skills=skills;
        this.status=status;
    }
}
let c = new person ("1527428","Taimoor","taimoor@gmail.com","31527428","junior","senior developer","onsite");
c.Job("senior")