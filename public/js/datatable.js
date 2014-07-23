var table = (function(){
    var dtable;
    var checkedId = [];
    var init = function(){
        //Save table tbody to avoid multiple calls.
        var tbody = $('#schedule_table tbody');

        //Data table configuration. Calls data.json URL which queries DB for results

        dtable = $('#schedule_table').DataTable({
            "bAutoWidth": false,
            "order": [[ 3, "asc" ]],
              "ajax": {
                "url": "data.json",
                "type": "POST",
                "complete" : function(e){
                    if(e.responseJSON.data.length === 0){
                        //Display message.
                        common.displayStatus("It looks like the table is empty! To get started, either click the <span class='label label-success'>Upload CSV</span> button, or simply drag and drop a csv file to the page!", "info", 15000);
                        $(".dataTables_empty").text("No data available in table");

                    }
                },
                "error": function(e){
                    $(".dataTables_empty").text(e.responseText);
                  }
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

        //Disables ajax alert box message that gets thrown by the datatable.
        $.fn.dataTable.ext.errMode = 'throw';

        //Removes the fixed set width by the datatable to allow it to autosize.

        //Table click handlers for CRUD ops
        tbody.on('click', '.edit-record', editRecordClick);
        tbody.on('click', '.delete-record', deleteRecordClick);
        $('#delete_rows').on('click', deleteRecordConfirm);
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
    },
    /*
        Handles clicks on the edit column control.
     */
    editRecordClick = function(){
        console.log('edit');
        var data = getRowData.apply(this);
        var addTemplate = _.template($('#modal_template').html()),
            html = addTemplate({
                                title:"Edit train",
                                train: data.train_line,
                                route: data.train_route,
                                run: data.train_run,
                                operator: data.train_operator,
                                type: "edit"
                                });
        $("body").append(html);
        $("#modal_edit").modal('show');
        $('#form_edit').on('submit', { id : data.id }, editRecord);
    },
    /*
        Handles clicks on the delete column checkboxes.
     */
    deleteRecordClick = function(){
        console.log('delete');
        var checkedCount = $(".delete-record:checked").length,
            deleteButton = $("#delete_rows"),
            data = getRowData.apply(this);

        //If there are no checkboxes checked, disable the delete button
        //Todo, this can probably changed to check against the checkedID array to avoid having to do a selector on everything.
        (checkedCount > 0) ? deleteButton.toggleClass("disabled", false) : deleteButton.toggleClass("disabled", true);

        //If this checkbox is checked, add it to the array, otherwise remove it
        ($(this).prop('checked') ? checkedId.push(data.id) : checkedId.splice(checkedId.indexOf(data.id), 1));
        console.log(checkedId);
    },

    /*
        Posts form data from the form_add modal to be inserted into the database
     */
    addRecord = function(e){
        //Prevent default form submit
        e.preventDefault();

        //Hide and then remove the add form modal
        hideModal($("#modal_add"));

        //Serialize form data into a json object and send it as a post
        var json = $(this).serializeObjectEscapedValue();
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
    editRecord = function(e){
        //Prevent default form submit
        e.preventDefault();
        //Hide and then remove the add form modal
        hideModal($("#modal_edit"));

        //Serialize form data into a json object and send it as a post
        var json = $(this).serializeObjectEscapedValue();
        json.id = e.data.id;
        $.ajax({
            url: "/edit",
            type: "POST",
            data:json,
            complete: function (data) {
                var results = data.responseJSON.results;
                common.displayStatus("Updated " + results + " rows.", "success");
                reload();
                //document.location.reload(true);
            }
        });
    },
    deleteRecordConfirm = function(){
        var confirmTemplate = _.template($('#confirm_template').html()),
            html = confirmTemplate({
                title:"Confirm delete",
                rowcount: checkedId.length
            });
        $("body").append(html);
        $("#modal_confirm").modal('show');
        $('#modal_confirm_delete').on('click', deleteRecord);
    },
    /*
     Sends all the checked rows as post data to be deleted
     */
    deleteRecord = function(){
        hideModal($("#modal_confirm"));
        $.ajax({
            url: "/delete",
            type: "POST",
            data:{records:checkedId},
            complete: function (data) {
                var deleted = data.responseJSON.deleted;
                common.displayStatus("Deleted " + deleted + " rows.", "success");
                //Empty the array
                checkedId.length = 0;
                reload();
                //document.location.reload(true);
            }
        });
    },
    hideModal = function(modalElement){
        modalElement.modal('hide')
        modalElement.on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
    },
    /*
        Grabs current rows data attributes
     */
    getRowData = function(){
        return  dtable.row( $(this).parents('tr') ).data();
    },

    /*
        Reloads data in the datatable via ajax url in the datatable config.
     */
    reload = function(){
        dtable.ajax.reload();
    };
    return {
        init: init,
        reload: reload
    };
})();