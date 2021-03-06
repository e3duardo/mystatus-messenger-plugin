/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <darktempler@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with my code. If we meet some day, and you think
 * this code is worth it, you can buy me a beer in return - Matt Labrum (-dt-)
 * ----------------------------------------------------------------------------
 */


/*
The wmp dll has been modified by me to include artist and album information the orginal source is here
http://download.truelaunchbar.com/install/mcplugins/mcsdk.zip
*/

 /* 
	$LastChangedBy: dt $
	$LastChangedDate: 2007-04-03 01:13:17 -0700 (Tue, 03 Apr 2007) $
	$LastChangedRevision: 295 $
	$HeadURL: http://version.thedt.net/scripts/plusscripts/musicNowplaying/players/WMP.player.js $
*/

var WMP = function(){
	this.playerHwnd = this.isOpen();
	if(this.playerHwnd){
		this.open = true;
		this.wmp = Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'InitPlayer', "test");
	}
	
}

     function get_error(error){
        var msg = Interop.Allocate(1024);
        Interop.Call("Kernel32", "FormatMessageW", 0x1000, 0, error, 0, msg, 1024, 0);
        return msg.ReadString(0);
    }
    
WMP.prototype = {
	"open" : false,
	"isOpen" : function(){
		return Interop.Call('User32','FindWindowW','WMPlayerApp',0);
	},
	
	"Play" : function(){
		this._sendCmd("play")
	},
	"Pause" : function(){
		this._sendCmd("playpause")
	},
	
	"_sendCmd" : function(cmd){
		return Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'sendCmd', this.wmp, cmd, 0);
	},
	
	"_getState" : function(cmd){
	
		var state = Interop.Allocate(50);
		var x = Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'getState', this.wmp, cmd, state);
		return state.ReadString(0);
	},
	"_getText" : function(cmd, cbText){
		if(typeof(cbText) == "undefined") var cbText = 500;
		var text = Interop.Allocate(cbText);
		var x = Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'getText', this.wmp, cmd, text, cbText);
		return text.ReadString(0);
	},
	"_getProp" : function(cmd, propId){
		var x = Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'getProp', this.wmp, cmd, propId);
		return x;
	},
	
	
	"Stop" : function(){
		this._sendCmd("stop")
	},
	
	"Next" : function(){
		this._sendCmd("next")
	},
	
	"Prev" : function(){
		this._sendCmd("prev")
	},
	
	"GotoInSong" : function(milliseconds){
		//this.player.PlayerPosition = (milliseconds /1000);
	
	},
	
	"setVolume" : function(num){
		this.player.SoundVolume = num;
	},
	
	"PlaylistLength" : function(){
		
	},
	
	"PlaylistPosition" : function(){
		

	},
	
	"Status" : function(){
		var state = this._getState('playpause');
		switch(state){
			case "play" : return 1;
			case "pause" : return 3;
			default : return 2;
		}
	},
	
	"SongPosition" : function(format){
		if(typeof(format) != 'undefined' && format){
			return this._getText('tracktime');
		}else{
			return this._getProp('tracktime', 5);
		}
	},
	
	"SongLength" : function(format){
		if(typeof(format) != 'undefined' && format){
			return this.toMinutes(this._getProp('tracktime', 3));
		}else{
			return this._getProp('tracktime', 3);
		}
	},
	
	"CurrentFilename" : function(){
		return this._getText('path',4092);
	},
	
	    
    "get_error" : function (error){
        var msg = Interop.Allocate(1024);
        Interop.Call("Kernel32", "FormatMessageW", 0x1000, 0, error, 0, msg, 1024, 0);
        return msg.ReadString(0);
    },
	
	"CurrentTrack" : function(){

		
		var artist = this._getText('artist',4092);
		var title = this._getText('title',4092);
		
	
	
		return {"Title": title, 'Artist' : artist};
	},
	
	"getAlbum" : function(){
		return this._getText('album',4092);
	},
	
	"getBitrate" : function(){
		return this._getText('bitrate', 4092);
	},
	
	"getYear" : function(){
	
	},
	
	"getSampleRate" : function(){
		return "";
	},
	
	"toSeconds" : function(time){
		var x = time.split(':');
		var seconds = parseInt(x[0]) * 60;
		seconds = seconds + parseInt(x[1]);
		return seconds;
	},
	
	"toMinutes" : function(posSec){

		if(posSec > 60){
			var min = Math.floor(posSec / 60);
			var sec = Math.floor(posSec % 60); // :D go the division remainder operator
			if(min < 10)min = '0' + min;
			if(sec < 10)sec = '0' + sec;
			return min + ':' + sec;
		}else{
			if(posSec < 10)posSec = '0' + posSec;
			return '00:' + posSec; 
		}
	
	},
	
	"__destruct" : function(){
		//Interop.Call(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll", 'DestroyPlayer', this.wmp);
		Interop.FreeDll(MsgPlus.ScriptFilesPath + "\\dlls\\wmp9.dll");
	}
	




}



//register for a custom command
/*addEventListener("OnEvent_ChatWndSendMessage", "WMP", function(wnd, message, ob){
	if(message == "/wnp")ob.text = sendCurrentSong('WMP');
});

addEventListener("OnGetScriptCommands", "WMP", function(commands){
	commands.push({
		"Name" : "wnp",
		"Description" : "Displays WMPs current song",
		"Parameters" : ""
	});
});*/
