(function(e) {
    e(window.jQuery, window, document);
})(function($, window, document) {

    var datamu = {
                    id: 20,
                    name: 'ItemKU',
                    price: '$99'
                }
    var app = {

        // ==============================================================================================
        // Call your function here to become a single function
        // * This method make your code more modular and make it easy to toggle your function
        // * If you want to disable a function, just commented on function that you need to disable below
        // ==============================================================================================

        init: function($) {
            app.addBlockTable();
            app.addBlockTableBusiness();
            app.addBlockTableUsers();
            app.menuToggle();
            app.owlSlider();
            app.deleteRow();
            app.loadkopet();
            app.addActionAsset();
            app.cekIndex();
            app.updateRow();
            //app.insertRow();
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
        deleteRow: function() {
            $('#table-home').on('click', '.icon-trash', function(){
                $(this).parents('tr').remove();
                console.log($(this).parents('tr').data('index'));
            });

            $('#table-asset').on('click', '.icon-trash', function(){
                var index = $(this).parents('tr').data('index');
                
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('remove', {field: index, row: {
                        asset: $('#input-modal').val(),
                    }});
                    //remove modal
                    $('#editModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                
            });
        },
        cekIndex: function() {
            $('#table-asset').on('click', '.icon-trash',function() {
                console.log($(this).parents('tr').data('index'));
                //console.log($(this).parents('tr').html());
                //console.log($(this).parents('td').html());
            });
        },
        addActionAsset: function() {
            jQuery('#table-asset td:first-child').append(
                '<span class="action-cell">' +
                '<a href="#" data-toggle="modal" data-target="#editModal">' +
                '<i class="icon-list"></i>' +
                '</a>' +

                '<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog modal-sm" role="document">' +        
                        '<div class="modal-content">'   +     
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '<div class="modal-body">' +
                                '<input type="text" id="input-modal" placeholder="ketik kene">' +
                                '<button id="updateAsset" class="btn btn-primary btn-sm save-modal" data-dismiss="modal" type="submit">Save</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                                         
                '</span>' +
                '<span class="action-cell">' +
                '<a href="#">' +
                '<i class="icon-trash"></i>' +
                '</a>' +
                '</span>'
            );
        },
        updateRow: function() {
            $('#table-asset').on('click', '.icon-list', function(){
                var index = $(this).parents('tr').data('index');
                $('#updateAsset').click(function(){
                    //update row data from modal box
                    $('#table-asset').bootstrapTable('updateRow', {index: index, row: {
                        asset: $('#input-modal').val(),
                    }});
                    //remove modal
                    $('#editModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //re-add the action icon
                    app.addActionAsset();
                });
            })
            
        },
        loadkopet: function() {
             $('#tableku').bootstrapTable({
                columns: [{
                    field: 'id',
                    title: 'Item ID'
                }, {
                    field: 'name',
                    title: 'Item Name'
                }, {
                    field: 'price',
                    title: 'Item Price'
                }],
                data: [{
                    id: 1,
                    name: 'Item 1',
                    price: '$1'
                }, {
                    id: 2,
                    name: 'Item 2',
                    price: '$2'
                }]
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


            
            $('#insert').click(function(){
                $('#tableku').bootstrapTable('insertRow', {index: 1, row: datamu});
            });

            
            

    $(window).resize(function() {
        // Insert your JS function here that need to triggered when window resize
        // app.scrollToFixed();
    });


});
