/**
 * Created by dan on 7/20/2014.
 */
var upload = (function(){
    var init = function() {
            //Add listeners
            $('#file_upload').on('change', handleFileSelect);
        },
        handleFileSelect = function(evt){
            console.log("SELECT");
            var files = evt.target.files; // FileList object
            var data = new FormData();
            $.each(files, function(key, value)
            {
                data.append(key, value);
            });
            console.log(files);
            $.ajax({
                url: "/upload",
                type: "POST",
                processData: false,
                contentType: false,
                data:data,
                complete: function (data) {
                    //Reset form to allow same file uploads.
                    $("#file_upload").parents("form")[0].reset();
                    switch(data.status){
                        case 200:
                            var htmlObj = data.responseJSON;
                            common.displayStatus(htmlObj.statusHTML, htmlObj.type);
                            table.reload();
                            break;
                        case 300:
                            common.displayStatus(data.responseText, "warning");
                            break;
                        case 500:
                            common.displayStatus(data.responseText, "danger");
                            break;
                        default:
                            common.displayStatus("<strong>Status:</strong> " + data.status + "<br> <strong>Status Text:</strong> " + data.statusText + "<br> <strong>Message:</strong>  " + data.responseText, "danger");
                            break;
                    }
                    
                   //console.log(htmlObj.schedulesHTML);
                   //$('#status_header').html(htmlObj.statusHTML);
                   
                    //table.reload();
                   //$('#schedule_container').html(htmlObj.schedulesHTML);
                    //document.location.reload(true);
                }
            });
        };

    return{
        init: init
    };
})();