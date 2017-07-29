var app = {

    // ==============================================================================================
    // Call your function here to become a single function
    // * This method make your code more modular and make it easy to toggle your function
    // * If you want to disable a function, just commented on function that you need to disable below
    // ==============================================================================================
    homeFilter: [],
    businessFilter: [],
    userFilter: [],
    init: function($) {
        app.hideID();
        //app.addBlockTable();
        //app.addBlockTableBusiness();
        // app.addBlockTableUsers();
        app.detectAssetModal();
        app.menuToggle();
        app.select2();
        app.owlSlider();
        app.addActionAsset();
        app.addActionThreat();
        app.addActionControl();
        app.updateRow();
        app.menuToggleEachRow();
        app.refresh();
        app.homeTableToolbar();
        app.showGettingStarted();
        app.assessmentNextButtons();
        app.initTextEditor();
        app.initAssessmentTextEditor();
        app.initActionOnTable();
        app.autoAddUserForm();
        app.detectBusinessModalShow();
        app.businessPageTreeView();
        app.initDialog();
        app.actionsHandler();
    },

    // ======================================================================
    // Your function here
    // * Don't forget to use proper function name to describes your function
    // ======================================================================
    loadTable: function() {
      jQuery('.table-general').on('post-body.bs.table', function () {
          jQuery('.loading').hide();
          jQuery('.table-general, .info').show();
      });
    },
    mergeControlTable: function() {
      var table = jQuery('#table-controls');
      table.on('post-body.bs.table', function () {
        setTimeout(function () {
          // get table count
          var count = table.bootstrapTable('getData').length;
          for (i = 0; i < count; i++) {
            if (i === 0 || (i && (i % 4 === 0))) {
              table.bootstrapTable('mergeCells', {
                index: i,
                field: 'category',
                rowspan: 4
              });
            }
          }
        }, 500);
      });
    },
    businessPageTreeView: function() {
      jQuery('.mrg_0').click(function(){
        if (!jQuery(this).parent().hasClass('show')) {
          jQuery(this).parent().addClass('show')
        } else {
          jQuery(this).parent().removeClass('show')
        }
      })
      jQuery('#tree_group').treeview();
      jQuery('#tree_group a').click(function() {
        var value = jQuery(this).text();
        console.log(value);
        // Change hidden input
        jQuery('#new-business-unit-parent').val(value);
        jQuery('.mrg_0 .select-value').text(value);
        jQuery('.select-content').removeClass('show');
      });
    },
    detectBusinessModalShow: function() {
      $(document).on('shown.bs.modal', '#editBusiness', function (e) {
        console.log('show');
        const selectedParent = jQuery(e.relatedTarget).parents('tr');
        // get value from rows
        var rowValue = [];
        var td = selectedParent.find('td');
        selectedParent.find('td').each(function(i, o){
          if (i !== (td.length - 1)) {
            rowValue.push(jQuery(o).text());
          }

        });
        const [businessName, organisation, status] = rowValue;
        // Init html
        var idField = jQuery('#edit-id');
        var businessNameField = jQuery('#edit-business-name');
        var organisationField = jQuery('#edit-organisation-name');
        var statusField = jQuery('#edit-business-status');
        console.log({ businessName, organisation, status });
        // Insert new value
        idField.val(selectedParent.index());
        businessNameField.val(businessName);
        organisationField.val(organisation);
        statusField.val(status);
      })
    },
    autoAddUserForm: function() {
      jQuery(document).on('change', '#newUsers .content-modal-users .row:last-child select', function() {
        // Check if all select is filled
        // Get all select
        var filled = true;
        var that = this;
        var row = jQuery(this).parents('.content-modal-users').find('.row:last-child');
        var select = row.find('select');
        var html = row[0].outerHTML;
          select.each(function(i, o) {
          if (!jQuery(o).val() || jQuery(o).val() === "") {
            filled = false;
          }
          if (i === (select.length - 1)) {
            if (filled) {
              row.after(html);
            }
          }
        })
      });
    },
    initActionOnTable: function() {
      app.initActionOn(jQuery('#table-assets'));
      app.initActionOn(jQuery('#table-threatx'));
      app.initActionOn(jQuery('#table-controls'));
      app.initActionOn(jQuery('#table-risk'));
    },
    initHomeAction: function() {
      jQuery(document).on('post-body.bs.table', '#table-home.table-home', function (data) {
        jQuery('#table-home.table-home tbody tr').each(function(i, o){
          var lastTd = jQuery(this).find('td:last-child');
          var menuLink = jQuery(this).find('.table-menu-link-2');

          menuLink.html('');

          console.log(lastTd, 'khkh');

          var attrs = {};
          jQuery.each(lastTd[0].attributes, function(i, o) {
            attrs[o.name] = o.value === "" ? true : o.value ;
          });
          if (attrs['data-delete-link']) {
            menuLink.prepend(`<a href="#" data-link="${attrs['data-delete-link']}" data-archive-link="${attrs['data-archive-link']}" id="action-delete"><i class="fa fa-trash"></i></a>`);
          }
          if (attrs['data-archive-link']) {
            menuLink.prepend(`<a href="#" data-link="${attrs['data-archive-link']}" id="action-archive"><i class="fa fa-archive"></i></a>`);
          }
          if (attrs['data-user-access-modal']) {
            menuLink.prepend(`<a href="#" data-modal="${attrs['data-user-access-modal']}" id="action-user-access-modal"><i class="fa fa-user"></i></a>`);
          }
          if (attrs['data-entity-history-modal']) {
            menuLink.prepend(`<a href="#" data-modal="${attrs['data-entity-history-modal']}" id="action-entity-history-modal"><i class="fa fa-list-alt"></i></a>`);
          }
          if (attrs['data-edit-name']) {
            menuLink.prepend(`<a href="#" data-name="${attrs['data-edit-name']}" id="edit-name"><i class="fa fa-pencil-square-o"></i></a>`);
          }
          if (attrs['data-assessment-link']) {
            menuLink.prepend(`<a href="${attrs['data-assessment-link']}"><i class="fa fa-list"></i></a>`);
          }
          if (attrs['data-detail-link']) {
            menuLink.prepend(`<a href="${attrs['data-detail-link']}"><i class="fa fa-eye"></i></a>`);
          }
          if (attrs['data-inactive-link']) {
            menuLink.prepend(`<a href="#" data-link="${attrs['data-inactive-link']}" id="action-inactive"><i class="fa fa-times"></i></a>`);
          }
        })
      });
    },
    actionsHandler() {
      // On delete
      jQuery(document).on('click', '#action-delete', function(e) {
        e.preventDefault();
        var link = jQuery(this).data('link');
        var linkArchive = jQuery(this).data('archive-link');
        jQuery("#dialog-confirm").dialog( "option", "delete-link", link);
        jQuery("#dialog-confirm").dialog( "option", "archive-link", linkArchive);
        jQuery("#dialog-confirm").dialog('open');
      });
      // On archive
      jQuery(document).on('click', '#action-archive', function(e) {
        e.preventDefault();
        var link = jQuery(this).data('link');
        jQuery("#archive-dialog-confirm").dialog( "option", "archive-link", link);
        jQuery("#archive-dialog-confirm").dialog('open');
      });
      // On archive
      jQuery(document).on('click', '#action-inactive', function(e) {
        e.preventDefault();
        var link = jQuery(this).data('link');
        jQuery("#inactive-dialog-confirm").dialog( "option", "inactive-link", link);
        jQuery("#inactive-dialog-confirm").dialog('open');
      });
      // User Access modal
      jQuery(document).on('click', '#action-user-access-modal', function(e) {
        e.preventDefault();
        var modal = jQuery(this).data('modal');
        jQuery(modal).modal('toggle');
      });
      // Entity history modal
      jQuery(document).on('click', '#action-entity-history-modal', function(e) {
        e.preventDefault();
        var modal = jQuery(this).data('modal');
        jQuery(modal).modal('toggle');
      });
      // Edit name
      jQuery(document).on('click', '#edit-name', function(e) {
        e.preventDefault();
        var name = jQuery(this).data('name');
        jQuery('#edit-entity').val(name);
        jQuery('#editHome').modal('toggle')
      });
    },
    initDialog() {
      jQuery("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: {
          Delete: function() {
            window.location.href = $(this).dialog("option", "delete-link");
            $(this).dialog( "close" );
          },
          Archive: function() {
            jQuery("#archive-dialog-confirm").dialog("open");
            $(this).dialog( "close" );
          },
          Cancel: function() {
            $(this).dialog( "close" );
          }
        }
      });

      jQuery("#archive-dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: {
          Ok: function() {
            var link = $(this).dialog("option", "archive-link") || jQuery("#dialog-confirm").dialog("option", "archive-link")
            window.location.href = link;
            $(this).dialog( "close" );
          },
          Cancel: function() {
            $(this).dialog( "close" );
          }
        }
      });

      jQuery("#inactive-dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: {
          Ok: function() {
            var link = $(this).dialog("option", "inactive-link");
            window.location.href = link;
            $(this).dialog( "close" );
          },
          Cancel: function() {
            $(this).dialog( "close" );
          }
        }
      });
    },
    initActionOn: function(table) {
      table.find('tr').each(function(i, o){
        jQuery(o).find('td').each(function(index, object){
          var removeLink = jQuery(object).data('remove-link');
          var editLink = jQuery(object).data('edit-link');
          var addLink = jQuery(object).data('add-link');
          var hasRemoveLink = typeof removeLink !== typeof undefined && removeLink !== false && removeLink !== "";
          var hasEditLink = typeof editLink !== typeof undefined && editLink !== false && editLink !== "";
          var editLinkIsModal = editLink && editLink.substr(0, 1) === "#";
          console.log(editLinkIsModal, 'dd');
          var hasAddLink = typeof addLink !== typeof undefined && addLink !== false && addLink !== "";
          if (hasRemoveLink || hasEditLink || hasAddLink) {
            // Add action html
            var actions = `<div class="actions">${hasAddLink ? `<a href="${addLink}" class="add-link"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>` : ''} <span>${hasEditLink ? `<a ${editLinkIsModal ? `data-toggle="modal" data-target="${editLink}"` : ''} href="${editLink}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>` : ''} ${hasRemoveLink ? `<a href="${removeLink}"><i class="fa fa-trash" aria-hidden="true"></i></a>` : ''}</span></div>`;
            jQuery(object).append(actions);
            }
        })
      })
    },
    detectAssetModal: function() {
      jQuery('#newAssets').on('shown.bs.modal', function (e) {
        var td = jQuery(e.relatedTarget).parents('td');
        var isEdit = !!td.attr('data-edit-link');
        var text = td.text();
        var category = td.next().text();
        var criticality = td.next().next().find('select').val();

        // Reset
        jQuery('#asset-name').val('');
        jQuery('#category').val('');
        jQuery('#criticality').val('');

        if (isEdit) {
          jQuery('#asset-name').val(text);
          jQuery('#category').val(category);
          jQuery('#criticality').val(criticality);
        }
      })
    },
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
      app.filter('type', 'home', $('.table-home'), $('#filterType'), true);
      app.filter('status', 'home', $('.table-home'), $('#filterStatus'), false);
      app.sortSelectInit('status', $('.table-home'), $('#sortColumn'));
      app.removeFilter('type', 'home', $('.table-home'), $('#filterType'));

      // Table business
      app.filter('organisation', 'business', $('.table-business'), $('#filterType'), true);
      app.filter('status', 'business', $('.table-business'), $('#filterStatus'), false);
      app.sortSelectInit('status', $('.table-business'), $('#sortColumn'));
      app.removeFilter('organisation', 'business', $('.table-business'), $('#filterType'));

      // Table user
      app.filter('organisation', 'user', $('.table-user'), $('#filterType'), true);
      app.filter('status', 'user', $('.table-user'), $('#filterStatus'), false);
      app.sortSelectInit('status', $('.table-user'), $('#sortColumn'));
      app.removeFilter('organisation', 'user', $('.table-user'), $('#filterType'));
    },
    filter: function(field, section, tableElement, selectElement, record) {
      selectElement.on('change', function() {
        if (!tableElement.length) {
          return;
        }
        var value = selectElement.val();
        if (value === "" || value === "All") {
          tableElement.bootstrapTable('filterBy', "");
        } else {
          if (record && app[`${section}Filter`].indexOf(value) === -1) {
            app[`${section}Filter`] = [].concat(app[`${section}Filter`], value);
            console.log(app[`${section}Filter`], field, `${section}Filter`);
            // Add to filter div
            jQuery('.filter-field .tags').append(`<div>${value} <a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></div>`);
          }
          tableElement.bootstrapTable('filterBy', {
              [field]: record ? app[`${section}Filter`] : [value]
          });
        }
      });
    },
    removeFilter: function(field, section, tableElement, selectElement) {
      jQuery(document).on('click', '.filter-field .tags a', function(e){
        e.preventDefault();
        if (!tableElement.length) {
          return;
        }

        var value = jQuery(this).parent().text();
        // Remove from array
        app[`${section}Filter`] = app[`${section}Filter`].filter(function(o, i) {
          if (`${o} ` === value) return false;
          return true;
        });
        // Update
        if (!app[`${section}Filter`].length) {
          tableElement.bootstrapTable('filterBy', "");
          selectElement.select2("val", "")
        } else {
          tableElement.bootstrapTable('filterBy', {
              [field]: app[`${section}Filter`]
          });
        }
        // Remove from DOM
        jQuery(this).parent().remove();
      });
    },
    sortSelectInit: function(field, tableElement, selectElement) {
      selectElement.on('change', function() {
        if (!tableElement.length) {
          return;
        }
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


app.loadTable();
(function(e) {
    e(window.jQuery, window, document);
})(function($, window, document) {
    // This code will initialize your whole function in this JS file
    $(function() {
        app.mergeControlTable();
        app.initHomeAction();
        app.init($);
    });
});

window.actionEvents = {
    'click .table-menu': function(e) {
        $('.table-toggle').click(function(e) {
            $('.table-menu-link').removeClass('show');
            $(this).parent().find($('.table-menu-link')).toggleClass('show');
        });
    },
};

function actionFormatter() {
  var HTML = jQuery('.table-menu')[0].outerHTML;
  return HTML;
}
