$(document).ready(function () {
Parse.initialize("M6uSTrv4wuanoSej3IEXvbYWliNAZ9USLBsnoCtv", "3re58AyuDpUjc4vcYvHxOcN864ZevZJh78GAAZYX");

var Team = Parse.Object.extend("Team");
var query = new Parse.Query(Team);
query.find({
    success: function(results) {
        var alive = [];
        var dead = [];
        for (var i=0; i<results.length;i++){
            var team = results[i];
            if (team.get("Alive")){
                alive.push(team);
            } else {
                dead.push(team);
            }
        }
        // add alive teams
        for (var i=0; i<alive.length;i++){
            var teamdiv = document.createElement("ul");
            var mem1 = document.createElement("li");
            var mem2 = document.createElement("li");
            teamdiv.className="team";
            mem1.className="member";
            mem2.className="member";
            mem1.innerHTML=alive[i].get("Member1");
            mem2.innerHTML=alive[i].get("Member2");
            teamdiv.appendChild(mem1);
            teamdiv.appendChild(mem2);
            
            var date = alive[i].get("LastKill");
            var lk = document.createElement("li");
            lk.className="lastkill";
            lk.innerHTML = "No kills";
            if (date.getFullYear() >= 2015){
                lk.innerHTML = "Last kill: " + (date.getMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getFullYear();
            }
            teamdiv.appendChild(lk);
            
            if (alive[i].get("HitList")){
                var imgtd = document.createElement("li");
                var img = document.createElement("img");
                img.className="hlTarg"
                img.src="cross.png"
                img.title="This team is on the hit list"
                
                if (alive[i].get("PurgeList")){
                    img.src="cross2.png"
                    img.title="This team is on the purge list"
                }
                imgtd.appendChild(img);
                teamdiv.appendChild(imgtd);
            }
            
            $("#teams").append(teamdiv);
        }
        document.getElementById("teamsleft").innerHTML = "Teams alive: " + alive.length;
        
        // add dead teams, at bottom, with strikethrough
        for (var i=0; i<dead.length;i++){
            var teamdiv = document.createElement("div");
            var mem1 = document.createElement("p");
            var mem2 = document.createElement("p");
            teamdiv.className="team";
            mem1.innerHTML=dead[i].get("Member1");
            mem2.innerHTML=dead[i].get("Member2");
            mem1.className="member dead";
            mem2.className="member dead";
            teamdiv.appendChild(mem1);
            teamdiv.appendChild(mem2);
            $("#teams").append(teamdiv);
        }
    },
    error: function(object, error) {
        
    }});
});
