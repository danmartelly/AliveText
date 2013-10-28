console.log("Hey you!");
localStorage.prefs="NN#font-size#130%#NN#font-weight#bold#NN#font-variant#small-caps#";
localStorage.prefs=localStorage.prefs+"NNP#font-size#130%#NNP#font-weight#bold#NNP#font-variant#small-caps#";
localStorage.prefs=localStorage.prefs+"IN#font-weight#bold#IN#font-size#120%#IN#color#red#";
localStorage.prefs=localStorage.prefs+"JJ#text-decoration#italic#JJ#color#blue#";
localStorage.prefs=localStorage.prefs+"JJ#text-decoration#italic#JJ#color#lightblue#JJ#font-size#110%#";
localStorage.prefs=localStorage.prefs+"JJR#text-decoration#italic#JJ#color#blue#JJ#font-size#120%#";
localStorage.prefs=localStorage.prefs+"JJS#text-decoration#italic#JJ#color#darkblue#JJ#font-size#130%#";
var divs = document.getElementsByTagName("p");

for(var j = 0; j < divs.length; j++){
  var d=lexify(divs[j]);
  console.log(d);
  divs[j].innerHTML=d;
}


function lexify(element){
  var result = "";
  for(var j = 0; j < element.childNodes.length; j++){
    var child = element.childNodes[j];
    console.log(child);
    if (child.children && child.nodeName!="A"){
      console.log("Recurse!");
      result+=lexify(child);
    }
    else{
      if (child.nodeName=="A"){
        console.log("A link!");
        result+= " <a href='"+child.toString()+"' title='"+child.text+"'>"+child.text+"</a>";
      }else{
        var words=new Lexer().lex(child.textContent);
        var taggedWords = new POSTagger().tag(words);
        for (var i=0;i<taggedWords.length;i++) {
          var taggedWord = taggedWords[i];
          var word = taggedWord[0];
          var tag = taggedWord[1];
          if (false){
            result += ("<span class='"+tag+"'>"+word+"&nbsp;</span>");
          }
          else{
            if (i<taggedWords.length-1){var word2 = taggedWords[i+1][0];}
            else{var word2 = "xxx"};
            console.log("word1: "+word);
            console.log("word2: "+word2);

            // Note the use of document.writeln instead of print
            if([',', '.', ':','?','!',"<",">","'","\"","/",")","(","[","]"].indexOf(word2) >= 0){
              result += ("<span class='"+tag+"'> "+word+"</span>");
              console.log("no space");
            }
            else{
              if([',', '.', ':','?','!',"<",">","'","\"","/",")","(","[","]"].indexOf(word) >= 0){
                result += ("<span class='"+tag+"'> "+word+"</span>");
                console.log("no space");
              }
              else{
                result += ("<span class='"+tag+"'> "+word+"</span>");
                console.log("space");
              }
            }
          } 
        }
      }
    }
  }
  var result = result.replace(/(&nbsp;| )+([\>\!\?,\.\)\]])/g, "$2");
  var result = result.replace(/([\(\[\<])(&nbsp;| )+/g, "$1");
  return result;
}


var prefs=localStorage.prefs.split("#");
prefs.pop();
for (k=0;k<prefs.length/3;k++){
  console.log("FORMAT");
  var elems = document.getElementsByClassName(prefs[3*k]);
  console.log(prefs[3*k]);
  console.log(prefs[3*k+1]);
  console.log(prefs[3*k+2]);
  $("."+prefs[3*k]).css(prefs[3*k+1],prefs[3*k+2]);
}

