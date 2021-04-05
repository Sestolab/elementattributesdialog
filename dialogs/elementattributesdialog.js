CKEDITOR.dialog.add('elementattributesdialog', function(editor){
	return {
		title: editor.lang.elementattributesdialog.title,
		minWidth: 450,
		minHeight: 100,
		contents: [{
			id: 'main',
			elements: [{
				type: 'fieldset',
				label: ' ',
				children: [
					{
						id : 'attributes',
						type: 'html',
						html: '<div></div>',
						setup: function(realElement){
							this.getElement().getParent().findOne('legend').setText(realElement.getName());
							CKEDITOR.tools.object.entries(realElement.getAttributes()).forEach(function(attr){
								newDialogElement(attr[0], attr[1]);
							});
						},
						commit: function(element, realElement){
							realElement.removeAttributes();
							this.getElement().find('input:nth-child(odd)').toArray().forEach(function(input){
								input.getValue() && realElement.setAttribute(input.getValue(), input.getNext().getValue());
							});
							newElementFrom(realElement, 'Html').replace(element);
						}
					},
					{
						type: 'button',
						label: '+',
						style: 'width:100%;margin-top:0.5em;',
						onClick: function(){
							newDialogElement();
						}
					}
				]
			}]
		}],
		onShow: function(){
			this.element = editor.getSelection().getStartElement();
			this.realElement = newElementFrom(this.element, 'DataFormat');
			this.setupContent(this.realElement);
		},
		onHide: function(){
			this.getContentElement('main', 'attributes').getElement().setHtml('');
		},
		onOk: function(){
			this.commitContent(this.element, this.realElement);
		}
	};


	function newElementFrom(element, to){
		return CKEDITOR.dom.element.createFromHtml(editor.dataProcessor['to'+to](element.getOuterHtml(), {context: 'p'}));
	}

	function newDialogElement(attrName, attrValue){
		var input = function(w, v){ return '<input style="width:'+w+'%" class="cke_dialog_ui_input_text" value="'+(v || '')+'">' };
		CKEDITOR.dialog.getCurrent().getContentElement('main', 'attributes').getElement().append(
			CKEDITOR.dom.element.createFromHtml(
				'<div role="presentation" class="cke_dialog_ui_text">'
				+ input(20, attrName)
				+ input(80, attrValue)
				+'</div>'
			)
		);
	}
});

