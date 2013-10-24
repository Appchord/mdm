
$("#btn-add").click(function() {
	
	$( 'form').parsley( 'validate' );	
	if(!$('form').parsley('isValid')){
		noty({
				text : 'Input validation failed!',
				'layout' : 'center',
				'type' : 'error'
		});		
		return;
	}

	var firstname = $('#inputFirstName').val();
	var lastname = $('#inputLastName').val();
	var type = $('#inputType').val();
	var username = $('#inputEmail').val();	
	
	
	var userMAMGroups = $('#inputMAMGroups').val();
	var tenantId = $('#tenantId').val();
	
	
	if($(".radioUserType:checked").val() == 'user'){
		var userGroups = $('#inputGroups').val();
	}else{
		var userGroups = $('#inputGroupsAdmins').val();
	}
	
	
	if(userGroups != null){
		if(userMAMGroups != null){
			userGroups = userGroups + "," + userMAMGroups;
		}
		
	}else{
		if(userMAMGroups != null){
			userGroups = userMAMGroups;
		}		
	}
	
	
	var userGroupsArray = []
	if (userGroups != null) {
		userGroupsArray = userGroups.toString().split(",");
	}
	
	
	//alert(userGroupsArray);
	
	// alert(JSON.stringify(userGroupsArray));
	jso = {
		"tenant_id" : tenantId,
		"username" : username,		
		"first_name" : firstname,
		"last_name" : lastname,
		"type": type,
		"groups" : userGroupsArray	
	};	
	
	 var n = noty({
					text : 'Adding user, please wait....',
					'layout' : 'center',
					timeout: false				
								
	});
	
	
	
		
	jQuery.ajax({
		url : getServiceURLs("usersCRUD", ""),
		type : "PUT",		
		data : JSON.stringify(jso),		
		contentType : "application/json",
     	dataType : "json",
     	statusCode: {
			400: function() {				
				n.setText('Error occured!');	
				n.setType('error');
				n.setTimeout(1000);			
			},
			404: function() {				
				n.setText('API not found!');	
				n.setType('error');	
				n.setTimeout(1000);		
			},
			500: function() {				
				n.setText('Fatal error occured!');	
				n.setType('error');
				n.setTimeout(true);			
			},
			201: function() {				
				n.setText('User Added successfully!');	
				window.location.assign("configuration");
			},
			409: function() {				
				n.setText('User already exist!');	
				n.setType('error');
				n.setTimeout(1000);			
			}
		}				
	});
	

});


$( ".radioUserType" ).change(function() {
	var value = $(this).val();	
	//$(".inputGroupsSelect .box1 .filter").val(value);	
	//$(".inputGroupsSelect .box1 .filter" ).change();
	
	if(value == 'user'){
		$("#userSeletBox").css("display", "block");
		$("#adminSeletBox").css("display", "none");
	}else{
		$("#userSeletBox").css("display", "none");
		$("#adminSeletBox").css("display", "block");
	}
});



$( document ).ready(function() {
	//var value = 'user';	
	//$(".inputGroupsSelect .box1 .filter").val(value);	
	//$(".inputGroupsSelect .box1 .filter" ).change();
	
	$("#adminSeletBox").css("display", "none");
});