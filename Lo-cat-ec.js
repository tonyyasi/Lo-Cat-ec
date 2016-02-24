ItemAlumno = new Mongo.Collection('itemsalumno');
ItemsAdmin = new Mongo.Collection('itemsadmin');
Matches = new Mongo.Collection('matches');

Router.configure({
  layoutTemplate: "ApplicationLayout"
});
Router.route('/admin', function(){
  this.render('admin', {
    to: "main"});
});

Router.route('/', function () {
  this.render('login', {
    to: "main"
  });
});
Router.route('/register', function(){
  this.render('tipos', {
    to: "main"
});
  this.render('register', {
    to: "main"
  });
});
Router.route('/Ropa', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('ropa', {
  to: "main"
});
});
Router.route('/DispEsc', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('dispEsc', {
  to: "main"
});
});
Router.route('/DispEl', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('dispEl', {
    to: "main"
});
});
Router.route('/Tipos', function(){
  this.render('tipos', {
    to: "main"
});
});
Router.route('/ARopa', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('Aropa', {
  to: "main"
});
});
Router.route('/AdispEsc', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('AdispEsc', {
  to: "main"
});
});
Router.route('/AdispEl', function(){
  this.render('tipos', {
    to: "aux"
});
  this.render('AdispEl', {
    to: "main"
});
});
Router.route('/tipos', function(){
  this.render('tipos', {
    to: "main"
});
});
Router.route('/ALista', function(){
  this.render('itemsRopa', {
    to: "main"
  });
});
/*Router.route('/home', function(){
  this.render('home', {
    to 'main'
  });
});*/
if (Meteor.isClient){
  //console.log("IS CLIENT");
  // counter starts at 0
  Session.setDefault('counter', 0);
  //login
  Template.itemsRopa.helpers({
    'Matches':function(){
      return Matches.find();
    }
  });
  Template.register.events({
    'submit':function(){
      console.log("YES");
      event.preventDefault();
      var emailVar  = event.target.email.value;
      var passwordVar = event.target.password.value;
      var userVar = event.target.username.value;
      Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        username: userVar
      });
      if(userVar == "admin")
      Router.go("/admin");
      else
      Router.go("/tipos");
    }
  });
  Template.itemsRopa.events({
      'click button': function(){
        //alert("swag");
        Matches.remove( { _id : this._id } );
        ItemAlumno.remove( { _id : this._id } );
        ItemsAdmin.remove( { _id : this._id});
        //alert("sweg");
    }
    });
  Template.login.events({
    'submit': function(){
      console.log("LOGIN");
      event.preventDefault();
      var emailVar  = event.target.username.value;
      var passwordVar = event.target.password.value;
      Meteor.loginWithPassword(emailVar, passwordVar, function(error){
        try{
          if(error.reason)
          alert(error.reason);
        }catch(err){
          if(emailVar == "admin")
          Router.go("/admin");
          else
          Router.go("/tipos")
        }
      });
    }
  });
  Template.ropa.events({
    'submit' : function(){
      event.preventDefault();
      var horaVar = event.target.hora.value;
      var ubicacionVar = event.target.ubicacion.value;
      var colorVar = event.target.colorz.value;
      var tallaVar = event.target.talla.value;
      var especialVar = event.target.caract.value;
      ItemAlumno.insert({
        hora: horaVar,
        ubicacion: ubicacionVar,
        articulo: "prenda",
        colors: colorVar,
        spec: tallaVar,
        especial: especialVar,
      });
      //alert("REQUEST PRENDA");
      event.target.hora.value="";
      event.target.ubicacion.value="";
      event.target.colorz.value="";
      event.target.talla.value="";
      event.target.caract.value="";
    ItemsAdmin.find({$or: [{$and:[
        {hora: horaVar},
        //{ubicacion: ubicacionVar},
        {articulo: "prenda"},
        //{colors: colorVar},
        //{tipo: tipoVar},
        //{especial: especialVar},
        ]},
        {$and:[
        //{hora: horaVar},
        {ubicacion: ubicacionVar},
        {articulo: "prenda"},
        {colors: colorVar},
        {spec: tallaVar},
        {especial: especialVar},
        ]}]}).forEach(function(doc){

            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
              Matches.insert(doc);
              Matches.update(doc._id, {$set: {arr: [Meteor.user().username,doc.numero]}})
            }
        });
   }
 });
  Template.dispEl.events({
    'submit' : function(){
      event.preventDefault();
      var horaVar = event.target.hora.value;
      var ubicacionVar = event.target.ubicacion.value;
      var tipoVar = event.target.tipo.value;
      var marcaVar = event.target.marca.value;
      var modeloVar = event.target.modelo.value;
      var colorVar = event.target.colorz.value;
      var especialVar = event.target.caract.value;
      ItemAlumno.insert({
        hora: horaVar,
        ubicacion: ubicacionVar,
        articulo: "electronico",
        tipo: tipoVar,
        espec: marcaVar,
        //modelo: modeloVar,
        colors: colorVar,
        especial: especialVar,
      });
      //alert("REQUET DISPEL");
      event.target.hora.value="";
      event.target.ubicacion.value="";
      event.target.tipo.value="";
      event.target.marca.value="";
      event.target.colorz.value="";
      event.target.caract.value="";

    ItemsAdmin.find({$or: [{$and:[
        {hora: horaVar},
        //{ubicacion: ubicacionVar},
        {articulo: "electronico"},
        //{colors: colorVar},
        //{tipo: tipoVar},
        //{especial: especialVar},
        ]},
        {$and:[
        //{hora: horaVar},
        {ubicacion: ubicacionVar},
        {articulo: "electronico"},
        {colors: colorVar},
        {spec: marcaVar},
        {especial: especialVar},
        ]}]}).forEach(function(doc){

            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
              Matches.insert(doc);
              Meteor.call('sendEmail', "Message from: adanvillarreal0@gmail.com" + "\rEmail: " + Meteor.user().email[0].address + "\rContent: Se encontraron articulos con la descripcion provista." );

              Matches.update(doc._id, {$set: {arr: [Meteor.user().username,doc.numero]}})
            }
        });
    }
     //return false;
  });
    Template.dispEsc.events({
    'submit' : function(){
      event.preventDefault();
      var horaVar = event.target.hora.value;
      var ubicacionVar = event.target.ubicacion.value;
      var colorVar = event.target.colorz.value;
      var tipoVar = event.target.tipo.value;
      var especialVar = event.target.caract.value;
      ItemAlumno.insert({
        hora: horaVar,
        ubicacion: ubicacionVar,
        articulo: "escolar",
        colors: colorVar,
        espec: tipoVar,
        especial: especialVar,
      });
      //alert("REQUEST DISPESC");
      event.target.hora.value="";
      event.target.ubicacion.value="";
      event.target.colorz.value="";
      event.target.tipo.value="";
      event.target.caract.value="";

      ItemsAdmin.find({$or: [{$and:[
          {hora: horaVar},
          //{ubicacion: ubicacionVar},
          {articulo: "escolar"},
          //{colors: colorVar},
          //{tipo: tipoVar},
          //{especial: especialVar},
          ]},
          {$and:[
          //{hora: horaVar},
          {ubicacion: ubicacionVar},
          {articulo: "escolar"},
          {colors: colorVar},
          {spec: tipoVar},
          {especial: especialVar},
          ]}]}).forEach(function(doc){

            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
              Matches.insert(doc);
              Matches.update(doc._id, {$set: {arr: [Meteor.user().username,doc.numero]}})
            }
        });
    }
     //return false;
  });
  Template.Aropa.events({
  'submit' : function(){
    event.preventDefault();
    var horaVar = event.target.hora.value;
    var ubicacionVar = event.target.ubicacion.value;
    var colorVar = event.target.colorz.value;
    var tallaVar = event.target.talla.value;
    var especialVar = event.target.caract.value;
    var numVar = event.target.num.value;
    ItemsAdmin.insert({
      hora: horaVar,
      ubicacion: ubicacionVar,
      articulo: "prenda",
      colors: colorVar,
      espec: tallaVar,
      especial: especialVar,
      numero: numVar,
      arr: ["si"]
    });
    //alert("AGREGADO PRENDA");
    event.target.hora.value="";
    event.target.ubicacion.value="";
    event.target.colorz.value="";
    event.target.talla.value="";
    event.target.caract.value="";
    event.target.num.value="";

    ItemAlumno.find({$or: [{$and:[
        {hora: horaVar},
        //{ubicacion: ubicacionVar},
        {articulo: "prenda"},
        //{colors: colorVar},
        //{tipo: tipoVar},
        //{especial: especialVar},
        ]},
        {$and:[
        //{hora: horaVar},
        {ubicacion: ubicacionVar},
        {articulo: "prenda"},
        {colors: colorVar},
        {spec: tallaVar},
        {especial: especialVar},
        ]}]}).forEach(function(doc){
            //alert("MATCH");
            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
              Matches.insert(doc);
              Matches.update(doc._id, {$set: {arr: [Meteor.user().username,doc.numero]}})
            }
        });

  }
   //return false;
});
Template.AdispEl.events({
  'submit' : function(){
    event.preventDefault();
    var horaVar = event.target.hora.value;
    var ubicacionVar = event.target.ubicacion.value;
    var tipoVar = event.target.tipo.value;
    var marcaVar = event.target.marca.value;
    var modeloVar = event.target.modelo.value;
    var colorVar = event.target.colorz.value;
    var especialVar = event.target.caract.value;
    var numVar = event.target.num.value;
    ItemsAdmin.insert({
      hora: horaVar,
      ubicacion: ubicacionVar,
      articulo: "electronico",
      tipo: tipoVar,
      espec: marcaVar,
      //modelo: modeloVar,
      colors: colorVar,
      especial: especialVar,
      numero: numVar,
      arr: ["si"]
    });
    //alert("AGREGADO DISPEL");
    event.target.hora.value="";
    event.target.ubicacion.value="";
    event.target.tipo.value="";
    event.target.marca.value="";
    event.target.colorz.value="";
    event.target.caract.value="";
    event.target.num.value="";

    ItemAlumno.find({$or: [{$and:[
        {hora: horaVar},
        //{ubicacion: ubicacionVar},
        {articulo: "electronico"},
        //{colors: colorVar},
        //{tipo: tipoVar},
        //{especial: especialVar},
        ]},
        {$and:[
        //{hora: horaVar},
        {ubicacion: ubicacionVar},
        {articulo: "electronico"},
        {colors: colorVar},
        {spec: marcaVar},
        {especial: especialVar},
        ]}]}).forEach(function(doc){

            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Matches.insert(doc);
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
              Matches.update(doc._id, {$set: {arr: [Meteor.user().username,doc.numero]}})
            }
        });
  }
   //return false;
});
Template.AdispEsc.events({
  'submit' : function(){
    event.preventDefault();
    var horaVar = event.target.hora.value;
    var ubicacionVar = event.target.ubicacion.value;
    var colorVar = event.target.colorz.value;
    var tipoVar = event.target.tipo.value;
    var especialVar = event.target.caract.value;
    var numVar = event.target.num.value;
    ItemsAdmin.insert({
      hora: horaVar,
      ubicacion: ubicacionVar,
      articulo: "escolar",
      colors: colorVar,
      espec: tipoVar,
      especial: especialVar,
      numero: numVar,
      arr: ["si"]
    });
    //alert("AGREGADO DISPESC");
    event.target.hora.value="";
    event.target.ubicacion.value="";
    event.target.colorz.value="";
    event.target.tipo.value="";
    event.target.caract.value="";
    event.target.num.value="";

    ItemAlumno.find({$or: [{$and:[
        {hora: horaVar},
        //{ubicacion: ubicacionVar},
        {articulo: "escolar"},
        //{colors: colorVar},
        //{tipo: tipoVar},
        //{especial: especialVar},
        ]},
        {$and:[
        //{hora: horaVar},
        {ubicacion: ubicacionVar},
        {articulo: "escolar"},
        {colors: colorVar},
        {spec: tipoVar},
        {especial: especialVar},
        ]}]}).forEach(function(doc){

            var bAhuevo=true;
            Matches.find().forEach(function(match){
              //console.log(match._id);
              //console.log(doc._id);
              if((match._id!=doc._id)&&(bAhuevo==true)){
                //console.log("entro");
                bAhuevo=true;
              }
              else {
                bAhuevo=false;
              }
            });
            if(bAhuevo==true){
              //console.log("Verguio");
              Matches.insert(doc);
              Matches.update(doc._id, {$set: {arr: [Meteor.user(),doc.numero]}})
              Meteor.call('sendEmail',
                          'tonyyasi@gmail.com',
                          'adanvillarreal0@gmail.com',
                          'Hello from Meteor!',
                          'This is a test of Email.send.');
            }
        });
  }
   //return false;
});
  Template.tipos.events({
    'click button': function(){
      var a = document.getElementById("objetos").value;
      if(Meteor.user().username == "admin")
        Router.go("/A"+a);
      else
        Router.go("/"+a);
    }
  });
  /*Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}*/
//***************************************ADMIN****************
}
if (Meteor.isServer) {


  Meteor.startup(function () {

});
}
