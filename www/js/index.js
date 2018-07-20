/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		document.getElementById('contatos').addEventListener('click', this.listContatos,false);
		document.getElementById('pickConcat').addEventListener('click', this.pickConcat,false);
		
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	listContatos: function() 
	{
		function onSuccess(contacts) {
			///alert('Found ' + contacts.length + ' contacts.');
			///document.getElementById("listaContatos").innerHTML = contacts.displayName;
			$.each(contacts,function(i,e)
			{
				//$("#listaContatos").append(JSON.stringify(contacts[i]));
				
					$.each(e.phoneNumbers, function(c,r)
					{
						if(r.type == "mobile"){
							$("#listaContatos").append(" - "+r.value+' - ');
							//$("#listaContatos").append(" - "+c+' - ');
						}
					});
					
					$("#listaContatos").append(JSON.stringify(e));
			});
			
		};

		function onError(contactError) {
			alert('onError!');
		};

		// find all contacts with 'Bob' in any name field
		var options      = new ContactFindOptions();
		options.filter   = "Mar";
		options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		options.hasPhoneNumber = true;
		//var fields       	= [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		var fields 			= ["displayName","addresses"];
		navigator.contacts.find(fields, onSuccess, onError, options);
		
		//var options = new ContactFindOptions();
		//options.filter=""; 
		//var filter = ["displayName","addresses"];
		//navigator.contacts.find(filter, onSuccess, onError, options);
		
	},
	pickConcat: function()
	{
		navigator.contacts.pickContact(function(contact){
        alert('The following contact has been selected:' + JSON.stringify(contact));
		},function(err){
			alert('Error: ' + err);
		});
	}
	
};

app.initialize();














