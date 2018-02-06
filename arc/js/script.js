var sonlevel = 0;
var sonexp = 0;
var soneedexp = 0;
var sodaily = 0;
var soarc = 0;
var sototalcost = 0;
var sototalexp = 0;

var chunlevel = 0;
var chunexp = 0;
var chuneedexp = 0;
var chudaily = 0;
var chuarc = 0;
var chutotalcost = 0;
var chutotalexp = 0;

var renlevel = 0;
var renexp = 0;
var reneedexp = 0;
var redaily = 0;
var rearc = 0;
var retotalcost = 0;
var retotalexp = 0;

var totalcost = 0;

var arc = 0;
var totalarc = 0;
var maxarc = 0;

var maxlevel = 15;

function calc_arc(level) {
	level = parseInt(level);
	if (level == 0) {
		return 0;
	} else {
		return 20 + (level*10);
	}
}
 
function calc_needexp(level) {
	level = parseInt(level);
	return (level * level) + 11;
}

function calc_needcost(level) {
	level = parseInt(level);
	return 12440000 + (level * 6600000);
}
 
function levelup(level, nexp, needexp) {
	level = parseInt(level);
  nexp = parseInt(nexp);
  needexp = parseInt(needexp);
  var needcost = 0;
  if (level == maxlevel) {
    nexp = (nexp >= needexp) ? needexp : nexp;
    return {"level":level, "nexp":nexp, "needexp":needexp, "needcost":0, "arc":calc_arc(level)};
}
  while (nexp >= needexp) {
  	nexp = nexp - needexp;
    needcost = needcost + calc_needcost(level);
    level = level + 1;
    needexp = calc_needexp(level);
   }
   return {"level":level, "nexp":nexp, "needexp":needexp, "needcost":needcost, "arc":calc_arc(level)};
  }
  
function calc_totalarc() {
	totalarc = soarc + chuarc + rearc;
}

function calc_totalcost() {
	totalcost = sototalcost + chutotalcost + retotalcost;
}

function numbeComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function go() {
	var result = "";
  
  sonlevel = document.getElementById("sonlevel").value;
  sonexp = document.getElementById("sonexp").value;
  sodaily = document.getElementById("sodaily").value;
  
  chunlevel = document.getElementById("chunlevel").value;
  chunexp = document.getElementById("chunexp").value;
  chudaily = document.getElementById("chudaily").value;
  
  renlevel = document.getElementById("renlevel").value;
  renexp = document.getElementById("renexp").value;
  redaily = document.getElementById("redaily").value;
  
  arc = document.getElementById("arc").value;
  
  if((sonlevel<0) || (sonlevel>15) || (chunlevel<0) || (chunlevel>15) || (renlevel<0) || (renlevel>15)) {
    document.getElementById("result").innerHTML = "<table><tr><th>레벨을 0~15로 해주세요</th></tr></table>"
    return false;
  }

  soneedexp = calc_needexp(sonlevel);
  chuneedexp = calc_needexp(chunlevel);
  reneedexp = calc_needexp(renlevel);

  if((sonexp>soneedexp) || (chunexp>chuneedexp) || (renexp>reneedexp)) {
    document.getElementById("result").innerHTML = "<table><tr><th>현재 경험치 값을 제대로 입력해주세요</th></tr></table>"
    return false;
  }

  if((sodaily<0) || (sodaily>8) || (chudaily<0) || (chudaily>15) || (redaily<0) || (redaily>100)) {
    document.getElementById("result").innerHTML = "<table><tr><th>일일획득량은 각각 0~8, 0~15, 0~100개로 해주세요</th></tr></table>"
    return false;
  }

  if((sonlevel<0) || (sonlevel>15) || (chunlevel<0) || (chunlevel>15) || (renlevel<0) || (renlevel>15)) {
    document.getElementById("result").innerHTML = "<table><tr><th>레벨을 0~15로 해주세요</th></tr></table>"
    return false;
  }
  
  soarc = calc_arc(sonlevel);
  chuarc = calc_arc(chunlevel);
  rearc = calc_arc(renlevel);
  calc_totalarc();
  
  soneedexp = calc_needexp(sonlevel);
  chuneedexp = calc_needexp(chunlevel);
  reneedexp = calc_needexp(renlevel);
  
  sototalcost = 0;
  sototalexp = 0;
  chutotalcost = 0;
  chutotalexp = 0;
  retotalcost = 0;
  retotalexp = 0;
  calc_totalcost();
  var day = 0;

  var somax = (sodaily > 0) ? calc_arc(maxlevel) : 0;
  var chumax = (chudaily > 0) ? calc_arc(maxlevel) : 0;
  var remax = (redaily > 0) ? calc_arc(maxlevel) : 0;
  maxarc = somax + chumax + remax;

  if((arc>maxarc) || (arc<0)) {
    document.getElementById("result").innerHTML = "<table><tr><th>목표 ARC을 0 이상 " + maxarc + " 이하로 해주세요</th></tr></table>"
    return false;
  }

  if(totalarc >= arc) {
    document.getElementById("result").innerHTML = "<table><tr><th>이미 목표치를 도달하였습니다</th></tr></table>"
    return false;
  }

  while (totalarc < arc) {
  	sonexp = parseInt(sonexp) + parseInt(sodaily);
    chunexp = parseInt(chunexp) + parseInt(chudaily);
    renexp = parseInt(renexp) + parseInt(redaily);
    
    var solist = levelup(sonlevel, sonexp, soneedexp);
    var chulist = levelup(chunlevel, chunexp, chuneedexp);
    var relist = levelup(renlevel, renexp, reneedexp);
    
    sonlevel = solist["level"];
    sonexp = solist["nexp"];
    soneedexp = solist["needexp"];
    sototalcost = sototalcost + solist["needcost"];
    soarc = solist["arc"];
    
    chunlevel = chulist["level"];
    chunexp = chulist["nexp"];
    chuneedexp = chulist["needexp"];
    chutotalcost = chutotalcost + chulist["needcost"];
    chuarc = chulist["arc"];
    
    renlevel = relist["level"];
    renexp = relist["nexp"];
    reneedexp = relist["needexp"];
    retotalcost = retotalcost + relist["needcost"];
    rearc = relist["arc"];
    
    calc_totalarc();
    calc_totalcost();
    day = day + 1;
    result = result + "<tr><th colspan=2>" + day + "째 날</th></tr>" + "<tr><td>소멸의 여로</td>" + "<td>" + sonlevel + " ( " + sonexp + " / " + soneedexp + " )" + "</td></tr>" + "<tr><td>츄츄 아일랜드</td>" + "<td>" + chunlevel + " ( " + chunexp + " / " + chuneedexp + " )" + "</td></tr>" + "<tr><td>레헬른</td>" + "<td>" + renlevel + " ( " + renexp + " / " + reneedexp + " )" + "</td></tr>";
  }
result = result + "</table>";
result = "<table><tr><th>강화 비용</th><td bgcolor=yellow>" + numbeComma(totalcost) + " 메소</td></tr>" + result;
document.getElementById("result").innerHTML = result;
}