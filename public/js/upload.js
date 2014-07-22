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
                    var htmlObj = data.responseJSON;
                   console.log(htmlObj.schedulesHTML);
                   //$('#status_header').html(htmlObj.statusHTML);
                   common.displayStatus(htmlObj.statusHTML, htmlObj.type);
                    table.reload();
                   //$('#schedule_container').html(htmlObj.schedulesHTML);
                    //document.location.reload(true);
                }
            });
        };

    return{
        init: init
    };
})();