(function(e) {
    e(window.jQuery, window, document);
})(function($, window, document) {

    var app = {

        // ==============================================================================================
        // Call your function here to become a single function
        // * This method make your code more modular and make it easy to toggle your function
        // * If you want to disable a function, just commented on function that you need to disable below
        // ==============================================================================================

        init: function($) {
            app.hideID();
            //app.addBlockTable();
            //app.addBlockTableBusiness();
            // app.addBlockTableUsers();
            app.menuToggle();
            app.select2();
            app.owlSlider();
            app.addActionAsset();
            app.addActionThreat();
            app.addActionControl();
            app.deleteRow();
            app.updateRow();
            app.menuToggleEachRow();
            app.refresh();
            app.homeTableToolbar();
            app.showGettingStarted();
            app.assessmentNextButtons();
            app.initTextEditor();
            app.initAssessmentTextEditor();
        },

        // ======================================================================
        // Your function here
        // * Don't forget to use proper function name to describes your function
        // ======================================================================
        initTextEditor: function() {
          tinymce.init({
            selector:'#externalContext',
            mode : "textareas",
            readonly : true,
            branding: false,
            menubar: false,
            statusbar: false,
            toolbar: false
          });
        },
        initAssessmentTextEditor: function() {
          jQuery('.texteditor-enabled').each(function(i, o) {
            // Init texteditor
            // Get content
            var content = jQuery(o)[0].innerHTML;
            var init = 0;
            jQuery(o).parent().on("DOMSubtreeModified", function(){
              if (init === 1) {
                return false;
              }

              console.log('complete');
              // Init tinymce
              setTimeout(function () {
                tinymce.init({
                  selector: `.textarea-${i}`,
                  mode : "textareas",
                  branding: false,
                  menubar: false,
                  statusbar: false,
                  height: 300,
                });
              }, 100);

              init = 1;
            })

            jQuery(o).parent()
              .append(`<div class="textarea-el"><textarea class="textarea-${i}">${content}</textarea></div>`);
            // find button
            var button = jQuery(o).parents('.col-md-10').next().find('.btn-edit');
            var buttonSave = jQuery(o).parents('.col-md-10').next().find('.btn-save');
            var textarea = jQuery(o).parent().find('.textarea-el');
            function textareaToggle() {
              if(!textarea.is(':visible')) {
                textarea.slideDown();
                jQuery(o).slideUp();
                button.text('Close');
                buttonSave.css({ display: 'block' });
              } else {
                textarea.slideUp();
                jQuery(o).slideDown();
                button.text('Edit');
                buttonSave.hide({ display: 'none' });
              }
            }
            button.click(function(e){
              e.preventDefault();
              textareaToggle();
            });
            buttonSave.click(function(e){
              e.preventDefault();
              // get textarea value
              var id = jQuery(`.textarea-${i}`).attr('id');
              var val = tinyMCE.get(id).getContent()
              // Update content
              jQuery(o).html(val);
              textareaToggle();
            });
          })
        },
        assessmentNextButtons: function() {
          function goToNext(section) {
            jQuery(`#${section} .btn-next`).click(function(e){
              e.preventDefault();
              var nextSection = jQuery(`#${section}`).next().attr('id');
              jQuery(`a[href="#${nextSection}"]`).click();
            });
          }
          goToNext('context');
        },
        showGettingStarted: function() {
          jQuery('#getting-started-btn').click(function(){
            if(jQuery('body').hasClass('on-getting-started')) {
              jQuery('body').removeClass('on-getting-started');
              // hide getting started and show tiles
              jQuery('#getting-started').slideUp();
              jQuery('#tiles').slideDown();
            } else {
              jQuery('body').addClass('on-getting-started');
              jQuery('#getting-started').slideDown();
              jQuery('#tiles').slideUp();
            }
          });
        },
        homeTableToolbar: function() {
          app.filter('type', $('#table-home'), $('#filterType'));
          app.filter('status', $('#table-home'), $('#filterStatus'));
          app.sortSelectInit('status', $('#table-home'), $('#sortColumn'))
        },
        filter: function(field, tableElement, selectElement) {
          selectElement.on('change', function() {
            var value = selectElement.val();
            if (value === "") {
              tableElement.bootstrapTable('filterBy', "");
            } else {
              tableElement.bootstrapTable('filterBy', {
                  [field]: [value]
              });
            }
          });
        },
        sortSelectInit: function(field, tableElement, selectElement) {
          selectElement.on('change', function() {
            var value = selectElement.val();
            if (value === "Inactive") {
              app.sortingField(field, 'desc', tableElement);
            } else {
              app.sortingField(field, 'asc', tableElement);
            }
          });
        },
        sortingField: function(field, order, table) {
          var targetTH = table.find('th[data-field="' + field + '"]');
          var targetTHInner = targetTH.children('.sortable');

          targetTHInner.click();
          setTimeout(function () {
            if (targetTH.data('order') !== order) {
              targetTHInner.click();
            }
          }, 100);
        },
        select2: function() {
            $("select.filterOptions").select2();
            $(".new-select").select2();
        },
        refresh: function(){
            $('#table-home').on('search.bs.table', function(){
                //app.addBlockTable();
                //app.menuToggle();
            });
            $('#table-business').on('search.bs.table', function(){
                //app.addBlockTableBusiness();
                //app.menuToggle();
            });
        },
        hideID: function() {
            $('#table-home').bootstrapTable('hideColumn', 'id');
            $('#table-assets').bootstrapTable('hideColumn', 'id');
            $('#table-threatx').bootstrapTable('hideColumn', 'id');
        },
        menuToggle: function() {
            $('.btn-toggle').on('click', function() {
                $('body').toggleClass('toggle-sidebar');
            });
            // toggle menu
            $('.table-toggle').click(function() {
                $(this).parent().find($('.table-menu-link')).toggleClass('show');
            });
            $('.table-toggle-2').click(function() {
                $(this).parent().find($('.table-menu-link-2')).toggleClass('show');
            });
            if (jQuery(window).width() <= 992) {
                jQuery('.menu-toggle').appendTo('header');
            }
        },
        addActionAsset: function() {
            jQuery('#table-asset td:first-child').append(
                '<span class="action-cell">' +
                '<a href="javascript:void(0)">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editAsset">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editAsset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<input type="text" id="input-asset" class="modal-input-edit" placeholder="ketik kene">' +
                '<button id="updateAsset" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</span>'
            );

            jQuery('#table-asset td:nth-child(3)').append(

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editAssetCriticality">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editAssetCriticality" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<select name="" id="select-assetCriticality" class="modal-select-edit">' +
                '<option value="Vital">Vital</option>' +
                '<option value="High">High</option>' +
                '<option value="Low">Low</option>' +
                '<option value="Significant">Significant</option>' +
                '<option value="Very Low">Very Low</option>' +
                '</select>' +

                '<button id="updateAssetCriticality" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</span>'
            );
        },
        addActionThreat: function() {
            jQuery('#table-threat td:first-child').append(
                '<span class="action-cell">' +
                '<a href="javascript:void(0)">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editThreatActors">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editThreatActors" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<input type="text" id="input-threatActors" class="modal-input-edit" placeholder="ketik kene">' +
                '<button id="updateThreatActors" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '</span>'
            );

            jQuery('#table-threat td:nth-child(2)').append(
                '<span class="action-cell">' +
                '<a href="javascript:void(0)">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editThreatActs">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editThreatActs" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<input type="text" id="input-threatActs" class="modal-input-edit" placeholder="ketik kene">' +
                '<button id="updateThreatActs" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '</span>'
            );
        },
        addActionControl: function() {
            jQuery('#table-control td:first-child').append(
                '</span>' +
                '<span class="action-cell">' +
                '<a href="javascript:void(0)">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editControlCategory">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editControlCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<input type="text" id="input-controlCategory" class="modal-input-edit" placeholder="ketik kene">' +
                '<button id="updateControlCategory" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            jQuery('#table-control td:nth-child(2)').append(
                '</span>' +
                '<span class="action-cell">' +
                '<a href="javascript:void(0)">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +

                '<span class="action-cell">' +
                '<a href="javascript:void(0)" data-toggle="modal" data-target="#editControlSecurity">' +
                '<i class="icon-edit"></i>' +
                '</a>' +

                '<div class="modal fade" id="editControlSecurity" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-sm" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body">' +
                '<input type="text" id="input-controlSecurity" class="modal-input-edit" placeholder="ketik kene">' +
                '<button id="updateControlSecurity" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        },
        deleteRow: function() {
            //table-home still need to change to use .bootstrapTable('removeRow')
            $('#table-home').on('click', '.fa-trash', function() {
                //$(this).parents('tr').remove();
                //console.log($(this).parents('tr').data('index'));
                var index = $(this).parents('tr').data('index');

                //remove row data
                $('#table-home').bootstrapTable('removeRow', {
                    index: index
                });
            });
            //table-asset
            $('#table-asset').on('click', '.icon-trash', function() {
                var index = $(this).parents('tr').data('index');

                //remove row data
                $('#table-asset').bootstrapTable('removeRow', {
                    index: index
                });

                //re-add the action icon
                app.addActionAsset();
            });
            //table-threat
            $('#table-threat').on('click', '.icon-trash', function() {
                var index = $(this).parents('tr').data('index');

                //remove row data
                $('#table-threat').bootstrapTable('removeRow', {
                    index: index
                });

                //re-add the action icon
                app.addActionThreat();
            });
            $('#table-control').on('click', '.icon-trash', function() {
                var index = $(this).parents('tr').data('index');

                //remove row data
                $('#table-control').bootstrapTable('removeRow', {
                    index: index
                });

                //re-add the action icon
                app.addActionControl();
            });
            $('#table-business').on('click', '.fa-trash', function() {
                var index = $(this).parents('tr').data('index');

                //remove row data
                $('#table-business').bootstrapTable('removeRow', {
                    index: index
                });

                //re-add the action icon
                app.addBlockTableBusiness();
                app.menuToggle();

            });
        },
        updateRow: function() {
            $('#table-asset').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateAsset').click(function() {
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            asset: $('#input-asset').val(),
                        }
                    });
                    //remove modal
                    $('#editAsset').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                });
            });
            $('#table-asset').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateAssetCriticality').click(function() {
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            criticality: $('#select-assetCriticality').val(),
                        }
                    });
                    //remove modal
                    $('#editAssetCriticality').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                });
            });

            $('#table-threat').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateThreatActors').click(function() {
                    //update row data from modal box
                    $('#table-threat').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            threat_actors: $('#input-threatActors').val(),
                        }
                    });
                    //remove modal
                    $('#editThreatActors').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionThreat();
                });
            });
            $('#table-threat').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateThreatActs').click(function() {
                    //update row data from modal box
                    $('#table-threat').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            threat_acts: $('#input-threatActs').val(),
                        }
                    });
                    //remove modal
                    $('#editThreatActs').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionThreat();
                });
            });

            $('#table-control').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateControlCategory').click(function() {
                    //update row data from modal box
                    $('#table-control').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            category: $('#input-controlCategory').val(),
                        }
                    });
                    //remove modal
                    $('#editControlCategory').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionControl();
                });
            });
            $('#table-control').on('click', '.icon-edit', function() {
                var index = $(this).parents('tr').data('index');
                $('#updateControlSecurity').click(function() {
                    //update row data from modal box
                    $('#table-control').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            security: $('#input-controlSecurity').val(),
                        }
                    });
                    //remove modal
                    $('#editControlSecurity').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionControl();
                });
            });
            $('#table-business').on('click', '.fa-file-text-o', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateBusiness').click(function(){
                    //update row data from modal box
                    $('#table-business').bootstrapTable('updateRow', {
                        index: index,
                        row: {
                            business_name: $('#edit-business-name').val(),
                            organisation_name: $('#edit-organisation-name').val(),
                            type_entity: $('#edit-type-entity').find(':selected').text(),
                            business_status: $('#edit-business-status').find(':selected').text(),
                        }
                    });
                    //remove modal
                    $('#editBusiness').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    //app.addBlockTableBusiness();
                    //app.menuToggle();
                });
            });
        },
        addBlockTableUsers: function() {
            jQuery('#table-users td:last-child').append('<div class="table-menu">' +
                '<a href="#0" class="table-toggle"><i class="icon-options-vertical"></i></a>' +
                '<div class="table-menu-link">' +
                '<span class="">' +
                '<a href="#">' +
                '<i class="icon-user"></i>' +
                '</a>' +
                '</span>' +
                '<span class="">' +
                '<a href="#">' +
                '<i class="icon-reload"></i>' +
                '</a>' +
                '</span>' +
                '<span class="">' +
                '<a href="#">' +
                '<i class="icon-list"></i>' +
                '</a>' +
                '</span>' +
                '<span class="">' +
                '<a href="#">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>' +
                '</div>' +
                '</div>'
            );
            var $table = $('#table-users'),
                $ok = $('#ok');
            $(function() {
                $ok.click(function() {
                    $table.bootstrapTable('refresh');
                });
            });

            function queryParams() {
                var params = {};
                $('#toolbar').find('input[name]').each(function() {
                    params[$(this).attr('name')] = $(this).val();
                });
                return params;
            }

            function responseHandler(res) {
                return res.rows;
            }

        },

        owlSlider: function() {
            $(document).ready(function() {
                $(".owl-carousel").owlCarousel({
                    items: 1,
                    merge: true,
                    loop: true,
                    margin: 10,
                    video: true,
                    lazyLoad: true,
                    center: true,
                    dots: true,
                });
            });
        },

        menuToggleEachRow: function() {
            function actionFormatter(value, row, index) {
                return [
                    '<div class="table-menu">' +
                    '<a href="#0" class="table-toggle"><i class="icon-options-vertical"></i></a>' +
                    '<div class="table-menu-link">' +
                    '<span class="">' +
                    '<a href="#">' +
                    '<i class="icon-user"></i>' +
                    '</a>' +
                    '</span>' +
                    '<span class="">' +
                    '<a href="#">' +
                    '<i class="icon-reload"></i>' +
                    '</a>' +
                    '</span>' +
                    '<span class="">' +
                    '<a href="#">' +
                    '<i class="icon-list"></i>' +
                    '</a>' +
                    '</span>' +
                    '<span class="">' +
                    '<a href="#">' +
                    '<i class="icon-trash"></i>' +
                    '</a>' +
                    '</span>' +
                    '</div>' +
                    '</div>'

                ].join('');
            }

            window.actionEvents = {
                'click .table-menu': function(e) {
                    $('.table-toggle').click(function(e) {
                        $('.table-menu-link').removeClass('show');
                        $(this).parent().find($('.table-menu-link')).toggleClass('show');
                    });
                },
            };
        },

    };

    // This code will initialize your whole function in this JS file
    $(function() {
        app.init($);
    });


    $(window).resize(function() {
        // Insert your JS function here that need to triggered when window resize
        // app.scrollToFixed();
    });



});

function actionFormatter(value, row, index) {
  var HTML = jQuery('.table-menu')[0].outerHTML;
  return HTML;
}

function actionFormatterBusiness(value, row, index) {
    return [
        '<div class="table-menu">' +
        '<a href="#0" class="table-toggle-2"><i class="icon-options-vertical"></i></a>' +
        '<div class="table-menu-link-2">' +
        '<span class="">' +
        '<a href="#">' +
        '<i class="fa fa-user"></i>' +
        '</a>' +
        '</span>' +
        '<span class="">' +
        '<a href="#">' +
        '<i class="fa fa-undo"></i>' +
        '</a>' +
        '</span>' +
        '<span class="">' +
        '<a href="#" data-toggle="modal" data-target="#editBusiness">' +
        '<i class="fa fa-file-text-o"></i>' +
        '</a>' +
        //modal edit
        '<div class="modal fade" id="editBusiness" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '<div class="modal-body">' +

        '<div class="row title-modal-business">' +
            '<div class="col-md-12">Edit Business</div>' +
        '</div>' +
        '<div class="row content-modal-business">' +
            '<div class="col-md-12">' +
                '<input type="text" id="edit-business-name" class="input-modal" placeholder="Business Name">' +
            '</div>' +
            '<div class="col-md-12">' +
                '<input type="text" id="edit-organisation-name" class="input-modal" placeholder="Organisation">' +
            '</div>' +
            '<div class="col-md-12">' +
                '<select name="" id="edit-type-entity" class="select-modal">' +
                    '<option disabled selected value>Select Entity</option>' +
                    '<option value="">Business Unit</option>' +
                    '<option value="">Assessment</option>' +
                    '<option value="">User</option>' +
                '</select>' +
            '</div>' +
            '<div class="col-md-12">' +
                '<select name="" id="edit-business-status" class="select-modal">' +
                    '<option disabled selected value>Select Status</option>' +
                    '<option value="">Active</option>' +
                    '<option value="">Inactive</option>' +
                '</select>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-12 pull-right">' +
                '<button class="btn btn-primary btn-sm cancel-modal" type="submit">Cancel</button>' +
                '<button id="updateBusiness" class="btn btn-primary btn-sm save-modal" type="submit">Save</button>' +
            '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        //end modal edit
        '</span>' +
        '<span class="">' +
        '<a href="#">' +
        '<i class="fa fa-trash"></i>' +
        '</a>' +
        '</span>' +
        '</div>' +
        '</div>'
    ].join('');
}

window.actionEvents = {
    'click .table-menu': function(e) {
        $('.table-toggle').click(function(e) {
            $('.table-menu-link').removeClass('show');
            $(this).parent().find($('.table-menu-link')).toggleClass('show');
        });
    },
};
