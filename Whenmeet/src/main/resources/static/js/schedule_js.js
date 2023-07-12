/**
 * 
 */
//방장의 관리
function IamHost(){
	$("#SubHostForm").show();
}
//부방장의 관리
function IamSubHost(){
	
}
//슬라이드 테이블
var slidecount = 1;
function slideTable(max, LR){
	var ul = $("#tableSlide ul");
	var ul2 = $("#tableSlide2 ul");
	
	if (LR == 0 && slidecount > 1){
		slidecount--;
	}		
	else if (LR == 1 && slidecount < max){
		slidecount++;
	}
	
	ul.css({
			"transform": "translateX("+(-680*(slidecount-1))+"px)"
	});
	ul2.css({
			"transform": "translateX("+(-660.8*(slidecount-1))+"px)"
	});
	
	if(max == 1){
		$(".total_table_left").css("color", "#C9C9C9");
		$(".total_table_right").css("color", "#C9C9C9");
	}else{
		$(".total_table_right").css("color", "#F25287");
	}
	if (slidecount == 1){
		$(".total_table_left").css("color", "#C9C9C9")
	}else{
		$(".total_table_left").css("color", "#F25287")
	}
	if (slidecount == max){
		$(".total_table_right").css("color", "#C9C9C9")
	}else{
		$(".total_table_right").css("color", "#F25287")
	}
}

//d-day 업데이트하기
function DdayUpdate(){
	var Dday = $("#Dday").children('span').eq(1);
	var finalDate = $("#Dday").children('span').eq(2);
	var finalTime = $("#Dday").children('span').eq(3);
	
	var date = $("#finalDate").val();
	var startTime = $("#finalStartTime").val();
	var endTime = $("#finalEndTime").val();
	
	var temp = date.split("-");
	var Day = getDayOfWeek(temp);
	var today = new Date();
	Ddate = new Date(date);
	
	if (today > Ddate || date == ""){
		alert("정확한 날짜를 입력해주세요.");
		return false;
	}
	else if (today.getFullYear() == Ddate.getFullYear() && today.getMonth() == Ddate.getMonth() && today.getDate() == Ddate.getDate()){
		Dday.text("Today");
	}else{
		Dday.text(
		Math.ceil(Math.abs((Ddate.getTime() - today.getTime())/(1000*60*60*24)))-1
		);
	}
	$(this).attr("alt", 1);
	
	finalDate.text(temp[0]+"년 "+ temp[1]+"월 "+temp[2]+"일 ("+Day+")");
	
	if(startTime == ""){
		startTime = "미정";
	}
	if(endTime == ""){
		endTime = "미정";
	}
	
	finalTime.text(startTime + " - " + endTime);
	
	$("#Dday_edit").hide();
	$("#Dday").show();
}
//리스트 삭제하기
function deleteBtn(element){
	var temp = $("#DoItContainer");
	temp = temp.children();
	temp = temp.children().eq(element);
	var result = confirm("하위 항목이 모두 사라집니다. 정말로 삭제하시겠습니까?");
	if(result){
		temp.remove();
	}else{
		return false;
	}	
}
function deleteBtn2(element){
	var temp = $("#DoItListChild");
	temp = temp.children().eq(element);
	var result = confirm("정말로 삭제하시겠습니까?");
	if(result){
		temp.remove();
	}else{
		return false;
	}	
}
//간트차트 수정화면 자식리스트 열기
function openDoItList(element){
	var var1 = "#DoItCheck" + element;
	var var2 = "#DoItListChild" + element;
	var checkbox = $(var1);
	var childUl = $(var2);
	
	if($(checkbox).attr("alt") == "0"){
		childUl.show();
		$(checkbox).attr("alt" , "1");
	}else{
		childUl.hide();
		$(checkbox).attr("alt",  "0");
	}
}
//디데이 달력, 시간 표시하기
function changeDate(){
	var result = $("#finalDate").val();
	$("#DdayEditDate").text("날짜 : " + result);
}
function changeTime1(){
	var result = $("#finalStartTime").val();
	$("#DdayEditTime1").text("시작 시각 : " + result);
}
function changeTime2(){
	var result = $("#finalEndTime").val();
	$("#DdayEditTime2").text("종료 시각 : " + result);
}
//일정표 기간 표시하기
function getDayOfWeek(string){
	var day = new Date(string[0], string[1]-1, string[2]);
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[day.getDay()];

    return dayOfWeek;

}
function changeWeek(today){
	var result1 = $("#firstDate").val();
	var result2 = $("#EndDate").val();
	
	if (result1 == "" || result2 == ""){
		alert("기간을 입력해주세요.");
		return false;
	}
	
	var results1 = result1.split("-");
	var results2 = result2.split("-");
	var today = today.split(" ");
	today = today[0].split("/");
	var temp1 = results1[0]+results1[1]+results1[2];
	var temp2 = results2[0]+results2[1]+results2[2];
	today = today[0]+today[1]+today[2];
	temp1 *= 1;
	temp2 *= 1;
	today *= 1;
	
	if (temp1 > temp2){
		alert("올바른 기간을 입력해주세요.");
		return false;
	} else if (temp1 < today){
		alert("오늘 이전의 날짜는 입력할 수 없습니다.");
		return false;
	}
	else{
		$("#updateDateView .first").text(results1[0]+"/"+results1[1]+"/"+results1[2]+ " ("+getDayOfWeek(results1)+")");
		$("#updateDateView .second").text(results2[0]+"/"+results2[1]+"/"+results2[2]+ " ("+getDayOfWeek(results2)+")");	
		tbDateChange($("#updateDateView .first").text(), $("#updateDateView .second").text());
		WpopClose();
	}
}

function tbDateChange(start, end){	// 입력 : 2000/00/00 (월)
	var start = start.split(" ")[0];
	var end = end.split(" ")[0];
	var startList = start.split("/");
	var endList = end.split("/");
	
	var DateStart = new Date(startList[0], startList[1]-1, startList[2]);
	var DateEnd = new Date(endList[0], endList[1]-1, endList[2]);
	
	var firstWeekStart = DateStart;
	var firstWeekEnd = DateStart;
	var lastWeekStart = DateEnd;
	var lastWeekEnd = DateEnd;
	
	firstWeekStart = new Date(firstWeekStart.setDate(DateStart.getDate()-DateStart.getDay()));	
	firstWeekEnd = new Date (firstWeekEnd.setDate(firstWeekStart.getDate()+6));
	lastWeekStart = new Date(lastWeekStart.setDate(DateEnd.getDate()-DateEnd.getDay()));	
	lastWeekEnd = new Date (lastWeekEnd.setDate(lastWeekStart.getDate()+6));
	
	var diffTime = Math.abs(lastWeekStart-firstWeekStart);
	var diffWeeks = Math.ceil(diffTime/(1000*60*60*24))/7+1;
	
	var result = firstWeekStart.getFullYear()+ changeMM(firstWeekStart.getMonth()) + changedd(firstWeekStart.getDate()) + "*" 
						+ firstWeekEnd.getFullYear()+ changeMM(firstWeekEnd.getMonth()) + changedd(firstWeekEnd.getDate()) + "*"
						+ diffWeeks;
	$("#updateTableData").attr("value", result);
}
function changeMM(month){	//return : 문자열
	var month = (month+1)*1;
	var result = "";
	if(0<month && month<10){
		month+="";
		result = "0"+month;
	}else{
		return month+="";
	}
	return result;
}
function changedd(day){	//return : 문자열
	var day = day*1;
	var result = "";
	if(0<day && day<10){
		day+="";
		result = "0"+day;
	}else{
		return day+="";
	}
	return result;
}
// table 컬러 바꾸기
function tbColorChange(element){
	if( $(element).attr("alt") != "1"){
	$(element).css({
		"background" : "rgba(242, 82, 135, 1)"
	});
	$(element).attr("alt", "1");
	}
	else if ($(element).attr("alt") == "1"){
		$(element).css({
		"background" : "rgba(0,0,0,0)"
	});
	$(element).attr("alt", "0");
	}
}

//유저 팝업을 열기
function popOpen(id, name, address, phone, email, profile, host, subhost){
	var modalPop = $('.user_modal');
	var modalBg = $('.user_modal_bg');
	//이름
	$(".modalUserName").text(name);address
	//프사
	$(".user_modal_content .userProfile").attr("src", profile);
	//부방장등록버튼
	$("#SubHostForm").children('input').eq(0).attr("value", id);

	if (host == "1"){
		$(".SubHostBtn1").hide();	
		$(".SubHostBtn2").hide();	
	}
	if (subhost == "1"){
		$("#SubHostForm").children('input').eq(1).attr("value", "0");
		$(".SubHostBtn1").hide();
		$(".SubHostBtn2").show();
	}else{
		$("#SubHostForm").children('input').eq(1).attr("value", "1");
	}
	//아이디
	$(".profileText").children('span').eq(0).text("@"+id);
	//주소
	$(".profileText").children().children('span').eq(0).children('a').text(" "+address);
	//전화번호
	$(".profileText").children().children('span').eq(1).children('a').text(" "+phone);
	//이메일
	$(".profileText").children().children('span').eq(2).children('a').text(" "+email);
	$(modalPop).show();
	$(modalBg).show();
}
//유저 팝업 닫기
function popClose(){
	var modalPop = $('.user_modal');
	var modalBg = $('.user_modal_bg');
	$(modalPop).hide();
	$(modalBg).hide();
	$(".SubHostBtn1").show();	
	$(".SubHostBtn2").hide();	
	$("#SubHostForm").children('input').eq(1).attr("value", "0");
}
//주 팝업을 열기
function WpopOpen(){
	var modalPop = $('.week_modal');
	var modalBg = $('.week_modal_bg');
	$(modalPop).show();
	$(modalBg).show();
}
//주 팝업 닫기
function WpopClose(){
	var modalPop = $('.week_modal');
	var modalBg = $('.week_modal_bg');
	$(modalPop).hide();
	$(modalBg).hide();
}
//할일 팝업을 열기
function DpopOpen(element, childs){
	var list = $("#DoItListChild");
	var child = [];
	child = childs.split(",");
	child[0] = child[0].replace("[", "");
	child[child.length-1] = child[child.length-1].replace("]", "");
	
	var modalPop = $('.DoIt_modal');
	var modalBg = $('.DoIt_modal_bg');
	
	$(".modalDoItName").text(element);
	
		
	for (var i = 0; i < child.length; i++){
		list.append('<li><div class = "DoItListItem" style = "width : 98%; " >&nbsp;'+child[i]+'</div></li>');
		$("#DoItListChild").children().eq(i).children().append('<button type = "button" class = "deleteBtn" onclick="deleteBtn2('+i+')">✕</button>');
	}
	$(modalPop).show();
	$(modalBg).show();
}
//할일 팝업 닫기
function DpopClose(){
	var list = $("#DoItListChild *");
	var modalPop = $('.DoIt_modal');
	var modalBg = $('.DoIt_modal_bg');
	$(modalPop).hide();
	$(modalBg).hide();	
	list.remove();
}

//로딩창 종료하기
function loadingClose(){
	var loadPage = $(".loader");
	$(loadPage).hide();
}


$(document).ready(function () {
	
	//버튼 조작
	let dateP = $("#meeting_date");
	let locateP = $("#meeting_location");
	let ganttP = $("#gantt_chart");
	let detailP = $("#group_detail");

	let dateB = $("#meeting_date_btn");
	let locateB = $("#meeting_location_btn");
	let ganttB = $("#gantt_chart_btn");
	let detailB = $("#group_detail_btn");
	
	dateB.css({
				"background-color" : "#f25287", "color" : "white",
				"border" :	"3px solid #b40347", "filter" : "drop-shadow(6px 5px 5px white)"
			});	
	
	dateB.click( function(){
			dateP.show();
			locateP.hide();
			ganttP.hide();
			detailP.hide();
			$(".btns2").css({
				"background-color" : "white", "color" : "black",
				"border" :	"3px solid #f25287", "filter" : "None"
			});
			dateB.css({
				"background-color" : "#f25287", "color" : "white",
				"border" :	"3px solid #b40347", "filter" : "drop-shadow(6px 5px 5px white)"
			});			
	});
	locateB.click( function(){
			dateP.hide();
			locateP.show();
			ganttP.hide();
			detailP.hide();
			$(".btns2").css({
				"background-color" : "white", "color" : "black",
				"border" :	"3px solid #f25287", "filter" : "None"
			});
			locateB.css({
				"background-color" : "#f25287", "color" : "white",
				"border" :	"3px solid #b40347", "filter" : "drop-shadow(6px 5px 5px white)"
			});		
	});
	ganttB.click( function(){
			dateP.hide();
			locateP.hide();
			ganttP.show();
			detailP.hide();
			$(".btns2").css({
				"background-color" : "white", "color" : "black",
				"border" :	"3px solid #f25287", "filter" : "None"
			});
			ganttB.css({
				"background-color" : "#f25287", "color" : "white",
				"border" :	"3px solid #b40347", "filter" : "drop-shadow(6px 5px 5px white)"
			});		
	});
	detailB.click( function(){
			dateP.hide();
			locateP.hide();
			ganttP.hide();
			detailP.show();
			$(".btns2").css({
				"background-color" : "white", "color" : "black",
				"border" :	"3px solid #f25287", "filter" : "None"
			});
			detailB.css({
				"background-color" : "#f25287", "color" : "white",
				"border" :	"3px solid #b40347", "filter" : "drop-shadow(6px 5px 5px white)"
			});		
	});

/* 미팅 일정 */
$("#ScheduleSaveBtn").click(function(){
	$("#total_table").show();
	$("#chart_area").css({
		"border" : "None"
	});
	$("#timeTable").hide();
})
$("#ScheduleEditBtn").click(function(){
	$("#total_table").hide();
	$("#chart_area").css({
		"border" : "5px solid #F25287"
	});
	$("#timeTable").show();
})
$(".editDate").click(function(){
	var today = new Date();
	$("#Dday_edit").show();
	$("#DdayInit").hide();
	$("#Dday").hide();
})
$("#endEditDate").click(function(){
	$("#Dday_edit").hide();
	if ($("#Dday_frm .submitBtn").attr("alt") == 1){
		$("#DdayInit").hide();
		$("#Dday").show();
	}else{
		$("#DdayInit").show();
	}
})

});