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
              var teamdiv = document.createElement("div");
              var mem1 = document.createElement("p");
              var mem2 = document.createElement("p");
              teamdiv.className="team";
              mem1.className="member";
              mem2.className="member";
              mem1.innerHTML=alive[i].get("Member1");
              mem2.innerHTML=alive[i].get("Member2");
              teamdiv.appendChild(mem1);
              teamdiv.appendChild(mem2);
              $("#teams").append(teamdiv);
          }
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
          
      }
    });
});