// Le constructeur de serverXmlHttp recoit les parametres de la requete:
//url - URL du serveur
//contentType - type de contenu de la requete
//type - type de requete (par default GET)
//data - parametres de la requete optionnels
//sync - indicateur de la requete asychrone (par default true)
//showErrors - affichage des erreurs
//complte - function de rappel invoquee lorsque la requete est ternimee
// Autor: Cosysoft Digital Solutions

  /**********************************************************************
  *  Gestionario de verificaçao quando o documento esta carregado       *
  **********************************************************************/ 
$(document).ready(function() {	
  // Criar o objeto request contact
  io = new RequestContact(); 
  // Atribuir as propriedades dos elementos do documento
  io.iniDomElements();
});

  /*******************************************************************************
     Function valider l'option choisie dans la section des question actuelle     *
  ********************************************************************************/
function RequestContact(){

  // Funcao chamado no gestionario de verificacao de inicio do documento
  this.iniDomElements = function()
  {// Configurar as propriedades dos elementos da pagina
	 // Gerir quando se clica no botao submit
	 $('#oSubmit').click(function(event){io.onSendContactForm(event);});	 
  };

  /*******************************************************************************
     Funcao chamado para atualizar o nome de perfil de utilizador                *
  ********************************************************************************/
  this.onSendContactForm = function(event)
  {// Arreter la propagation de l'evenement
    event.stopPropagation();
	// Formater la requete vers le serveur des donnees
	var sRequest = '../sys/xml-pipe-loader-system.php';
	// Activar o estado de envio
	$('#oxvSending').fadeIn(100, function(){
		// Afficher le block sedding estate
		$('#oCtrlErrBlck').fadeIn(100);
	});		  	
	// Remplir l'entet de la demande formulaire
	let sName = $('#oName').val();
    let sEmail = $('#oEmail').val();
	let sPhone = $('#oPhone').val();
	let sMessage = $('#oMessage').val();
	// Remover todas os stylos error
	$('#oName').removeClass("form-control-error");
	$('#oEmail').removeClass("form-control-error");
	$('#oPhone').removeClass("form-control-error");
	$('#oMessage').removeClass("form-control-error");
    // Envoyer les donnees au serverXmlHttp
 	$.get(sRequest, {op:'sendcontact', name:sName, email:sEmail, phone:sPhone, message:sMessage}, 
	  function(data,status,xhr)
    {// Verificar se o pedido executou com sucesso
	    if(status === 'success')
		{// Recuperar o elemento dom de retorno
		    var xmlRoot = xhr.responseXML; 
		      // Obtenir le tableau de title, file et image de la playlist
			  resultArray = xmlRoot.getElementsByTagName("opresult");
			  			  
		    // Verificar se a tabela contem informacoes
			if(resultArray.item(0).firstChild.data != null 
		       && resultArray.item(0).firstChild.data != "null")
			{// Recuperar o valor de retorno do servidor
		        var request = resultArray.item(0).firstChild.data;	
				// Verificar o codigo de messagem recebido do servidor
			    switch(request)
				{
			        case 'error-send':
			   	        // cacher l'element de status					
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                 // Activer le block errerur status
							     $('#oErrorBox').fadeIn(100, function(){
									// Adicionar a classe de erro
								    $('#oCtrlErrBlck').fadeIn(500);
                                     var sTi = setTimeout( function(){
										 // Adicionar a classe de erro
								        $('#oCtrlErrBlck').fadeOut(100);
										// Arreter l'execution du timeout
                                        clearTimeout(sTi);
									 }, 1000);									
								 });
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);					
			        break;					
			        case 'error-name':
			   	        // cacher l'element de status					
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                 // Activer le block errerur status
							     $('#oCtrlErrBlck').fadeOut(300, function(){
									// Adicionar a classe de erro
								    $('#oName').addClass("form-control-error"); 
								 });
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);					
			        break;
			        case 'error-email':
			   	        // cacher l'element de status					
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                 // Activer le block errerur status
							     $('#oCtrlErrBlck').fadeOut(300, function(){
									// Adicionar a classe de erro
								   $('#oEmail').addClass("form-control-error"); 
								 });
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);					
			        break;
			        case 'error-phone':
			   	        // cacher l'element de status					
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                 // Activer le block errerur status
							     $('#oCtrlErrBlck').fadeOut(300, function(){
									// Adicionar a classe de erro
								    $('#oPhone').addClass("form-control-error"); 
								 });
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);				
			        break;
			        case 'error-message':
						// cacher l'element de status
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                 // Activer le block errerur status
							     $('#oCtrlErrBlck').fadeOut(300, function(){
									// Adicionar a classe de erro
								    $('#oMessage').addClass("form-control-error"); 
								 });
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);					
			        break;					
			        case 'success-send':
			   	        // cacher l'element de status
						var sTime = setTimeout( function(){
			                // cacher l'element de status
				            $('#oxvSending').fadeOut(100, function(){
                                // Afficher la barre de sucess
								$('#oSuccessBox').fadeIn(500);
                                // Creer um timer delay pour de duxieme
								var sTime2 = setTimeout( function(){
								   // Esconder o block sucess
								   $('#oSuccessBox').fadeOut(100, function(){
								        // Desativar le block errerur status
							            $('#oCtrlErrBlck').fadeOut(300, function(){
											// Apagar os dados do formulario
											$('#oName').val('');
											$('#oEmail').val('');
											$('#oPhone').val('');
											$('#oMessage').val('');
										});									   
								   });
								   // Arreter l'execution du timeout
                                   clearTimeout(sTime2);
								}, 3000);								 
			                });
                            // Arreter l'execution du timeout
                            clearTimeout(sTime);								
						}, 800);
			        break;				   
				}
			}

		}else{xhr.abort();setTimeout(this.onSendContactForm,50);}	
	// Se nao houver nada		
    }, 'xml' );	
  };

}