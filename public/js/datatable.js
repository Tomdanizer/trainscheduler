var table = (function(){
    var dtable;
    var checkedId = [];
    var init = function(){
        var tbody = $('#schedule_table tbody');
        dtable = $('#schedule_table').DataTable({
            "order": [[ 2, "asc" ]],
              "ajax": {
                "url": "data.json",
                "type": "POST"
              },
              "columns": [
                    {
                        "data": "id",
                        "visible": false,
                        "searchable": false
                    },
                    { "data": "train_line" },
                    { "data": "train_route" },
                    { "data": "train_run" },
                    { "data": "train_operator"},
                    { "data": null,
                      "targets": -1,
                      "defaultContent": "<input class='delete-record' type='checkbox'>"},
                    { "data": null,
                      "targets": -1,
                      "defaultContent": "<span class='glyphicon glyphicon-edit edit-record'></span>"}
                ],
            "deferRender": true
        });
        tbody.on('click', '.edit-record', editRecord);
        tbody.on('click', '.add-record', newRecord);
        tbody.on('click', '.delete-record', deleteRecord);
    },
    newRecord = function(){

    },
    editRecord = function(){

    },
    deleteRecord = function(){

    },
    displayStatus = function(status){

    },
    displayModal = function(html){

    },
    reload = function(){
        dtable.ajax.reload();
    };
    return {
        init: init
    };
})();