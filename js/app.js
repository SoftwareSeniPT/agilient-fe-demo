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
            app.addBlockTable();
            app.addBlockTableBusiness();
            app.addBlockTableUsers();
            app.menuToggle();
            app.owlSlider();
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
