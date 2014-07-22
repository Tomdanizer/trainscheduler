//Global
//Tobias Cohen & S.O.
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var common = (function(){
    var dangerAlert = _.template('<div class="alert alert-danger" role="alert"><%= message %></div>'),
        warningAlert = _.template('<div class="alert alert-warning" role="alert"><%= message %></div>'),
        infoAlert = _.template('<div class="alert alert-info" role="alert"><%= message %></div>'),
        successAlert = _.template('<div class="alert alert-success" role="alert"><%= message %></div>');
    var displayStatus = function(status, type){
        var html;
        switch(type){
            case "success":
                html = successAlert({message:status});
                break;
            case "warning":
                html = warningAlert({message:status});
                break;
            case "info":
                html = infoAlert({message:status});
                break;
            case "danger":
                html = dangerAlert({message:status});
                break;
            default:
                html = infoAlert({message:status});
        }
            $('#schedule_container').slideDown(700, function(){
                $('#status_header').html(html);
            });


        autoHideStatus();
    },
    autoHideStatus = function(delay){
        //Delay is an option argument, if omitted, set default to 4 seconds
        if(delay == null){
            delay = 4000
        }
        var alert = $('#status_header .alert').alert();
        window.setTimeout(function() {
            alert.fadeTo(500, 0).slideUp(500, function(){
                $(this).remove();
            });
        }, delay);
    };


    return{
        displayStatus : displayStatus
    }
})();
$( document ).ready(function() {
    upload.init();
    table.init();
});