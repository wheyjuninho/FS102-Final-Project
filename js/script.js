//scroll
$(window).on('scroll', function() {
    $('nav').show();
        if($(window).scrollTop()) {
            $('nav').addClass('fade');
        } else {
            $('nav').removeClass('fade');
        }
});
      
//home 
    //mouse hover over home page title of each section, content will display
    
    $(document).ready(function(){
        $("h3").hover(function(){
            if($(this).hasClass("title-hover1")){
            $("#p1").show();
            }
            if($(this).hasClass("title-hover2")){
            $("#p2").show();
            }
            if($(this).hasClass("title-hover3")){
            $("#p3").show();
            }
            if($(this).hasClass("title-hover4")){
            $("#p4").show();
            }
            if($(this).hasClass("title-hover5")){
            $("#p5").show();
            }
        })
    });
          //mouse out each paragraph, it will hide, otherwise it will show
    $(document).ready(function(){
        $("#p1").mouseout(function(){
            $("#p1").hide();
        });
        $("#p1").mouseover(function(){
            $("#p1").show();
        });
        $("#p2").mouseout(function(){
            $("#p2").hide();
        });
        $("#p2").mouseover(function(){
            $("#p2").show();
        });  
        $("#p3").mouseout(function(){
            $("#p3").hide();
        });
        $("#p3").mouseover(function(){
            $("#p3").show();
        }); 
        $("#p4").mouseout(function(){
            $("#p4").hide();
        });
        $("#p4").mouseover(function(){
            $("#p4").show();
        }); 
        $("#p5").mouseout(function(){
            $("#p5").hide();
        });
        $("#p5").mouseover(function(){
            $("#p5").show();
        }); 
    });
    
    
          
    //scroll to TOP button
        var mybutton = document.getElementById("myBtn");
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {scrollFunction()};
            function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
          } else {
            mybutton.style.display = "none";
          }
        }
    
        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    
        //modal
          document.getElementById("button").addEventListener("click",function(){  
            document.querySelector(".bg-modal").style.display = "flex";
          });
          document.querySelector(".close").addEventListener("click", function() {
            document.querySelector(".bg-modal").style.display = "none";
          }); 

        //Appointment
            //sort button for preferred vaccine location  
    $(document).ready(function(){
        $("#sortDistanceButton").click(function(){
            $.ajax({
                type: 'GET', 
                url: 'vaccinationLocationDistance.json',
                dataType: 'json', 
                success: function(data){
                    var locationList = [data];             // Variable array to store Data obtained
                    var filteredList = locationList[0];    // Array variable declaration for easier access to index 0 where all data is
                    var finallocationList = [];            // Array for final sorted content

                    filteredList.sort(function(a, b) {  // Sort array by distance
                        return b.distance - a.distance;
                    });

                    var text = "";                      // add array contents to this text variable
                        // For each array index, get the values of location and distance                  
                    $.each(filteredList, function(key, value) {
                        var distance = "<strong> " + value.location + "<br/><strong> Distance:</strong> " + value.distance + "km" // Variable to store whole html line for each movie
                        finallocationList.push(distance); // Adding formated vaccine brand individually to final array
                    });
                
                    for (i = 0; i < finallocationList.length; i++) {   // For loop to add up the final vaccine list into text varible for easy DOM manipulation later
                        text += `<p>${finallocationList[i]}</p>`;  // Storing each vaccine and it's other properties into paragraphs and add into text variable
                    }

                    $('.selectLocation').html(`${text}`);   // DOM HTML command line to output all the sorted vaccine's efficacy into the class of the division created
                    }
            });         
        });
    });    

    //sort button for preferred vaccine location
    $(document).ready(function(){
        $("#sortVaccineButton").click(function(){
            $.ajax({
                type: 'GET', 
                url: 'vaccineEfficacyRate.json',
                dataType: 'json', 
                success: function(data){
                    var vaccineList = [data];             // Variable array to store Data obtained
                    var filteredList = vaccineList[0];    // Array variable declaration for easier access to index 0 where all data is
                    var finalvaccineList = [];            // Array for final sorted content
                    filteredList.sort(function(a, b) {  // Sort array by efficacy %
                        return b.efficacy - a.efficacy;
                    });
                    var text = "";                      // add array contents to this text variable
                        // For each array index, get the values of brand name, efficacy % and country of origin                  
                    $.each(filteredList, function(key, value) {
                        var vaccine = "<strong> <br/> " + value.brand + "<br/><strong> Efficacy:</strong> " + value.efficacy + "%" +"<br/><strong>Country of Origin: "  + value.origin // Variable to store whole html line for each movie
                        finalvaccineList.push(vaccine); // Adding formated vaccine brand individually to final array
                    });
                
                    for (i = 0; i < finalvaccineList.length; i++) {   // For loop to add up the final vaccine list into text varible for easy DOM manipulation later
                        text += `<p>${finalvaccineList[i]}</p>`;  // Storing each vaccine and it's other properties into paragraphs and add into text variable
                    }

                    $('.selectVaccine').html(`${text}`);   // DOM HTML command line to output all the sorted vaccine's efficacy into the class of the division created
                        }
                    });         
                });
            }); 
          


        //Passport
        $('#buttonLogin').click(function( event ) {
            event.preventDefault(); //prevent default behaviour of form to submit 
                var nric = document.getElementById("nric").value //get nric input from user
                var password = document.getElementById("password").value //get password input from user
            $.ajax({
                type: 'GET',
                url: 'loginAccount.json',
                dataType: ('json'), 
                success: function(data) {
                    $.each(data, function(key, value) {
                        JSON.stringify(value); 
                        if(nric == value.login && password === value.password) {
                            $('#nricDIV').hide();
                            $('#passwordDIV').hide();
                            $('#loginDIV').hide();
                            $('#displayMessage').html('<p style="color: green; font-size: 25px; text-align:center;">' + "<b> Please proceed to upload your certificate here ✔✔✔</b>");
                            $('.hide').show();
                            //console.log("correct");
                        } if ((nric != value.login && password != value.password) || (nric != value.login || password != value.password)) {
                            //console.log("wrong");
                            $('#displayMessage').append('<p style="color: red; font-size: 25px; text-align:center;">' + "<b>NRIC or Password is incorrect❌ <br/> If haven't registered an account, </br> please register a profile with us 🢃 </b></p>");
                        }
                    })  
                }  
            })
        }); 

    //FAQ    
    //using jQuery toggle to show and hide dropdown boxes for answers to FAQ questions   
    $(document).ready(function(){
        $('#answer1').hide();
        $('#answer2').hide();
        $('#answer3').hide();
        $('#answer4').hide();
        $('#answer5').hide();
        $('#answer6').hide();
        $(function() {
            $('#toggleButton1').click( function() {
            $('#answer1').toggle('fast', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        });    
        $(function() {
            $('#toggleButton2').click( function() {
            $('#answer2').toggle('fast', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        });  
        $(function() {
            $('#toggleButton3').click( function() {
            $('#answer3').toggle('5000', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        });  
        $(function() {
            $('#toggleButton4').click( function() {
            $('#answer4').toggle('5000', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        }); 
        $(function() {
            $('#toggleButton5').click( function() {
            $('#answer5').toggle('5000', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        }); 
        $(function() {
            $('#toggleButton6').click( function() {
            $('#answer6').toggle('slow', function(){
                if ($('#header').is(':visible')) {
                $('#toggleButton').val('Hide') 
                } else {
                    $('#toggleButton').val('Show') 
                }
                });
            });
        }); 
    });    

    //modal
    document.getElementById("button").addEventListener("click",function(){  
        document.querySelector(".bg-modal").style.display = "flex";
    });
    document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".bg-modal").style.display = "none";
    });     


