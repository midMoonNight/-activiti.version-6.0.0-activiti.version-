Ext.define('Admin.view.process.definition.ProcessDefinitionUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.processDefinitionUploadWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',//引入上传控件
        'Ext.form.field.HtmlEditor'
    ],
    height: 180,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'ProcessDefinition Upload Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        items: [{
        	xtype: 'filefield',
	        width: 400,
	        labelWidth: 80,
	        name:'file',//提交给后台的字段名
	        emptyText: 'Select an zip/bpmn/bpmn.20.xml file!', 
	        fieldLabel: '上传文件:',
	        labelSeparator: '',
	        buttonConfig: {
	            xtype: 'filebutton',//选择上传文件按钮
	            glyph:'',
	            iconCls: 'x-fa fa-cloud-upload',
	            text: 'Browse'
	        }
	    }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Upload',
        handler: 'onClickUploadFormSumbitButton'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});