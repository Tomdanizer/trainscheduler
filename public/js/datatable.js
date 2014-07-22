var table = (function(){
    var dtable;
    var checkedId = [];
    var init = function(){
        //Save table tbody to avoid multiple calls.
        var tbody = $('#schedule_table tbody');

        //Data table configuration. Calls data.json URL which queries DB for results
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
                      "defaultContent": "<input name='delete-record' class='delete-record' type='checkbox'>"},
                    { "data": null,
                      "targets": -1,
                      "defaultContent": "<span class='glyphicon glyphicon-edit edit-record'></span>"}
                ],
            "deferRender": true
        });

        //Table click handlers for CRUD ops
        tbody.on('click', '.edit-record', editRecordClick);
        tbody.on('click', '.delete-record', deleteRecordClick);
        $('#delete_rows').on('click', deleteRecord);
        $('#add_rows').on('click', newRecordClick);

    },
    newRecordClick = function(){
        var addTemplate = _.template($('#modal_template').html()),
            html = addTemplate({
                                title:"Add new train",
                                train: "",
                                route: "",
                                run: "",
                                operator: "",
                                type: "add"
                                });
        $("body").append(html);
        $("#modal_add").modal('show');
        $('#form_add').on('submit', addRecord);
        console.log("new");

    },
    editRecordClick = function(){
        console.log('edit');
        var data = getRowData();
    },
    deleteRecordClick = function(){
        console.log('delete');
        var checkedCount = $(".delete-record:checked").length,
            deleteButton = $("#delete_rows"),
            data = getRowData.apply(this);
        (checkedCount > 0) ? deleteButton.toggleClass("disabled", false) : deleteButton.toggleClass("disabled", true);
        ($(this).prop('checked') ? checkedId.push(data.id) : checkedId.splice(checkedId.indexOf(data.id), 1));
        console.log(checkedId);
    },
    addRecord = function(e){
        e.preventDefault();
        $("#modal_add").modal('hide')
        $('#modal_add').on('hidden.bs.modal', function (e) {
            $(this).remove();
        })
        var json = $(this).serializeObject();
        $.ajax({
            url: "/add",
            type: "POST",
            data:json,
            complete: function (data) {
                var add = data.responseJSON.add;
                common.displayStatus("Added " + add + " rows.", "success");
                reload();
                //document.location.reload(true);
            }
        });
    },
    deleteRecord = function(){
        $.ajax({
            url: "/delete",
            type: "POST",
            data:{records:checkedId},
            complete: function (data) {
                var deleted = data.responseJSON.deleted;
                common.displayStatus("Deleted " + deleted + " rows.", "success");
                reload();
                //document.location.reload(true);
            }
        });
    },
    getRowData = function(){
        return  dtable.row( $(this).parents('tr') ).data();
    },
    displayModal = function(html){

    },
    reload = function(){
        dtable.ajax.reload();
    };
    return {
        init: init,
        reload: reload
    };
})();