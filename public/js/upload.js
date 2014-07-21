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
                   $('#status_header').html(htmlObj.statusHTML);
                   $('#schedule_container').html(htmlObj.schedulesHTML);
                    //document.location.reload(true);
                }
            });
           // this.parentNode.submit();
            // files is a FileList of File objects. List some properties.
            /* var output = [];
             for (var i = 0, f; f = files[i]; i++) {
             output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
             f.size, ' bytes, last modified: ',
             f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
             '</li>');
             }
             document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
             */
        };

    return{
        init: init
    };
})();