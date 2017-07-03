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
            // app.addBlockTable();
            app.addBlockTableBusiness();
            app.addBlockTableUsers();
            app.menuToggle();
            app.owlSlider();
            app.addActionAsset();
            app.addActionThreat();
            app.addActionControl();
            app.deleteRow();
            app.updateRow();
        },

        // ======================================================================
        // Your function here
        // * Don't forget to use proper function name to describes your function
        // ======================================================================
        menuToggle: function() {
            $('.btn-toggle').on('click', function() {
                $('body').toggleClass('toggle-sidebar');
            });
            // toggle menu
            $('.table-toggle').click(function() {
                $(this).parent().find($('.table-menu-link')).toggleClass('show');
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
                        '<div class="modal-content">'   +     
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
                        '<div class="modal-content">'   +     
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
                        '<div class="modal-content">'   +     
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
                        '<div class="modal-content">'   +     
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
                        '<div class="modal-content">'   +     
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
                        '<div class="modal-content">'   +     
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
            $('#table-home').on('click', '.icon-trash', function(){
                $(this).parents('tr').remove();
                console.log($(this).parents('tr').data('index'));
            });
            //table-asset
            $('#table-asset').on('click', '.icon-trash', function(){
                var index = $(this).parents('tr').data('index');
                    
                    //remove row data
                    $('#table-asset').bootstrapTable('removeRow', {index: index});
                    
                    //re-add the action icon
                    app.addActionAsset();
                
            });
            //table-threat
            $('#table-threat').on('click', '.icon-trash', function(){
                var index = $(this).parents('tr').data('index');
                    
                    //remove row data
                    $('#table-threat').bootstrapTable('removeRow', {index: index});
                    
                    //re-add the action icon
                    app.addActionThreat();
                
            });
            $('#table-control').on('click', '.icon-trash', function(){
                var index = $(this).parents('tr').data('index');
                    
                    //remove row data
                    $('#table-control').bootstrapTable('removeRow', {index: index});
                    
                    //re-add the action icon
                    app.addActionControl();
                
            });
        },
        updateRow: function() {
            $('#table-asset').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateAsset').click(function(){
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('updateRow', {index: index, row: {
                        asset: $('#input-asset').val(),
                    }});
                    //remove modal
                    $('#editAsset').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                });
            });
            $('#table-asset').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateAssetCriticality').click(function(){
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('updateRow', {index: index, row: {
                        criticality: $('#select-assetCriticality').val(),
                    }});
                    //remove modal
                    $('#editAssetCriticality').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                });
            });

            $('#table-threat').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateThreatActors').click(function(){
                    //update row data from modal box
                    $('#table-threat').bootstrapTable('updateRow', {index: index, row: {
                        threat_actors: $('#input-threatActors').val(),
                    }});
                    //remove modal
                    $('#editThreatActors').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionThreat();
                });
            });
            $('#table-threat').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateThreatActs').click(function(){
                    //update row data from modal box
                    $('#table-threat').bootstrapTable('updateRow', {index: index, row: {
                        threat_acts: $('#input-threatActs').val(),
                    }});
                    //remove modal
                    $('#editThreatActs').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionThreat();
                });
            });

            $('#table-control').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateControlCategory').click(function(){
                    //update row data from modal box
                    $('#table-control').bootstrapTable('updateRow', {index: index, row: {
                        category: $('#input-controlCategory').val(),
                    }});
                    //remove modal
                    $('#editControlCategory').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionControl();
                });
            });
            $('#table-control').on('click', '.icon-edit', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateControlSecurity').click(function(){
                    //update row data from modal box
                    $('#table-control').bootstrapTable('updateRow', {index: index, row: {
                        security: $('#input-controlSecurity').val(),
                    }});
                    //remove modal
                    $('#editControlSecurity').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionControl();
                });
            });
        },
        addBlockTable: function() {
            jQuery('#table-home td:last-child').append('<div class="table-menu">' +
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

            var $table = $('#table-home'),
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
        addBlockTableBusiness: function() {
            jQuery('#table-business td:last-child').append('<div class="table-menu">' +
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
            var $table = $('#table-business'),
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