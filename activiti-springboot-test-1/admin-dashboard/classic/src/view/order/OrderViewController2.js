Ext.define('Admin.view.order.OrderViewController2', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderViewController2',
    
    /*combobox选中后控制对应输入（文本框和日期框）框显示隐藏*/
    searchComboboxSelectChuang:function(combo,record,index){
        //alert(record.data.name);
        var searchField = this.lookupReference('searchFieldName').getValue();
        if(searchField==='createTime'){
            this.lookupReference('searchFieldValue').hide();
            this.lookupReference('searchDataFieldValue').show();
        }else{
            this.lookupReference('searchFieldValue').show();
            this.lookupReference('searchDataFieldValue').hide();
        }
        
    },

    /*Add*/
    openAddWindow:function(grid, rowIndex, colIndex){
        grid.up('container').add(Ext.widget('orderAddWindow')).show();
    },

    submitAddForm:function(btn){
        var form = btn.up('window').down('form');
        //form.getValues();
        //更新事件
    },

    /*Edit*/
    openEditWindow:function(grid, rowIndex, colIndex){
         var record = grid.getStore().getAt(rowIndex);
        //获取选中数据的字段值：console.log(record.get('id')); 或者 console.log(record.data.id);
        if (record ) {
            var win = grid.up('container').add(Ext.widget('orderEditWindow'));
            win.show();
            win.down('form').getForm().loadRecord(record);
        }
    },
    submitEditForm:function(btn){
        var form = btn.up('window').down('form');
        console.log(form.getValues());
        console.log(form.getValues('id'));
        //form.getValues();
        //更新事件
    },

    /*Quick Search*/    
    quickSearch:function(btn){
        var searchField = this.lookupReference('searchFieldName').getValue();
        var searchValue = this.lookupReference('searchFieldValue').getValue();
        var store = btn.up('gridpanel').getStore();
        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
        Ext.apply(store.proxy.extraParams, {orderNumber:"",createTime:""});
        if(searchField==='orderNumber'){
            Ext.apply(store.proxy.extraParams, {orderNumber:searchValue});
        }
        if(searchField==='createTime'){
            Ext.apply(store.proxy.extraParams, {createTime:searchValue});
        }
        store.load({params:{start:0, limit:20, page:1}});
    },

    /*Search More*/ 
    openSearchWindow:function(toolbar, rowIndex, colIndex){
        toolbar.up('grid').up('container').add(Ext.widget('orderSearchWindow')).show();
    },
    submitSearchForm:function(btn){
        var form = btn.up('window').down('form');
        //form.getValues();
        //更新事件
    },
    /*Delete*/  
    deleteOneRow:function(grid, rowIndex, colIndex){
        Ext.Msg.alert("Delete One Row","Click Delete Button");
    },
    /*Delete More Rows*/    
    deleteMoreRows:function(grid, rowIndex, colIndex){
        var task;
        task = {
                  run: function() {
                      Ext.data.StoreManager.lookup('orderGridStroe').load();
                      console.log("时间定时器启动了");
                  },
                  interval: 2000
              };
        //Ext.Msg.alert("Delete More Rows","Click Delete Button");
        //var grid = btn.up('grid');
        //console.log(grid);
        //var selections= grid.getSelectionModel().getSelection();
        //console.log(selections);
        //console.log(selections.length);
        
        //var ids = [];
        /*for(var i = 0; i < selections.length; i++) {
            if (selections[i].data != null){
                ids.push(selections[i].data.id);
            }
        }*/
        //console.log(ids);
        //如果选中且确认删除则执行操作  
        Ext.MessageBox.confirm("","确定要删除所选信息吗？",function(choice){
            if(choice == 'yes'){
              var grid = btn.up('grid');
              var selecteds= grid.getSelectionModel().getSelection();
              //获取grid的store
              var store = grid.getStore();
              //获取store记录总数量
              /*var rowlength=store.getCount();
              var delRow = [];
              
              //遍历所有记录
              for(var j = 0; j < selecteds.length; j++){
                  //如果选择集里有所有记录里被选择的记录的索引
                  for (var i = rowlength-1; i >= 0; i--) {
                    var id = selecteds[j].data.id;
                    var record = store.getAt(i);
                    var record_id = record.id;
                    if (id == record_id) {
                        //将选中的行放入delRow数组中
                        delRow.push(record);
                    }
                  }
              }*/

              console.log(delRow);
              store.remove(delRow);
              setTimeout(function(){
                Ext.data.StoreManager.lookup('orderGridStroe').load();
                console.log("时间定时器启动了");
              },1000);
              //Ext.TaskManager.start(task);
              //Ext.TaskManager.stop(task);
            }
        })
    },
    /*Disable*/ 
    onDisableButton:function(grid, rowIndex, colIndex){
        Ext.Msg.alert("Title","Click Disable Button");
    }
    

    /* Delete */
    /*onDeleteButton:function(grid, rowIndex, colIndex){
        var record = grid.getStore().getAt(rowIndex);
        //获取ID
        if (record) {
            var id = record.get('id');
            alert(id);
        }
        //alert(record.get('id'));
        //alert(record.data.id));
        //删除事件rest/ajax

    },

	onEditButton:function(grid, rowIndex, colIndex){
		var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.alert('Title', rec.get('fullname'));
	},
	
	onDisableButton:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Click Disable Button");
	}*/
});
