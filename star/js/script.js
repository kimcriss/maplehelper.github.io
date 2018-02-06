	function calc()
	{
		var star = document.getElementById("star").value;
		var total = document.getElementById("total").value;
		var added = document.getElementById("added").value;
		var cur = total-added;
		var stan = document.getElementById("stan").value;

		var minus=0;

		var result = "<table><tr><th>스타포스 수</th><th>추옵포함 공격력 / 마력</th><th>추옵제외 공격력 / 마력</th></tr><tr><td>" + star + "성</td><td>" + total + "</td><td>" + cur + "</td></tr>";
		for (var s_star = star - 1; s_star >= 0; s_star--)
		{
			if (s_star <= 14)
			{
				var temp = parseInt(cur / 50) + 1;
				minus = (parseInt((cur - temp) / 50) == parseInt(cur / 50) ? temp : temp - 1);
			}
			else if (15 <= s_star && s_star <= 21)
			{
				switch (s_star)
				{
					case 15:
						minus = 8;
						break;
					case 16:
						minus =  9;
						break;
					case 17:
						minus =  9;
						break;
					case 18:
						minus =  10;
						break;
					default:
						minus =  s_star - 8;
						break;
				}
			}
			cur = cur - minus;
			var curadded = parseInt(cur) + parseInt(added);
			result = result + "<tr><td>" + s_star + "성</td><td>" + curadded + "</td><td>" + cur + "</td></tr>";
		}
		var curstan = parseInt(cur)-parseInt(stan);
		result = result + "<tr></tr><tr><td></td><th>주흔 작</th><td bgcolor=yellow>" + curstan + "</td></table>";
		
		document.getElementById("output").innerHTML = result + "</table>";
	}