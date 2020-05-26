var currentTitle = $("#current-year-month");
var calendarBody = $("#calendar-body");
var mainTodayDay = $("#main-day");
var mainTodayDate = $("#main-date");
var today = new Date();

var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
var pageYear;
var tdGroup = [];

if(first.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);
            }else{
                var $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.append($tr);
    }
    console.log(pageYear[first.getMonth()]);
    currentTitle.html(monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear());
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

showCalendar();
function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

$("#prev").click(function prev() {

    if (pageFirst.getMonth() === 1) {
        pageFirst = new Date(first.getFullYear() - 1, 12, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    currentTitle.html(monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear());
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
});

$("#next").click(function next() {

    if (pageFirst.getMonth() === 12) {
        pageFirst = new Date(first.getFullYear() + 1, 1, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.html(monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear());
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
});

function showMain(){
    mainTodayDay.html(dayList[today.getDay()]);
    mainTodayDate.html(today.getDate());
}

var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');
// var prevBtn = $("#prev");
// var nextBtn = $("#next");
// prevBtn.addEventListener('click',prev);
// nextBtn.addEventListener('click',next);

function clickStart(){
    for(var i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}
function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    reshowingList();
}

function reshowingList(){

    var dateValue = getFormatDate(today);

    $.ajax({
        url: "/list/" + dateValue,
        type: "GET",
        success: function (result) {
            var printHTML = '';
            $.each(result, function (key, value) {
                if (value.todoDate == dateValue) {
                    printHTML += '<div id="' + value.id + '">';
                    printHTML += value.content;
                    printHTML += '</div>';
                    printHTML += '<button type="button" class="del-data" onclick="deleteTodoList('+ value.id +')">';
                    printHTML += 'X';
                    printHTML += '</button>';
                }
            });
            $("#input-list").html(printHTML);
        },
        error: function (request, status, error) {
            alert("code = " + request.status + " message =  " + request.responseText + "error = " + error);
        }

    });

}
var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();

$("#input-data").click(function addTodoList() {
    var dateValue = getFormatDate(today);
    $("#todoDate").val(dateValue);


    console.log(dateValue);
    console.log("val : " + $("#content").val());
    var data = $("#input_frm").serialize();

    console.log(data);
    $.ajax({
        url: "/insert",
        type: "post",
        data: data,
        success: function (data) {
            reshowingList();
        },
        error: function (request, status, error) {
            alert("code = " + request.status + " message =  " + request.responseText + "error = " + error);
        }
    });
});

function deleteTodoList(id) {
    $.ajax({
       url:"/delete/"+id,
       type:"delete",
        success: function (result) {
           if(result == 'delete') {
               alert("삭제되었습니다.");
               reshowingList();
           }
        },
        error: function (request, status, error) {
           alert("code = " + request.status + " message =  " + request.responseText + "error = " + error);
        }

    });
}




function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;
}

function checkList(e){
    e.currentTarget.classList.add('checked');
}