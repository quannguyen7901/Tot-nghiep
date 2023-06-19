/* ------------------------------------------------------------------------------
*
*  # Template JS core
*
*  Core JS file with default functionality configuration
*
*  Version: 1.2
*  Latest update: Dec 11, 2015
*
* ---------------------------------------------------------------------------- */


// Allow CSS transitions when page is loaded
$(window).on('load', function() {
    $('body').removeClass('no-transitions');
});


$(function() {

    // Disable CSS transitions on page load
    $('body').addClass('no-transitions');



    // ========================================
    //
    // Content area height
    //
    // ========================================


    // Calculate min height
    function containerHeight() {
        var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight();

        $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
    }

    // Initialize
    containerHeight();




    // ========================================
    //
    // Heading elements
    //
    // ========================================


    // Heading elements toggler
    // -------------------------

    // Add control button toggler to page and panel headers if have heading elements
    $('.panel-footer').has('> .heading-elements:not(.not-collapsible)').prepend('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
    $('.page-title, .panel-title').parent().has('> .heading-elements:not(.not-collapsible)').children('.page-title, .panel-title').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');


    // Toggle visible state of heading elements
    $('.page-title .heading-elements-toggle, .panel-title .heading-elements-toggle').on('click', function() {
        $(this).parent().parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
    });
    $('.panel-footer .heading-elements-toggle').on('click', function() {
        $(this).parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
    });



    // Breadcrumb elements toggler
    // -------------------------

    // Add control button toggler to breadcrumbs if has elements
    $('.breadcrumb-line').has('.breadcrumb-elements').prepend('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>');


    // Toggle visible state of breadcrumb elements
    $('.breadcrumb-elements-toggle').on('click', function() {
        $(this).parent().children('.breadcrumb-elements').toggleClass('visible-elements');
    });




    // ========================================
    //
    // Navbar
    //
    // ========================================


    // Navbar navigation
    // -------------------------

    // Prevent dropdown from closing on click
    $(document).on('click', '.dropdown-content', function (e) {
        e.stopPropagation();
    });

    // Disabled links
    $('.navbar-nav .disabled a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // Show tabs inside dropdowns
    $('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
        $(this).tab('show');
    });




    // ========================================
    //
    // Element controls
    //
    // ========================================


    // Reload elements
    // -------------------------

    // Panels
    $('.panel [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent().parent();
        $(block).block({ 
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none'
            }
        });

        // For demo purposes
        window.setTimeout(function () {
           $(block).unblock();
        }, 2000); 
    });


    // Sidebar categories
    $('.category-title [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent();
        $(block).block({ 
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#000',
                opacity: 0.5,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #000'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none',
                color: '#fff'
            }
        });

        // For demo purposes
        window.setTimeout(function () {
           $(block).unblock();
        }, 2000); 
    }); 


    // Light sidebar categories
    $('.sidebar-default .category-title [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent();
        $(block).block({ 
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none'
            }
        });

        // For demo purposes
        window.setTimeout(function () {
           $(block).unblock();
        }, 2000); 
    }); 



    // Collapse elements
    // -------------------------

    //
    // Sidebar categories
    //

    // Hide if collapsed by default
    $('.category-collapsed').children('.category-content').hide();


    // Rotate icon if collapsed by default
    $('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180');


    // Collapse on click
    $('.category-title [data-action=collapse]').click(function (e) {
        e.preventDefault();
        var $categoryCollapse = $(this).parent().parent().parent().nextAll();
        $(this).parents('.category-title').toggleClass('category-collapsed');
        $(this).toggleClass('rotate-180');

        containerHeight(); // adjust page height

        $categoryCollapse.slideToggle(150);
    });


    //
    // Panels
    //

    // Hide if collapsed by default
    $('.panel-collapsed').children('.panel-heading').nextAll().hide();


    // Rotate icon if collapsed by default
    $('.panel-collapsed').find('[data-action=collapse]').addClass('rotate-180');


    // Collapse on click
    $('.panel [data-action=collapse]').click(function (e) {
        e.preventDefault();
        var $panelCollapse = $(this).parent().parent().parent().parent().nextAll();
        $(this).parents('.panel').toggleClass('panel-collapsed');
        $(this).toggleClass('rotate-180');

        containerHeight(); // recalculate page height

        $panelCollapse.slideToggle(150);
    });



    // Remove elements
    // -------------------------

    // Panels
    $('.panel [data-action=close]').click(function (e) {
        e.preventDefault();
        var $panelClose = $(this).parent().parent().parent().parent().parent();

        containerHeight(); // recalculate page height

        $panelClose.slideUp(150, function() {
            $(this).remove();
        });
    });


    // Sidebar categories
    $('.category-title [data-action=close]').click(function (e) {
        e.preventDefault();
        var $categoryClose = $(this).parent().parent().parent().parent();

        containerHeight(); // recalculate page height

        $categoryClose.slideUp(150, function() {
            $(this).remove();
        });
    });




    // ========================================
    //
    // Main navigation
    //
    // ========================================


    // Main navigation
    // -------------------------

    // Add 'active' class to parent list item in all levels
    $('.navigation').find('li.active').parents('li').addClass('active');

    // Hide all nested lists
    $('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');

    // Highlight children links
    $('.navigation').find('li').has('ul').children('a').addClass('has-ul');

    // Add active state to all dropdown parent levels
    $('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active');

    

    // Main navigation tooltips positioning
    // -------------------------

    // Left sidebar
    $('.navigation-main > .navigation-header > i').tooltip({
        placement: 'right',
        container: 'body'
    });



    // Collapsible functionality
    // -------------------------

    // Main navigation
    $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();

        // Collapsible
        $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

        // Accordion
        if ($('.navigation-main').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
        }
    });

        
    // Alternate navigation
    $('.navigation-alt').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();

        // Collapsible
        $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(200);

        // Accordion
        if ($('.navigation-alt').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(200);
        }
    }); 




    // ========================================
    //
    // Sidebars
    //
    // ========================================


    // Mini sidebar
    // -------------------------

    // Toggle mini sidebar
    $('.sidebar-main-toggle').on('click', function (e) {
        e.preventDefault();

        // Toggle min sidebar class
        $('body').toggleClass('sidebar-xs');
    });



    // Sidebar controls
    // -------------------------

    // Disable click in disabled navigation items
    $(document).on('click', '.navigation .disabled a', function (e) {
        e.preventDefault();
    });


    // Adjust page height on sidebar control button click
    $(document).on('click', '.sidebar-control', function (e) {
        containerHeight();
    });


    // Hide main sidebar in Dual Sidebar
    $(document).on('click', '.sidebar-main-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-main-hidden');
    });


    // Toggle second sidebar in Dual Sidebar
    $(document).on('click', '.sidebar-secondary-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-secondary-hidden');
    });


    // Hide detached sidebar
    $(document).on('click', '.sidebar-detached-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-detached-hidden');
    });


    // Hide all sidebars
    $(document).on('click', '.sidebar-all-hide', function (e) {
        e.preventDefault();

        $('body').toggleClass('sidebar-all-hidden');
    });



    //
    // Opposite sidebar
    //

    // Collapse main sidebar if opposite sidebar is visible
    $(document).on('click', '.sidebar-opposite-toggle', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');

        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Make main sidebar mini
            $('body').addClass('sidebar-xs');

            // Hide children lists
            $('.navigation-main').children('li').children('ul').css('display', '');
        }
        else {

            // Make main sidebar default
            $('body').removeClass('sidebar-xs');
        }
    });


    // Hide main sidebar if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-main-hide', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');
        
        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Hide main sidebar
            $('body').addClass('sidebar-main-hidden');
        }
        else {

            // Show main sidebar
            $('body').removeClass('sidebar-main-hidden');
        }
    });


    // Hide secondary sidebar if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-secondary-hide', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');

        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Hide secondary
            $('body').addClass('sidebar-secondary-hidden');

        }
        else {

            // Show secondary
            $('body').removeClass('sidebar-secondary-hidden');
        }
    });


    // Hide all sidebars if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-hide', function (e) {
        e.preventDefault();

        // Toggle sidebars visibility
        $('body').toggleClass('sidebar-all-hidden');

        // If hidden
        if ($('body').hasClass('sidebar-all-hidden')) {

            // Show opposite
            $('body').addClass('sidebar-opposite-visible');

            // Hide children lists
            $('.navigation-main').children('li').children('ul').css('display', '');
        }
        else {

            // Hide opposite
            $('body').removeClass('sidebar-opposite-visible');
        }
    });


    // Keep the width of the main sidebar if opposite sidebar is visible
    $(document).on('click', '.sidebar-opposite-fix', function (e) {
        e.preventDefault();

        // Toggle opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');
    });



    // Mobile sidebar controls
    // -------------------------

    // Toggle main sidebar
    $('.sidebar-mobile-main-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached');
    });


    // Toggle secondary sidebar
    $('.sidebar-mobile-secondary-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-secondary').removeClass('sidebar-mobile-main sidebar-mobile-opposite sidebar-mobile-detached');
    });


    // Toggle opposite sidebar
    $('.sidebar-mobile-opposite-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-opposite').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached');
    });


    // Toggle detached sidebar
    $('.sidebar-mobile-detached-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-detached').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-opposite');
    });



    // Mobile sidebar setup
    // -------------------------

    $(window).on('resize', function() {
        setTimeout(function() {
            containerHeight();
            
            if($(window).width() <= 768) {

                // Add mini sidebar indicator
                $('body').addClass('sidebar-xs-indicator');

                // Place right sidebar before content
                $('.sidebar-opposite').insertBefore('.content-wrapper');

                // Place detached sidebar before content
                $('.sidebar-detached').insertBefore('.content-wrapper');

                // Add mouse events for dropdown submenus
                $('.dropdown-submenu').on('mouseenter', function() {
                    $(this).children('.dropdown-menu').addClass('show');
                }).on('mouseleave', function() {
                    $(this).children('.dropdown-menu').removeClass('show');
                });
            }
            else {

                // Remove mini sidebar indicator
                $('body').removeClass('sidebar-xs-indicator');

                // Revert back right sidebar
                $('.sidebar-opposite').insertAfter('.content-wrapper');

                // Remove all mobile sidebar classes
                $('body').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached sidebar-mobile-opposite');

                // Revert left detached position
                if($('body').hasClass('has-detached-left')) {
                    $('.sidebar-detached').insertBefore('.container-detached');
                }

                // Revert right detached position
                else if($('body').hasClass('has-detached-right')) {
                    $('.sidebar-detached').insertAfter('.container-detached');
                }

                // Remove visibility of heading elements on desktop
                $('.page-header-content, .panel-heading, .panel-footer').removeClass('has-visible-elements');
                $('.heading-elements').removeClass('visible-elements');

                // Disable appearance of dropdown submenus
                $('.dropdown-submenu').children('.dropdown-menu').removeClass('show');
            }
        }, 100);
    }).resize();




    // ========================================
    //
    // Other code
    //
    // ========================================


    // Plugins
    // -------------------------

    // Popover
    $('[data-popup="popover"]').popover();


    // Tooltip
    $('[data-popup="tooltip"]').tooltip();
    /* ------------------------------------------------------------------------------
*
*  # Modal dialogs and extensions
*
*  Specific JS code additions for components_modals.html page
*
*  Version: 1.1
*  Latest update: Jul 5, 2016
*
* ---------------------------------------------------------------------------- */

$(function() {


    // Basic modals
    // ------------------------------

    // Load remote content
    $('#modal_remote').on('show.bs.modal', function() {
        $(this).find('.modal-body').load('assets/demo_data/wizard/education.html', function() {

            // Init Select2 when loaded
            $('.select').select2({
                minimumResultsForSearch: Infinity
            });
        });
    });


    // Bootbox extension
    // ------------------------------

    // Alert dialog
    $('#alert').on('click', function() {
        bootbox.alert("Native alert dialog has been replaced with Bootbox alert box.");
    });

    // Confirmation dialog
    $('#confirm').on('click', function() {
        bootbox.confirm("Native confirm dialog has been replaced with Bootbox confirm box.", function(result) {
            bootbox.alert("Confirm result: " + result)
        });
    });

    // Prompt dialog
    $('#prompt').on('click', function() {
        bootbox.prompt("Please enter your name", function(result) {
            if (result === null) {                                             
                bootbox.alert("Prompt dismissed");                              
            } else {
                bootbox.alert("Hi <b>"+result+"</b>");                          
            }
        });
    });

    // Prompt dialog with default value
    $('#prompt_value').on('click', function() {
        bootbox.prompt({
            title: "What is your real name?",
            value: "Eugene Kopyov",
            callback: function(result) {
                if (result === null) {
                    bootbox.alert("Prompt dismissed");
                }
                else {
                    bootbox.alert("Hi, <b>"+result+"</b>");
                }
            }
        });
    });

    // Custom bootbox dialog
    $('#bootbox_custom').on('click', function() {
        bootbox.dialog({
            message: "I am a custom dialog",
            title: "Custom title",
            buttons: {
                success: {
                    label: "Success!",
                    className: "btn-success",
                    callback: function() {
                        bootbox.alert("great success");
                    }
                },
                danger: {
                    label: "Danger!",
                    className: "btn-danger",
                    callback: function() {
                        bootbox.alert("uh oh, look out!");
                    }
                },
                main: {
                    label: "Click ME!",
                    className: "btn-primary",
                    callback: function() {
                        bootbox.alert("Primary button");
                    }
                }
            }
        });
    });

    // Custom bootbox dialog with form
    $('#bootbox_form').on('click', function() {
        bootbox.dialog({
                title: "This is a form in a modal.",
                message: '<div class="row">  ' +
                    '<div class="col-md-12">' +
                        '<form class="form-horizontal">' +
                            '<div class="form-group">' +
                                '<label class="col-md-4 control-label">Name</label>' +
                                '<div class="col-md-8">' +
                                    '<input id="name" name="name" type="text" placeholder="Your name" class="form-control">' +
                                    '<span class="help-block">Here goes your name</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label class="col-md-4 control-label">How awesome is this?</label>' +
                                '<div class="col-md-8">' +
                                    '<div class="radio">' +
                                        '<label>' +
                                            '<input type="radio" name="awesomeness" id="awesomeness-0" value="Really awesome" checked="checked">' +
                                            'Really awesomeness' +
                                        '</label>' +
                                    '</div>' +
                                    '<div class="radio">' +
                                        '<label>' +
                                            '<input type="radio" name="awesomeness" id="awesomeness-1" value="Super awesome">' +
                                            'Super awesome' +
                                        '</label>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</form>' +
                    '</div>' +
                    '</div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                            var answer = $("input[name='awesomeness']:checked").val()
                            bootbox.alert("Hello " + name + ". You've chosen <b>" + answer + "</b>");
                        }
                    }
                }
            }
        );
    });


    // Modal callbacks
    // ------------------------------

    // onShow callback
    $('#onshow_callback').on('click', function() {
        $('#modal_default').on('show.bs.modal', function() {
            alert('onShow callback fired.')
        });
    });

    // onShown callback
    $('#onshown_callback').on('click', function() {
        $('#modal_form_vertical').on('shown.bs.modal', function() {
            alert('onShown callback fired.')
        });
    });

    // onHide callback
    $('#onhide_callback').on('click', function() {
        $('#modal_subtitle').on('hide.bs.modal', function() {
            alert('onHide callback fired.')
        });
    });

    // onHidden callback
    $('#onhidden_callback').on('click', function() {
        $('#modal_theme_success').on('hidden.bs.modal', function() {
            alert('onHidden callback fired.')
        });
    });
    

    // Sweet Alert extension
    // ------------------------------

    // Basic
    $('#sweet_basic').on('click', function() {
        swal({
            title: "Here's a message!",
            confirmButtonColor: "#2196F3"
        });
    });

    // With title
    $('#sweet_title_text').on('click', function() {
        swal({
            title: "Here's a message!",
            text: "It's pretty, isn't it?",
            confirmButtonColor: "#2196F3"
        });
    });

    // Auto closing
    $('#sweet_auto_closer').on('click', function() {
        swal({
            title: "Auto close alert!",
            text: "I will close in 2 seconds.",
            confirmButtonColor: "#2196F3",
            timer: 2000
        });
    });

    // HTML message
    $('#sweet_html').on('click', function() {
        swal({
            title: "HTML <small>small subtitle</small>",
            text: "A custom <span style='color:#F8BB86'>html<span> message.",
            html: true,
            confirmButtonColor: "#2196F3"
        });
    });

    // Prompt
    $('#sweet_prompt').on('click', function() {
        swal({
            title: "An input!",
            text: "Write something interesting:",
            type: "input",
            showCancelButton: true,
            confirmButtonColor: "#2196F3",
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
        },
        function(inputValue){
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            swal({
                title: "Nice!",
                text: "You wrote: " + inputValue,
                type: "success",
                confirmButtonColor: "#2196F3"
            });
        });
    });

    // AJAX loader
    $('#sweet_loader').on('click', function() {
        swal({
            title: "Ajax request example",
            text: "Submit to run ajax request",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonColor: "#2196F3",
            showLoaderOnConfirm: true
        },
        function() {
            setTimeout(function() {
                swal({
                    title: "Ajax request finished!",
                    confirmButtonColor: "#2196F3"
                });
            }, 2000);
        });
    });


    //
    // Contextual alerts
    //
    
    // Success alert
    $('#sweet_success').on('click', function() {
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            confirmButtonColor: "#66BB6A",
            type: "success"
        });
    });

    // Error alert
    $('#sweet_error').on('click', function() {
        swal({
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#EF5350",
            type: "error"
        });
    });

    // Warning alert
    $('#sweet_warning').on('click', function() {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF7043",
            confirmButtonText: "Yes, delete it!"
        });
    });

    // Info alert
    $('#sweet_info').on('click', function() {
        swal({
            title: "For your information",
            text: "This is some sort of a custom alert",
            confirmButtonColor: "#2196F3",
            type: "info"
        });
    });

    // Alert combination
    $('#sweet_combine').on('click', function() {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF5350",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel pls!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
                swal({
                    title: "Deleted!",
                    text: "Your imaginary file has been deleted.",
                    confirmButtonColor: "#66BB6A",
                    type: "success"
                });
            }
            else {
                swal({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    confirmButtonColor: "#2196F3",
                    type: "error"
                });
            }
        });
    });
});


});
$(function() {


    // Basic examples
    // ------------------------------

    // Default initialization
    $('.select').select2({
        minimumResultsForSearch: Infinity
    });


    // Select with search
    $('.select-search').select2();


    // Fixed width. Single select
    $('.select-fixed-single').select2({
        minimumResultsForSearch: Infinity,
        width: 250
    });


    // Fixed width. Multiple selects
    $('.select-fixed-multiple').select2({
        minimumResultsForSearch: Infinity,
        width: 400
    });



    // Styling options
    // ------------------------------

    // Custom results color
    $('.select-results-color').select2({
        containerCssClass: 'bg-teal-400'
    });


    // Custom menu color
    $('.select-menu-color').select2({
        dropdownCssClass: 'bg-teal-400'
    });


    // Custom menu and results color
    $('.select-custom-colors').select2({
        containerCssClass: 'bg-indigo-400',
        dropdownCssClass: 'bg-indigo-400'
    });


    // Combine custom colors in multiple
    $('.select-menu2-color').select2({
        containerCssClass: 'bg-indigo-400',
        dropdownCssClass: 'bg-indigo-400'
    });

    // Menu border and text color
    $('.select-border-color').select2({
        dropdownCssClass: 'border-primary',
        containerCssClass: 'border-primary text-primary-700'
    });



    // Sizing options
    // ------------------------------

    // Large
    $('.select-size-lg').select2({
        containerCssClass: 'select-lg'
    });


    // Small
    $('.select-size-sm').select2({
        containerCssClass: 'select-sm'
    });


    // Mini
    $('.select-size-xs').select2({
        containerCssClass: 'select-xs'
    });



    // Advanced examples
    // ------------------------------

    // Minimum input length
    $(".select-minimum").select2({
        minimumInputLength: 2,
        minimumResultsForSearch: Infinity
    });


    // Allow clear selection
    $('.select-clear').select2({
        placeholder: "Select a State",
        allowClear: true
    });


    // Tagging support
    $(".select-multiple-tags").select2({
        tags: true
    });


    // Maximum input length
    $(".select-multiple-maximum-length").select2({
        tags: true,
        maximumInputLength: 5
    });


    // Tokenization
    $(".select-multiple-tokenization").select2({
        tags: true,
        tokenSeparators: [",", " "]
    });


    // Maximum selection
    $(".select-multiple-limited").select2({
        maximumSelectionLength: 3
    });


    // Maximum selections allowed
    $('.select-multiple-maximum').select2({
        maximumSelectionSize: 3
    });



    //
    // Drag and drop selected items
    //

    // Initialize with tags
    $(".select-multiple-drag").select2({
        containerCssClass: 'sortable-target'
    });

    // Add jQuery UI Sortable support
    $(".sortable-target .select2-selection__rendered").sortable({
        containment: '.sortable-target',
        items: '.select2-selection__choice:not(.select2-search--inline)'
    });



    //
    // Single select with icons
    //

    // Format icon
    function iconFormat(icon) {
        var originalOption = icon.element;
        if (!icon.id) { return icon.text; }
        var $icon = "<i class='icon-" + $(icon.element).data('icon') + "'></i>" + icon.text;

        return $icon;
    }

    // Initialize with options
    $(".select-icons").select2({
        templateResult: iconFormat,
        minimumResultsForSearch: Infinity,
        templateSelection: iconFormat,
        escapeMarkup: function(m) { return m; }
    });



    //
    // Customize matched results
    //

    // Setup matcher
    function matchStart (term, text) {
        if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
            return true;
        }

        return false;
    }

    // Initialize
    $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
        $(".select-matched-customize").select2({
            minimumResultsForSearch: Infinity,
            placeholder: "Select a State",
            matcher: oldMatcher(matchStart)
        });
    });



    //
    // Loading arrays of data
    //

    // Data
    var array_data = [
        {id: 0, text: 'enhancement'},
        {id: 1, text: 'bug'},
        {id: 2, text: 'duplicate'},
        {id: 3, text: 'invalid'},
        {id: 4, text: 'wontfix'}
    ];

    // Loading array data
    $(".select-data-array").select2({
        placeholder: "Click to load data",
        minimumResultsForSearch: Infinity,
        data: array_data
    });



    //
    // Loading remote data
    //

    // Format displayed data
    function formatRepo (repo) {
        if (repo.loading) return repo.text;

        var markup = "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

        if (repo.description) {
            markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
        }

        markup += "<div class='select2-result-repository__statistics'>" +
            "<div class='select2-result-repository__forks'>" + repo.forks_count + " Forks</div>" +
            "<div class='select2-result-repository__stargazers'>" + repo.stargazers_count + " Stars</div>" +
            "<div class='select2-result-repository__watchers'>" + repo.watchers_count + " Watchers</div>" +
            "</div>" +
            "</div></div>";

        return markup;
    }

    // Format selection
    function formatRepoSelection (repo) {
        return repo.full_name || repo.text;
    }

    // Initialize
    $(".select-remote-data").select2({
        ajax: {
            url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {

                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });



    //
    // Programmatic access (single)
    //

    // Set/get value
    $('.select-access-value').select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Select State..."
    });
    $(".access-get").click(function () { alert("Selected value is: "+$(".select-access-value").val()); });
    $(".access-set").click(function () { $(".select-access-value").val("CA").trigger("change"); });


    // Open/close menu
    $('.select-access-open').select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Select State..."
    });
    $(".access-open").click(function () { $(".select-access-open").select2("open"); });
    $(".access-close").click(function () { $(".select-access-open").select2("close"); });


    // Enable/disable menu
    $('.select-access-enable').select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Select State..."
    });
    $(".access-disable").click(function () { $(".select-access-enable").prop("disabled", true); });
    $(".access-enable").click(function () { $(".select-access-enable").prop("disabled", false); });


    // Destroy/create menu
    function create_menu() {
        $('.select-access-create').select2({
            minimumResultsForSearch: Infinity,
            placeholder: "Select State..."
        });
    }
    create_menu();
    $(".access-create").on("click", function () { return create_menu()});
    $(".access-destroy").on("click", function () { $('.select-access-create').select2("destroy"); });



    //
    // Programmatic access (multiple)
    //

    // Reacting to external value changes
    $(".select-access-multiple-value").select2();
    $(".change-to-ca").click(function() { $(".select-access-multiple-value").val("CA").trigger("change"); });
    $(".change-to-ak-co").click(function() { $(".select-access-multiple-value").val(["AK","CO"]).trigger("change"); });


    // Open/close menu
    $('.select-access-multiple-open').select2({
        minimumResultsForSearch: Infinity
    });
    $(".access-multiple-open").click(function () { $(".select-access-multiple-open").select2("open"); });
    $(".access-multiple-close").click(function () { $(".select-access-multiple-open").select2("close"); });


    // Enable/disable menu
    $('.select-access-multiple-enable').select2({
        minimumResultsForSearch: Infinity
    });
    $(".access-multiple-disable").click(function () { $(".select-access-multiple-enable").prop("disabled", true); });
    $(".access-multiple-enable").click(function () { $(".select-access-multiple-enable").prop("disabled", false); });


    // Destroy/create menu
    function create_menu_multiple() {
        $('.select-access-multiple-create').select2({
            minimumResultsForSearch: Infinity
        });
    }
    create_menu_multiple();
    $(".access-multiple-create").on("click", function () { return create_menu_multiple()});
    $(".access-multiple-destroy").on("click", function () { $('.select-access-multiple-create').select2("destroy"); });


    // Clear selection
    $('.select-access-multiple-clear').select2({
        minimumResultsForSearch: Infinity
    });
    $(".access-multiple-clear").on("click", function () { $(".select-access-multiple-clear").val(null).trigger("change"); });
    
});
