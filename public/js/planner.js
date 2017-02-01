"use strict";

	$(document).ready(function() {

		var zone = "-05:00";  //Florida time zone
		var json_events; 

	$.ajax({
		url: '/calendar',
        type: 'GET', // GET data
        async: false,
        success: function(s){
			json_events = s;
			initCalendar();
			$('#calendar').fullCalendar({
			//events: json_events
			});
        }
	}).done(function(json_events){


console.log(json_events);
	});

	var currentMousePos = {
	    x: -1,
	    y: -1
	};
	jQuery(document).on("mousemove", function (event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

		/* initialize the external events
		-----------------------------------------------------------------*/
		$('#external-events .fc-event').each(function() {

			// store data so the calendar knows to render an event upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});

		});


		/* initialize the calendar
		-----------------------------------------------------------------*/

function initCalendar(){
		$('#calendar').fullCalendar({

			events: json_events, //JSON.parse(json_events),
			//events: [{"id":"14","title":"New Event","start":"2015-01-24T16:00:00+04:00","allDay":false}],
			utc: true,
			header: {
				left: 'prev',
				right: 'next',
				center: 'title',
			},
			editable: true,
			droppable: true, 
			slotDuration: '00:30:00',
			/*
				defaultView option used to define which view to show by default,
				for example we have used agendaWeek.
			*/
			defaultView: 'agendaWeek',
			/*
				selectable:true will enable user to select datetime slot
				selectHelper will add helpers for selectable.
			*/
			selectable: true,
			selectHelper: true,
			eventReceive: function(event){
				//if(json_events.length == 0) return;
				var title = event.title;
				var start = event.start.format("YYYY-MM-DD[T]HH:MM:SS");
				var end = start;
				console.log("start time " + start);
				var allDay = event.allDay;
				$.ajax({
		    		url: '/calendar/add-event',
		    		data: 'title='+title+'&start='+start+'&end='+end+'&allDay='+allDay+'&zone='+zone,
		    		type: 'POST',
		    		dataType: 'json',
		    		success: function(response){
		    			event.id = response.id;
						console.log(event.id);
		    			$('#calendar').fullCalendar('updateEvent',event);
		    		},
		    		error: function(e){
		    			console.log(e.responseText);

		    		}
		    	});
				$('#calendar').fullCalendar('updateEvent',event);
				//console.log(event);
			},
			eventDrop: function(event, delta, revertFunc) {  //change where and when an event occurs
		        var title = event.title;
		        var start = event.start.format("YYYY-MM-DD[T]HH:MM:SS");
		        var end = (event.end == null) ? start : event.end.format("YYYY-MM-DD[T]HH:MM:SS");
		        $.ajax({
					url: '/calendar/update-when',
					data: 'title='+title+'&start='+start+'&end='+end+'&id='+event.id,
					type: 'PUT',
					dataType: 'json',
					success: function(response){
						if(response.status != 'success')		    				
						revertFunc();
					},
					error: function(e){		    			
						revertFunc();
						alert('Error processing your request: '+e.responseText);
					}
				});
		    },
		    eventClick: function(event, jsEvent, view) {
		    	console.log(event.id);
		          var title = prompt('Event Title:', event.title, { buttons: { Ok: true, Cancel: false} });
		          if (title){
		              event.title = title;
		              console.log('type=changetitle&title='+title+'&id='+event.id);
		              $.ajax({
				    		url: '/calendar/update-title',
				    		data: 'title='+title+'&id='+event.id,
				    		type: 'PUT',
				    		dataType: 'json',
				    		success: function(response){	
				    			if(response.status == 'success')			    			
		              				$('#calendar').fullCalendar('updateEvent',event);
				    		},
				    		error: function(e){
				    			alert('Error processing your request: '+e.responseText);
				    		}
				    	});
		          }
			},
			eventResize: function(event, delta, revertFunc) {
				console.log(event);
				var title = event.title;
				var end = event.end.format();
				var start = event.start.format();
		        $.ajax({
					url: '/calendar/update-when',
					data: 'title='+title+'&start='+start+'&end='+end+'&id='+event.id,
					type: 'PUT',
					dataType: 'json',
					success: function(response){
						if(response.status != 'success')		    				
						revertFunc();
					},
					error: function(e){		    			
						revertFunc();
						alert('Error processing your request: '+e.responseText);
					}
				});
		    }//,
			// eventDragStop: function (event, jsEvent, ui, view) {
			//     if (isElemOverDiv()) {
			//     	var con = confirm('Are you sure to delete this event permanently?');
			//     	if(con == true) {
			// 			$.ajax({
			// 	    		url: '/delete',
			// 	    		data: 'id='+event.id,
			// 	    		type: 'DELETE',
			// 	    		dataType: 'json',
			// 	    		success: function(response){
			// 	    			console.log(response);
			// 	    			if(response.status == 'success'){
			// 	    				$('#calendar').fullCalendar('removeEvents');
            // 						getFreshEvents();
            // 					}
			// 	    		},
			// 	    		error: function(e){	
			// 	    			alert('Error processing your request: '+e.responseText);
			// 	    		}
			//     		});
			// 		}   
			// 	}
			// }
		});
}//init calendar
	// function getFreshEvents(){
	// 	$.ajax({
	// 		url: 'process.php',
	//         type: 'POST', // Send post data
	//         data: 'type=fetch',
	//         async: false,
	//         success: function(s){
	//         	freshevents = s;
	//         }
	// 	});
	// 	$('#calendar').fullCalendar('addEventSource', JSON.parse(freshevents));
	// }


	function isElemOverDiv() {
        var trashEl = jQuery('#trash');

        var ofs = trashEl.offset();

        var x1 = ofs.left;
        var x2 = ofs.left + trashEl.outerWidth(true);
        var y1 = ofs.top;
        var y2 = ofs.top + trashEl.outerHeight(true);

        if (currentMousePos.x >= x1 && currentMousePos.x <= x2 &&
            currentMousePos.y >= y1 && currentMousePos.y <= y2) {
            return true;
        }
        return false;
    }

// $('#calendar').fullCalendar({
// 	events: '/calendar'
// }); //display it.



	});