/* {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} */
jQuery.Class("Settings_CustomView_Sorting_Js", {}, {
	formElement: false,
	registerButtonsEvent: function () {
		var thisInstance = this;
		var form = this.getForm();
		form.find('button.clear').on('click', function (e) {
			var currentTarget = jQuery(e.currentTarget);
			currentTarget.closest('.input-group').find('select').val('').trigger('change');
		});
		form.find('button.sortOrderButton').on('click', function (e) {
			var currentTarget = jQuery(e.currentTarget);
			currentTarget.find('[data-fa-i2svg]').each(function (n, e) {
				if (jQuery(this).hasClass('d-none')) {
					jQuery(this).removeClass('d-none');
					form.find('[name="sortOrder"]').val(jQuery(this).data('val'));
				} else {
					jQuery(this).addClass('d-none');
				}
			})
		});
		form.on('submit', function (e) {
			var form = jQuery(e.currentTarget);
			thisInstance.saveSorting(form);
			e.preventDefault();
		});
	},
	saveSorting: function (form) {
		var thisInstance = this;
		var progress = $.progressIndicator({
			'message': app.vtranslate('JS_SAVE_LOADER_INFO'),
			'blockInfo': {
				'enabled': true
			}
		});
		var data = form.serializeFormData();
		var params = {
			'cvid': data.cvid,
			'name': 'sort',
			'value': data.defaultOrderBy ? data.defaultOrderBy + ',' + data.sortOrder : ''
		};
		app.saveAjax('updateField', params).then(function (data) {
			app.hideModalWindow();
			if (data.success) {
				Vtiger_Helper_Js.showPnotify({text: data.result.message, type: 'success'});
			}
			progress.progressIndicator({'mode': 'hide'});
		});
	},
	getForm: function () {
		if (this.formElement == false) {
			this.setForm(jQuery('#sortingCustomView'));
		}
		return this.formElement;
	},
	setForm: function (element) {
		this.formElement = element;
		return this;
	},
	registerEvents: function () {
		this.registerButtonsEvent();
	}
});

jQuery(document).ready(function (e) {
	var instance = new Settings_CustomView_Sorting_Js();
	instance.registerEvents();
})
