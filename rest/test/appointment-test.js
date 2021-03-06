let appointment = require('../src/api/appointment');
let appointmentService = require('../src/services/appointment-service');

//appointmentService.findBookedSlots('b-test-60', 'b-test-60-s-8cd1bf11').then((result) => { console.log(result);});


/* 

Input params: businessId, string(month/week/day),Date object

output: {
  slots: {
    businessid :eee
    staffs : [
        {
         staff: id
         staff Name: sdsds
         appointments: [
            appointmnet:id
            appointment service:cavity
            appointment date:
            customer: {
              name:
              email,
              phone
            }

         ] 
        }
    ]
  }

}

 */
//appointmentService.findBusinessBookedSlots('b-test-01', 'day', 1516107407118).then((result) => { console.log(result);});


let reqBody = {
  "user": {
    "UserEmail": "srinek@gmail.com",
    "name": "Nandakishore Nekkanti",
    "phone": "17323182848"
  },
  "appt": {
    "staffId": "b-test-01-s-01",
    "userEmail": "srinek@gmail.com",
    "busId": "b-test-01",
    "location": "110 Main Street, Edison, NJ 08817",
    "time": "2018-02-12T20:30:00.000Z",
    "notes": "NONE",
    "service": "Dental Cleaning"/*,
    "AppointmentId": "b-test-01-s-02-1518276600000-cba9fbd9"*/
  }
};

let updateObj = {
  "queryStringParameters": {
    "saveuser": true
  },
  "body": JSON.stringify(reqBody)
};
/*  appointment.save(updateObj , null, (error, response) => {
   console.log('-----------------------------SAVE RESPONSE START-----------------------------');
   console.log(response);
   console.log('-----------------------------SAVE RESPONSE END-----------------------------');
 }); */



let creatReqBody = {
  "user": {
    "UserEmail": "srinek@gmail.com",
    "name": "Nandakishore Nekkanti",
    "phone": "17323182848"
  },
  "appt": {
    "staffId": "b-test-01-s-01",
    "busId": "b-test-01",
    "time": "1517747168193",
  }
};

let createObj = {
  "queryStringParameters": {
    "saveuser": true
  },
  "body": JSON.stringify(creatReqBody)
};

/* appointment.createNew(createObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
}); */

let testGetObj = { "pathParameters" : 
  {
      "sId" : "b-test-01-s-01-1517931000000",
  }
};
/* appointment.getSlotDetails(testGetObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
}); */

/* appointmentService.findAvailableSlots('b-test-01', 'b-test-01-s-01').then((result) => {
  console.log("all slots", result);
}); */


/*appointment.getAllAppointments(
   {
     "queryStringParameters": { "d": "" },
     "pathParameters": { "busId": "b-test-60", "staffId": "b-test-60-s-8cd1bf11" }
     }, 
    null, 
    (error, response) => {
     console.log('-----------------------------SAVE RESPONSE START-----------------------------');
     console.log(response);
     console.log('-----------------------------SAVE RESPONSE END-----------------------------');
   }
 );*/

var _date = new Date();
_date.setMonth(01); // Feb
_date.setDate(12);

let testbookedAppointmentObj = { "pathParameters" : 
{
    "busId" : "b-test-01",
},
"queryStringParameters" : 
{
    // "staffid": ,
    "appointmentdate":_date.getTime(),
    "viewtype":"week"
}
};

/*  appointment.getBusinessBookedAppointments(testbookedAppointmentObj  , 
  null, 
    (error, response) => {
      console.log('-----------------------------GET getBusinessBookedAppointments RESPONSE START-----------------------------');
      console.log(response);
      console.log('-----------------------------GET RESPONSE END-----------------------------');
    }
);  */


let cancelReq = {
  "pathParameters" : 
  {
      "sId" : "b-test-01-s-01-1516721400000"
  }
}

/* appointment.cancel(cancelReq, 
  null, 
  (error, response) => {

    console.log('-----------------------------GET cancelAppointments RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
}); */

let appointmentByIdReq = {
  "pathParameters" : 
  {
      "sId" : "b-test-70-s-f6de196a-1531409400000-97302aca"
  }
}
appointment.getAllAppointmentsByAppointmentId(appointmentByIdReq, null, (error, response) => {

  console.log('-----------------------------GET getAllAppointmentsByAppointmentId RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------GET RESPONSE END-----------------------------');
});

let appointmentByUserReq = {
  "queryStringParameters" : 
  {
      "accessToken" : "eyJraWQiOiJsQ1BTMHN3dVJSa1pUZXRCU2h5WHRxMGkzVG9tajZpMVlBTjBWZnU4VDk0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3N2M2MmFmNy1lNDBhLTQwMjMtYThiYi1mODQ2OWNjOWIzYmYiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xXzcxMzFhNGM5LWZiNjAtNDgzYi1iM2FmLWRkM2MzNGM5MTE1NCIsImV2ZW50X2lkIjoiOTdjMzMzYmQtNGE4OC0xMWU4LWE5NGUtMmZlNDliNGE1ZmEzIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTUyNDg4MTExNSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSDJKYVJBZGhWIiwiZXhwIjoxNTI0ODg0NzE1LCJpYXQiOjE1MjQ4ODExMTUsImp0aSI6ImQwMjlhMzQwLWI5OTktNGRmZC1iOTZjLTZhMThmYTJjMzYyYiIsImNsaWVudF9pZCI6InRhNDAydGx0ZmswZzN2c2ZjaXI0bTJnMzUiLCJ1c2VybmFtZSI6Ijc3YzYyYWY3LWU0MGEtNDAyMy1hOGJiLWY4NDY5Y2M5YjNiZiJ9.T5qI4gR1IVj5lnRrJPgsDe8aX0_udD4_ZribwfVa21-DR3RjNSXHPBwMN5PKm4s5WkgRy89nz9wxZpQzJXnfjt0E2v71ERtlKuldj67Iavt2jKkJJkCWlwZLVK97GUcgaLzDGRtpV013sqyMaUT9rG45CCASXNWqE1f68sC6sPi0Skt-FfGYfBBQesTWH5fn70IpBjDSFukiuXeVCij7u4UgH3jrUVKWW1SKWQR1DkB3r1k8-Labj97SYOzEFhLhMIX6VLRooCQAOe2iQZ9O_I88JdCJxv6Y6fc4CWW3TcnuIAfYGZJWjCnZx79rJtjM0cdAvjAkE62J4GwKKM9cYQ"
  }
}
/*appointment.getAllAppointmentsOfUser(appointmentByUserReq, null, (error, response) => {

  console.log('-----------------------------GET getAllAppointmentsByUser RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------GET RESPONSE END-----------------------------');
});*/