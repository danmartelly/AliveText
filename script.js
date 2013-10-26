<script type="text/javascript">
// Note the \ at the end of the first line
var words = new Lexer().lex(document.getElementById("input_text").innerHTML);
var taggedWords = new POSTagger().tag(words);
var result = "";
for (i in taggedWords) {
  var taggedWord = taggedWords[i];
  var word = taggedWord[0];
  var tag = taggedWord[1];
  // Note the use of document.writeln instead of print
  result += ("<span class='"+tag+"'>"+word+"&nbsp;</span>");
}
document.getElementById("tagged_text").innerHTML = result;
</script>