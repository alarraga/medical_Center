/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.Loader.setConfig({ 
    enabled: true
    });
 
Ext.application({
    name: 'UKHAIR_DATA',
 
    appFolder: 'js',
    
    controllers: [
                  'UploadFile'
              ],
    
    launch: function() {
        Ext.widget('fileuploadform');
    }
});