
function status_ (statuscontato)
{
	fexabarra = ")";//usado pra se um dia resolver tirar a barra
	status = " (";
	if (statuscontato == 0)
	{
 		status += "" + fexabarra;
 		return false;
	}
	else if (statuscontato == 1)//Aparecer offline
	{
 		status += "Off" + fexabarra;
 		return false;
	}
	else if (statuscontato == 2)
	{
 		status += "Idle" + fexabarra;
 		return false;
	}
	else if (statuscontato == 3)//Online
	{
 		status += "on" + fexabarra;
 		return true;
	}
	else if (statuscontato == 4)//Ocupado
	{
 		status += "oc" + fexabarra;
 		return true;
	}
	else if (statuscontato == 5)//Volto Logo
	{
 		status += "vl" + fexabarra;
 		return true;
	}
	else if (statuscontato == 6)//Ausente
	{
 		status += "as" + fexabarra;
 		return true;
	}
	else if (statuscontato == 7)//Ausente
	{
 		status += "as" + fexabarra;
 		return true;
	}
	else if (statuscontato == 8)//Em Ligação
	{
 		status += "tel" + fexabarra;
 		return true;
	}
	else if (statuscontato == 9)//Em Horário de Almoço
	{
 		status += "almoço" + fexabarra;
 		return true;
	}
	return true;
}
