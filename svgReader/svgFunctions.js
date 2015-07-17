function unitStrip(e) { //strip the weird svg unit format and convert it to pixels
    if (e.indexOf("mm") > -1) {
        e = e.substr(0, e.indexOf("mm"));
        e = e * 3.779527559
    } else if (e.indexOf("pt") > -1) {
        e = e.replace(/([0-9]+)pt/g, function (e, t) {
            return Math.round(parseInt(t, 10) * 96 / 72)
        })
    } else if (e.indexOf("px") > -1) {
        e = e.substr(0, e.indexOf("px"))
    }
    return e
}
var fillSelected = function (t, d, f) { //t = this, d = data object, f determines whether it's a child or not
    if (f != "c") { //if the element is not a child, it's the element that should be selectable
        $(t).attr("class", "selectable");
        $(t).attr("data-value", d.val.qIndex);
    }

    $(t).attr("fill", d.color);
    $(t).attr("style", "");
    $(t).css("opacity", "");
}

var colorIt = function (me, d, arrJ, par) {

    var lid = me.id.toLowerCase();
    if (((lid in arrJ) || (par)) && (me.tagName == "g")) { //if this element hooks to the data (ot its parent does) and it's a g (group)type svg element 

        $.each(me.children, function () { //for each of the g's children, either color it or loop again (if the child is a g)

            if (this.tagName == "g") {
                colorIt(this, d, arrJ, true)
            } else {
                fillSelected(this, d, "c");
            }
        });
      if(lid in arrJ){ //if it's a g element and the id matches to the data add the selectable class and data-value
        $(me).attr("class", "selectable");
        $(me).attr("data-value", d.val.qIndex);
        
      }
        $(me).attr("style", "");
        $(me).css("opacity", "");
    } else if ((lid in arrJ) || (par)) { //not a g, it's its own thing...
        fillSelected(me, d, "o");
    } else if (($(me).css("fill") != "none") && !(me.parentNode.id in arrJ) && (par != true)) { //this svg element means nothing to us, data-wise
        $(me).css("fill", d.color);
        $(me).attr("fill", d.color);
    }
}