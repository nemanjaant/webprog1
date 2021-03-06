window.onload = function () {

  /******* za sve strane *******/

  hederIspis();
  futerIspis();

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
  });


  /*Povratak na vrh strane*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll-to-top').fadeIn();
    } else {
      $('#scroll-to-top').fadeOut();
    }
  });

  $('#scroll-to-top').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 400);
  });

  /*****/


  var path = window.location.pathname;
  
  /* index pocetak */

  if (path.includes("webprog1")) {


    /* Ispis i obrada forme */

    kontaktFormaIspis();

    var ime = document.getElementById("name");
    var email = document.getElementById("email");
    var brojTelefona = document.getElementById("phoneNumber");
    var poruka = document.getElementById("message");

    ime.oninput = imeProvera;
    email.oninput = mejlProvera;
    brojTelefona.oninput = telefonProvera;
    poruka.oninput = () => {
      porukaProvera();
    }
    ime.onfocus = () => {
      spanNoteCheck(ime, 0);
    }
    email.onfocus = () => {
      spanNoteCheck(email, 1);
    }
    brojTelefona.onfocus = () => {
      spanNoteCheck(brojTelefona, 2);
    }

    contactReasons.onchange = () => {
      spanNoteCheck(contactReasons, 3);
      ddlProvera();
    }


    formElements.onsubmit = () => {
      return dugmeProvera();

    }

    /* pogo slajder */

    var pogoSlajder = document.getElementById("js-main-slider");
    var slajderSadrzaj = new Array(
      `<div class="slide_text white_fonts">
        <h1>Are you <strong class="theme_color">ready to</strong> change?</h1>
      </div>`,

      `<div class="slide_text white_fonts">
      <h1>Be the change <strong class="theme_color">you</strong> want to see!</h1>
    </div>`);

    for (let i = 0; i < slajderSadrzaj.length; i++) {
      var slajd = document.createElement("div");
      slajd.classList.add("pogoSlider-slide");
      slajd.style.backgroundImage = `url(images/pogo${i+1}.jpg)`;
      slajd.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
            ${slajderSadrzaj[i]}
        </div>
      </div>
  </div>`;
      pogoSlajder.appendChild(slajd);
    }

    $('#js-main-slider').pogoSlider({
      autoplay: true,
      autoplayTimeout: 1900,
      displayProgess: false,
      preserveTargetSize: true,
      responsive: true
    });

    /* Read more/less dugme */

    dugmeTekst.onclick = () => {
      var dots = document.getElementById("dots");
      var moreText = document.getElementById("more");
      var btnText = document.getElementById("dugmeTekst");

      if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
      } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
      }
    }

   


    /* Prikaz bloka sa tekstom i slikom */

    var blok = document.querySelector(".imgcontainer");

    var slideImage = document.createElement("img");
      slideImage.classList.add("img-fluid");
      slideImage.src = "images/c3.jpg";
      slideImage.alt = "Slide image";
      blok.appendChild(slideImage);


  }
  /* index kraj */



  /* FUNKCIJE */

  function hederIspis() {
    var naziviStranica = new Array("Home", "About");
    var linkoviStranica = new Array("index.html", "about.html");

    var meniLista = "<ul>";

    for (let i = 0; i < naziviStranica.length; i++) {
      meniLista += `<li><a href="${linkoviStranica[i]}">${naziviStranica[i]}</a></li>`
    }

    meniLista += "</ul>";



    document.getElementById("menu_section").innerHTML = meniLista;

    var heder = document.getElementById("hederData");

    for (let i = 0; i < 2; i++) {
      var divHeder = document.createElement("div");
      divHeder.classList.add("col-sm-6");
      heder.appendChild(divHeder);
    }


    heder.firstChild.innerHTML = `<div class="logo_main">
    <a href="index.html"><img src="images/main_logo.png" /></a>
 </div>`;
    heder.lastChild.innerHTML = `<button type="button" id="sidebarCollapse" class="btn btn-info navbar-btn"><i class="fa fa-bars"></i></button>`;





  }

  function futerIspis(){

    /*prva kolona*/
    var divImg = document.createElement("div");
    $(divImg).addClass("full");
    $(divImg).html(`<img class="img-responsive" src="images/main_logo.png"
    alt="site logo" />`);
    $('#rowOne').append(divImg);

    var divTxt = document.createElement("div");
    $(divTxt)
    .addClass("full white_fonts")
    .html(`<p>RunFitness offers a large selection of group trainings, as well as a constantly present, friendly staff, which is always available. Fitness instructors and trainers RunFitness are professionals with many years of coaching experience and specialization in a particular type of exercise.</p>`);
    $('#rowOne').append(divTxt);

    /* druga kolona */

    var gymInfo = new Array (["Address", "17 Canal Street, New York, NY"], ["Tel","+1 123 456789"], ["Fax", "+1 123 456"], ["Email","support@vigorfit.com"]);

    var divInfo = $("#rowTwoInfo");
    $(divInfo).html("<h3>CONTACT</h3>");

    for(let i=0; i<gymInfo.length; i++){
      $(divInfo).append(`<p>${gymInfo[i][0]}: ${gymInfo[i][1]}</p>`);
    }

    var socialNet = ["facebook", "twitter", "youtube"];
    for (network of socialNet){
      $("#socials .social_icon").append(`<li><a href="https://www.${network}.com/"><i
      class="fa fa-${network}"></i></a></li>`);
    }
    


    


  }

  function kontaktFormaIspis() {
    var forma = document.getElementById("formElements");

    var ime = generisiInput();
    $(ime).attr({
      "type": "text",
      "placeholder": "Your Name",
      "id": "name",
    });


    var email = generisiInput();
    $(email).attr({
      "type": "email",
      "placeholder": "Your E-mail",
      "id": "email"
    });

    var brojTelefona = generisiInput();
    $(brojTelefona).attr({
      "type": "text",
      "placeholder": "Your Number",
      "id": "phoneNumber"
    });

    /* generisanje DDL */

    var selekcija = document.createElement("select");
    selekcija.id = "contactReasons";
    var opcije = ["Select Reason for Contanting Us", "Online Lessons", "Cardio", "Group Trainings", "Complaint", "Other"];

    for (let j = 0; j < opcije.length; j++) {
      var opcijaEl = document.createElement("option");
      opcijaEl.value = j;
      var opcijaTxt = document.createTextNode(opcije[j]);
      opcijaEl.appendChild(opcijaTxt);
      selekcija.appendChild(opcijaEl);


    }

    var poruka = document.createElement("textarea");
    poruka.setAttribute("placeholder", "Message");
    poruka.id = "message";

    var dugmeSalji = document.createElement("button");
    dugmeSalji.setAttribute("type", "submit");
    dugmeSalji.appendChild(document.createTextNode("SEND"));
    dugmeSalji.id = "dugmeSalji";
    dugmeSalji.classList.add("main_bt");



    var nizElemenataFrome = [ime, email, brojTelefona, selekcija, poruka, dugmeSalji];

    for (element of nizElemenataFrome) {
      var divForm = document.createElement("div");
      divForm.classList.add("formKeep");
      var spanNote = document.createElement("span");
      spanNote.classList.add("spanNote");
      divForm.appendChild(element);
      divForm.appendChild(spanNote);
      forma.appendChild(divForm);
    }



  }

  function generisiInput() {
    return document.createElement("input");
  }


  function imeProvera() {

    var imeRegEx = /^([A-ZČĆŽŠĐa-zčćžšđ\s*]{3,20})$/;
    var ime = document.getElementById("name");
    var spanNote = document.querySelectorAll(".formKeep")[0].lastElementChild;



    if (imeRegEx.test(ime.value)) {
      ime.classList.remove('wrong');
      ime.classList.add('correct');
      spanNote.innerHTML = "Correct.";
      return true;

    } else {
      ime.classList.remove('correct');
      ime.classList.add('wrong');
      spanNote.innerHTML = "Wrong format! Name shouldn't be shorter than 3 or longer than 20 characters.";
      return false;

    }

  }

  function mejlProvera() {
    var mejlRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var mejl = document.getElementById("email");
    var spanNote = document.querySelectorAll(".formKeep")[1].lastElementChild;


    if (mejlRegEx.test(mejl.value)) {
      mejl.classList.remove('wrong');
      mejl.classList.add('correct');
      spanNote.innerHTML = "Correct.";
      return true;

    } else {
      mejl.classList.remove('correct');
      mejl.classList.add('wrong');
      spanNote.innerHTML = "Wrong format! Please make sure you entered correct e-mail address.";
      return false;

    }

  }

  function telefonProvera() {
    var telefonRegEx = /^\+381[0-9]{8,10}$/;
    var telefon = document.getElementById("phoneNumber");
    var spanNote = document.querySelectorAll(".formKeep")[2].lastElementChild;


    if (telefonRegEx.test(telefon.value)) {
      telefon.classList.remove('wrong');
      telefon.classList.add('correct');
      spanNote.innerHTML = "Correct.";
      return true;

    } else {
      telefon.classList.remove('correct');
      telefon.classList.add('wrong');
      spanNote.innerHTML = "Wrong format! Please make sure you entered numer in format '+381...'.";
      return false;

    }


  }

  function ddlProvera() {
    var opcije = document.getElementById("contactReasons");
    var izabrano = opcije.options[opcije.selectedIndex];
    var spanNote = document.querySelectorAll(".formKeep")[3].lastElementChild;

    if (izabrano.value == 0 || izabrano == -1) {
      spanNote.innerHTML = "You have to choose the reason.";
      opcije.classList.remove('correct');
      opcije.classList.add("wrong");
      return false;
    } else {
      spanNote.innerHTML = "You made a choice.";
      opcije.classList.remove('wrong');
      opcije.classList.add("correct");
      return true;
    }
  }




  function porukaProvera() {

    var message = document.getElementById("message");
    var spanNote = document.querySelectorAll(".formKeep")[4].lastElementChild;

    if (message.value == "") {
      spanNote.innerHTML = "You can't send an empty message.";
      message.classList.remove('correct');
      message.classList.add("wrong");
      return false;
    } else {
      spanNote.innerHTML = "Your message is ready.";
      message.classList.remove('wrong');
      message.classList.add("correct");
      return true;
    }
  }

  function dugmeProvera() {
    var finalCheck = false;

    var imeCheck = imeProvera();
    var mejlCheck = mejlProvera();
    var telefonCheck = telefonProvera();
    var ddlCheck = ddlProvera();
    var msgCheck = porukaProvera();

    if (imeCheck && mejlCheck && telefonCheck && ddlCheck && msgCheck) finalCheck = true;

    if (finalCheck) {
      event.preventDefault();
      $('#formElements').trigger("reset");
      spanNoteCheck(ime, 0);
      spanNoteCheck(email, 1);
      spanNoteCheck(brojTelefona, 2);
      spanNoteCheck(contactReasons, 3);
      spanNoteCheck(message, 4);
    }

    return finalCheck;

  }


  function spanNoteCheck(element, mestoUNizu) {

    var spanNote = document.querySelectorAll(".formKeep")[mestoUNizu].lastElementChild;

    if (element.classList[0] == "correct" || element.classList[0] == "wrong") {
      element.classList.remove(element.classList[0]);
      spanNote.innerHTML = "";
    }


  }


}
