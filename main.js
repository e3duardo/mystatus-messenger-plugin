var online;//Contatos online
var offline;//Contatos offline
var nchat;//Janelas abertas
var nomecontato;//Nome do contato (da atual conversa)
var statuscontato;//Status da conversa (da atual conversa)
var chat;//

//Contar Contatos
function ContaContatti()
{
	online=0;
	offline=0;
	var Contacts = Messenger.MyContacts;
	var e = new Enumerator(Contacts);
	for( ; !e.atEnd(); e.moveNext()) 
	{
 		var Contact = e.item();
		if(Contact.Status == 1)
		{
			offline++;
		}	
	}	
	offline++;
	online = Messenger.MyContacts.Count - offline;
}
//Contar Janelas Abertas
function ContaChat()
{
	nchat=Messenger.CurrentChats.Count;
	if (nchat=="0")
	{
		nchat=nchat;
	}
	else
	{
		nchat=nchat;
	}
}

function OnEvent_Timer(timer1)
{
	var cabecalho="[c=#3399ff][u]";
	var rodape="[/u][/c]";
	var separador=" - ";
	var messpers;
	ContaChat();
	ContaContatti();
 	messpers=cabecalho;
	//validação de janela aberta//	
	if(nchat != 0)	
	{
		messpers+= "JanelasAbertas: " + nchat + separador + " ";
	}		
	messpers+= "On/Off: " + online + "/" + offline;
	vardudu = "";
	//validação de nomes importantes//	
	if(nomecontato=="Ninguém")	
	{
		vardudu+= "";
	}	
	else if(nomecontato != "Ninguém" && statuscontato != 1)	
	{
		mudarPSM(nomecontato, separador);
	}	
	messpers+= vardudu + rodape;
	Messenger.MyPersonalMessage=messpers;
	MsgPlus.AddTimer("timer1",500);
}

function OnEvent_Signin(Email)
{
	nomecontato="Ninguém";
	MsgPlus.AddTimer("timer1",500);
}

function OnEvent_Initialize(MessengerStart)
{
	nomecontato="Ninguém";
	MsgPlus.AddTimer("timer1",500);
}
function OnEvent_MyMediaChange(media)
{
	Debug.Trace(media);
	media = "";
}
	
function OnEvent_ChatWndSendMessage(ChatWnd,message)
{
	if(message == '/ativar')
	{
		ativar();
		return "";
	}     
	if(message == '/desativar')
	{
		desativar();
		return "";
	}    	
	return message;
}
   
function OnEvent_ChatWndReceiveMessage(ChatWnd,Origin,Message,MessageKind)
{
	var backup;
	chat=ChatWnd;
	contatto=ChatWnd.Contacts;
	if(contatto.Count == 1) 
	{
		var e = new Enumerator(contatto);
		var Cnt = e.item();
		nomecontato = Cnt.Email.split("@");
		nomecontato = nomecontato[0];
		nomecontato = (nomecontato.substring(0,(nomecontato.length-4)))+"****";
		statuscontato = Cnt.Status;
	}
}
		
function OnEvent_ChatWndCreated(ChatWnd)
{
	var contatto;
	chat=ChatWnd;
	contatto=ChatWnd.Contacts;
	if(contatto.Count == 1) 
	{
		var e = new Enumerator(contatto);
		var Cnt = e.item();
		nomecontato = Cnt.Email.split("@");
		nomecontato = nomecontato[0];
		nomecontato = (nomecontato.substring(0,(nomecontato.length-4)))+"****";
		statuscontato = Cnt.Status;
	}
}
	
function OnEvent_ChatWndDestroyed(ChatWnd)
{
	if(chat.Handle==ChatWnd.Handle)
	{
		nomecontato="Ninguém";
	}
}