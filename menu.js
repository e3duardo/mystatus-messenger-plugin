function ativar()
{
	nomecontato="Ninguém";
	MsgPlus.AddTimer("timer1",500);
}

function desativar()
{
	MsgPlus.CancelTimer("timer1");
	Messenger.MyPersonalMessage="";
}

function sobre()
{
	var Wnd = MsgPlus.CreateWnd("interface.xml", "WndAbout");
}

function OnEvent_MenuClicked(MenuItemId,Location,ChatWnd) 
{
	switch(MenuItemId) 
	{
		case 'ativar':       		         
		ativar();
		break;
		
		case 'desativar':        
		desativar();
		break;
		
		case 'sobre':        
		sobre();
		break;
	
	}
}