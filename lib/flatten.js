
// Some of the trait names can be misunderstood by lay people,
// make them a bit more approachable for the lay person 
var NAME_SUBST = {
  "Anger": "Fiery",
  "Anxiety": "Prone to worry",
  "Depression": "Melancholy",
  "Vulnerability": "Susceptible to stress",
  "Liberalism": "Authority-challenging",
  "Morality": "Uncompromising",
  "Friendliness": "Outgoing",
  "Neuroticism": "Emotional range"
}

// Aux function to flatten the traits structure returned by the User Modeling service
var flatten = function(/*object*/ tree) {
  var arr = [], f = function(t, level) {
    if (!t) return;
    //Check if the trait name can be replaced
    if (NAME_SUBST[t.name])
      t.name = NAME_SUBST[t.name];

    if (level>0 && (!t.children || level!=2)) {
      arr.push({
        'id'   : t.name,
        'title': t.children ? true : false,
        'value': t.percentage ? Math.floor(t.percentage*100)+"%" : '',
      });
    }
    if (t.children && t.id!='sbh') {
      for (var i=0; i<t.children.length; i++) {
        f(t.children[i], level+1);
      }
    }
  };
  f(tree, 0);
  return arr; 
}
module.exports.flat = flatten;