jQuery(document).ready(function($) {
  $("#contactForm").validate({
  	rules: {
  		cta_name: "required",
  		cta_email: {
  			required: true, email: true
  		},
      cta_subject: "required",
  		cta_message: "required"
  	},
  	messages: {
  		cta_name: "Please enter your name",
  		cta_email: {
  			required: "Please enter your E-mail",
  			email: "Please enter valid E-mail"
  		},
      cta_subject: "Please enter subject",
  		cta_message: "Please leave your message!"
  	},
  		submitHandler: function(form) {
  		$(".alert").remove();
      		$.ajax({
  				type: "POST",
  				url: "/savecontact",
  				headers : { "cache-control": "no-cache" },
  				data: {'phone' : $("#cta_phone").val(), 'name' : $("#cta_name").val(), 'email' : $("#cta_email").val(), 'subject' : $("#cta_subject").val(), 'message' : $("#cta_message").val() },
  				dataType: "json",
  				cache: false,
  				success: function(response){
  					if(response.success){
  						window.location.href = "/contact-us?success="+response.success;
  					}else if(response.error){
  						window.location.href = "/contact-us?success="+response.error;
  					}
  				}
  			});
  		}
  });

  $.getJSON("/search-results?start=0&s=&type=blog&limit=3",function(html){
			if(html.error){
				$("#latestfooterblogs").before('<div class="alert">No blogs found!</div>');
			}else{

				var contentHtml="";
				$.each(html.aaData, function(i,row){
					if(row.Code!=""){
						contentHtml+='<li><i class="fa fa-angle-right"></i>';
						if(row.Published_timestamp){
							contentHtml+='<strong>'+timeConverter(row.Published_timestamp)+'</strong>:&nbsp;';
						}
						contentHtml+='<a href="/'+row.Code+'" title="'+row.Document+'">'+row.Document+'</a>';
						contentHtml+='</li>';
                    }
				});
				$("#latestfooterblogs").html(contentHtml);
			}
	});

  $.checkSearchBox = function checkSearchBox(){
  	var csearch = $('#csearch').val();
  	var csearch1 = $('#csearch1').val();
  	if(csearch=="" && csearch1==""){
  		alert('Please enter search keyword(s)');
      return false;
  	}
  	else return true;
  }
});


  function timeConverter(UNIX_timestamp, dateformat){
  	var a = new Date(UNIX_timestamp * 1000);
  	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  	var year = a.getFullYear();
  	var month = months[a.getMonth()];
  	var date = a.getDate();
  	if(dateformat=="date"){
    		return  date;
	} else if(dateformat=="month"){
		return  month;
	} else {
		return month+' '+date+', '+year;
	}
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

  function applyPagination(total_count,displayResultsNum,type){
  	currentPageNum= parseInt(currentPageNum);
  	if( isNaN(currentPageNum)){
  		currentPageNum=1;
  	}
  	var itemsPerPage=pageSize;
  	var paginationHtml='';
  	var tpages = Math.ceil(total_count/itemsPerPage);
  	if(tpages<=0){
  		tpages=1;
  	}
  	var adjacents = 2;
    var currentLink= "/"+typeStr;

    paginationHtml+= '<div class="col-12">';
    paginationHtml+= '<div class="pagination my-3">';
    paginationHtml+= '<div class="wrapper">';

  	if (currentPageNum == 1) {
  		paginationHtml+= '<a class="prev" href="javascript:void(0)" style="color:#70d4e8;">';
      paginationHtml+= '<i class="fas fa-chevron-left"></i>';
			paginationHtml+= '</a>';
    } else if (currentPageNum == 2) {
      paginationHtml+= '<a class="prev" href="'+currentLink+'">';
      paginationHtml+= '<i class="fas fa-chevron-left"></i>';
			paginationHtml+= '</a>';
    } else {
        var prePage= currentPageNum-1;
        paginationHtml+= '<a class="prev" href="'+currentLink;
        if (type == 'site'){
            paginationHtml+= '&page='+prePage+'">';
        } else {
            paginationHtml+= '?page='+prePage+'">';
        }
        paginationHtml+= '<i class="fas fa-chevron-left"></i>';
  		paginationHtml+= '</a>';
    }

   	var pmin=1;
   	if(currentPageNum>adjacents){
   		pmin=parseInt(currentPageNum) - parseInt(adjacents);
   	}

    var pmax=tpages;
    if(currentPageNum < (tpages - adjacents)){
    	pmax = parseInt(currentPageNum) + parseInt(adjacents);
  	}
    paginationHtml+= '<div class="numbers">';
  	for (var i=pmin; i <= pmax; i++) {
      	if (i == currentPageNum) {
          	paginationHtml+= '<a href="javascript:void(0)" style="color:#70d4e8;" >'+i+'</a>';
          } else if (i == 1) {
          	paginationHtml+= '<a href="'+currentLink+'" >'+i+'</a>';
          } else {
         		paginationHtml+= '<a href="'+currentLink;
                if (type == 'site'){
                    paginationHtml+= '&page='+i+'">';
                } else {
                    paginationHtml+= '?page='+i+'">';
                }
                paginationHtml+=i+'</a>';
      	    }
    }

     	if (currentPageNum<(tpages - adjacents)) {
  		    paginationHtml+= '<a href="'+currentLink;
            if (type == 'site'){
                paginationHtml+= '&page='+tpages+'">';
            } else {
                paginationHtml+= '?page='+tpages+'">';
            }
            paginationHtml+= tpages+'</a>';
      }
      paginationHtml+= '</div>';
      // next
      if (currentPageNum < tpages) {
      	var nxtPage= parseInt(currentPageNum)+1;
        paginationHtml+= '<a class="next" href="'+currentLink;
        if (type == 'site'){
            paginationHtml+= '&page='+nxtPage+'">';
        } else {
            paginationHtml+= '?page='+nxtPage+'">';
        }
        paginationHtml+= '<i class="fas fa-chevron-right"></i>';
  		paginationHtml+= '</a>';
      } else {
        paginationHtml+= '<a class="next" href="javascript:void(0)" style="color:#70d4e8;">';
        paginationHtml+= '<i class="fas fa-chevron-right"></i>';
  			paginationHtml+= '</a>';
      }
  	paginationHtml+='</div>';
    paginationHtml+='</div>';
    paginationHtml+='</div>';
  	return paginationHtml;
  }
