$(document).ready(function(){ 

  // Reload the entire page and skips to Main page to remove previously entered data.
  $(".facebook-heading").click(() => {
    location.reload();
  });

   $(".go-back").click(() => {
    location.reload();
  });


	$(".FbProfile").hide();
  $(".feeds").hide();
	$("#timeout").hide();

  $("#fee").on('click', function(){
    var feedsToken =  document.getElementById("token").value;
    
    feeds(feedsToken);
  });

	$("#pro").on('click', function(){ 
    var profileToken =	document.getElementById("token").value;
		
		profile(profileToken);
	});

	

});









let feeds = (token) => {
  

  var fbToken = token;

  $.ajax('https://graph.facebook.com/me?fields=name,posts.fields(full_picture,created_time,story,likes),id,location,favorite_athletes,hometown,quotes,gender,birthday,languages,relationship_status,education,family,email,picture.width(300).height(300),friends&access_token='+fbToken,{
    success: function(response){
      
      $(".main").hide();
      $(".FbProfile").hide();
      $(".feeds").show();

      
      
      // profile picture
      $(".profilepic").attr("src", response.picture.data.url);
      
      // User name
      if(response.name !== null && response.name !== undefined){
        $(".username").text(response.name);  
      }
      else{
        $(".username").text(null);
      }

      // quotes
      if(response.quotes !== null && response.quotes !== undefined){
        $("#quotes").text(response.quotes);  
      }
      else{
        $("#quotes").text("(empty)");
      }

      // Gender
      $("#gender").text(response.gender);
      
      // DOB
      $("#dob").text(response.birthday);
  
      // Displaying Posts
        for(var i = 0; i < response.posts.data.length; i++){

          div = document.createElement("div");
          $(div).attr("class", "story"+i);
          $("#story").append(div);
          if(response.posts.data[i].story !== null & response.posts.data[i].story !== undefined){
            $(".story"+i).html("<h4 class='w3-border-bottom w3-padding-16 h-four'><b>"+response.posts.data[i].story+"</b></h4>"+"<p class='p-p'>at "+response.posts.data[i].created_time+"</p><img class='w3-image w3-padding-16 postpic' src="+response.posts.data[i].full_picture+">"+  "<br>");
          }
          else{
            $(".story"+i).html("<h4 class='w3-border-bottom w3-padding-16 h-four'><b>Story None</b></h4>"+"<p class='p-p'>at "+response.posts.data[i].created_time+"</p><img class='w3-image w3-padding-16 postpic' src="+response.posts.data[i].full_picture+">"+  "<br>");  
          }
        }

        // Adding classes to the created posts
        for(var i= 0; i < response.posts.data.length; i++){
          $(".story"+i).attr("class", "w3-border w3-content w3-white w3-margin-bottom w3-padding indiPost");
          $(".story"+i).css("max-width:100%");
        }
      
      },
      error : function(request,errorType,errorMessage){
         if(errorType==="error" || request.status === 400) {
          $(".main").hide();
            $("#timeout").show();   
               
          } else {
              console.log("success");
          }
                     
      },

      timeout:20000, // in ms

      beforeSend : function(){
                    $('.profile').hide();
                    $('.loader').show();

                  },

      complete : function(){
                  $('.profile').show();
                  $('.loader').hide();
                }
  });
}









let profile = (token) => {  

  var fbToken = token;

  $.ajax('https://graph.facebook.com/me?fields=name,id,location,favorite_athletes,hometown,quotes,gender,birthday,languages,relationship_status,education,family,email,picture.width(300).height(300),friends&access_token='+fbToken,{
    success: function(response){
	   

      $(".main").hide();
      $(".feeds").hide();
      $(".FbProfile").show();


      // Adding opacity to element other than about
      $(".about").removeClass("bar");
      $(".education").addClass("bar");
      $(".relation").addClass("bar");


      // Adding extra styling to the border of about
      $(".about").addClass("barTop");
      $(".education").removeClass("barTop");
      $(".relation").removeClass("barTop");

      // Displaying the about button and hiding others
      $("#abt").show();
      $("#rel").hide();
      $("#ed").hide();
      
      // Displaying the info of about and hiding others
      $("#abtInfo").show();
      $("#relInfo").hide();
      $("#eduInfo").hide();
      

      // On about click
      $(".about").on('click', function(){

        $("#rsb").slideUp(500);

        // Opacity Classes
        $(".about").removeClass("bar");
        $(".education").addClass("bar");
        $(".relation").addClass("bar");

        // click effects Classes
        $(".about").addClass("barTop");
        $(".education").removeClass("barTop");
        $(".relation").removeClass("barTop");

        // show the button
        $("#abt").show();
        $("#rel").hide();
        $("#ed").hide();
        
        // show the info
        $("#abtInfo").fadeIn(1000);
        $("#relInfo").hide();
        $("#eduInfo").hide();
        
      });

      // On education click
      $(".education").on('click', function(){
        
        $("#rsb").slideUp(500);

        // Opacity Classes
        $(".about").addClass("bar");
        $(".education").removeClass("bar");
        $(".relation").addClass("bar");

        // click effects Classes
        $(".about").removeClass("barTop");
        $(".education").addClass("barTop");
        $(".relation").removeClass("barTop");

        // show the button
        $("#abt").hide();
        $("#rel").hide();
        $("#ed").show();
        
        // show the info
        $("#abtInfo").hide();
        $("#relInfo").hide();
        $("#eduInfo").fadeIn(1000);
        
      });

      // On relation click
      $(".relation").on('click', function(){

        $("#rsb").slideUp(500);

        // Opacity Classes
        $(".about").addClass("bar");
        $(".education").addClass("bar");
        $(".relation").removeClass("bar");

        // click effects Classes
        $(".about").removeClass("barTop");
        $(".education").removeClass("barTop");
        $(".relation").addClass("barTop");

        // show the button
        $("#abt").hide();
        $("#rel").show();
        $("#ed").hide();
        
        // show the info
        $("#abtInfo").hide();
        $("#relInfo").fadeIn(1000);
        $("#eduInfo").hide();
        
      });

      // Hamburger slide effects
      $("#rb").on('click', function(){
        $("#rsb").slideToggle();
      });

      

      $(".profilepic").attr("src", response.picture.data.url);

      // Username
      if(response.name !== null && response.name !== undefined){
        $(".username").text(response.name);  
      }
      else{
        $(".username").text(null);
      }
      
      // Total friends
      $(".friends").text(response.friends.summary.total_count);

      // Favorite Athletes
      if(response.favorite_athletes !== null && response.favorite_athletes !== undefined){
        $(".athletes").text(response.favorite_athletes.length);
      }
      else{
        $(".athletes").text("0");
      }

      // Location Details
      if(response.location !== null && response.location!== undefined){
        $("#location").text(response.location.name);  
      }
      else if(response.hometown !== null && response.hometown !== undefined){

        $("#location").text(response.hometown.name);
      }
      else{
        $("#location").text("(empty)");
      }
      	
      
      // Favourite Quotes
      if(response.quotes !== null && response.quotes !== undefined){

        $("#profile-quotes").text(response.quotes);  
      }
      else{
        $("#profile-quotes").text("(empty)");
      }

      // Gender Details
      if(response.gender !== null && response.gender !== undefined){
      	$("#profile-gender").text(response.gender);
      }
      else {
      	$("#profile-gender").text("(empty)");
      }
      
      // Date Of Birth
      if(response.birthday !== null && response.birthday !== undefined){
        $("#profile-dob").text(response.birthday);
      }
      else{
        $("#profile-dob").text("(empty)");
      }
      
      // Languages Details
      if(response.languages !== null && response.languages !== undefined){
        for(var i = 0; i < response.languages.length; i++){
        div = document.createElement("div");
        $(div).attr("class", "lang"+i);
        $('#languages').append(div);
          $(".lang"+i).html("<p>"+response.languages[i].name+"</p>");
        }  
      }
      else{
        $("#languages").text("(empty)");
      }
      
      // Email Details
      if(response.email !== null && response.email !== undefined){
        $("#email").text(response.email);
      }
      else{
        $("#email").text(response.email);
      }


      // RelationshipStatus Details
      if(response.relationship_status !== null && response.relationship_status !== undefined){
        $("#relationshipStatus").text(response.relationship_status);
      }
      else{
        $("#relationshipStatus").text("(empty)");
      }


      // Family Details
      if(response.family !== null && response.family !== undefined){
        for(var i = 0; i < response.family.data.length; i++){
          div = document.createElement("div");
          $(div).attr("class", "fam"+i);
          $('#family').append(div);
          $(".fam"+i).html("<p>"+response.family.data[i].name+ " ("+ response.family.data[i].relationship +")</p>");
        }  
      }
      else{
        $("#family").text("(empty)");
      }
      
      // EDUCATION Details
      if(response.education !== null && response.education !== undefined){
        for(var i = 0; i < response.education.length; i++){
          if(response.education[i].type === "High School"){
            div = document.createElement("div");
            $(div).attr("class", "schl"+i);
            $('#school').append(div);
            $(".schl"+i).html("<p>"+response.education[i].school.name+"</p>");
          }
          else if(response.education[i].type === "College"){
            div = document.createElement("div");
            $(div).attr("class", "clg"+i);
            $("#college").append(div);
            $(".clg"+i).html("<p>"+response.education[i].school.name+"</p>"); 
          }
          else{
            $("#school").text("(empty)");
            $("#college").text("(empty)");
          }
        }
      }
      else {
        $("#schlType").text("School:");
        $("#clgType").text("College:");
        $("#school").text("(empty)");
        $("#college").text("(empty)");
      }
    },
    error : function(request,errorType,errorMessage){

      if(errorType==="error" || request.status === 400) {
            $(".main").hide();
            $("#timeout").show();   
               
          } else {
              console.log("success");
          }
                    
      },

    timeout:50000, // in ms

    beforeSend : function(){
                $('.profile').hide();
                $('.loader').show();

      },

      complete : function(){
                $('.profile').show();
                $('.loader').hide();

      }
  });
}

