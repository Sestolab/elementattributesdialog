CKEDITOR.plugins.add('elementattributesdialog', {
	lang: 'en,ru,uk',
	requires: 'dialog',
	icons: 'elementattributesdialog',

	init: function(editor){
		editor.addCommand('elementattributesdialog', new CKEDITOR.dialogCommand('elementattributesdialog'));
		CKEDITOR.dialog.add('elementattributesdialog', this.path + 'dialogs/elementattributesdialog.js');

		editor.ui.addButton('elementattributesdialog', {
			label: editor.lang.elementattributesdialog.title,
			command: 'elementattributesdialog'
		});

		CKEDITOR.plugins.widget && editor.on('selectionChange', function(e){
			this.getCommand('elementattributesdialog').setState(CKEDITOR.plugins.widget.isDomWidget(e.data.path.lastElement)
				? CKEDITOR.TRISTATE_DISABLED
				: CKEDITOR.TRISTATE_OFF
			);
		});
	}
});

