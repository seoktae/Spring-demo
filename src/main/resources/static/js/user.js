$("#password").keyup(function () {
    pwCheck();
});
$('#password2').keyup(function () {
    pwconCheck();
});

//비밀번호 체크
function pwCheck(obj) {
    var frm = document.join_frm;
    //var PT_pwtype = /^(?=([a-zA-Z]+[0-9]+[a-zA-Z0-9]*|[0-9]+[a-zA-Z]+[a-zA-Z0-9]*)$).{6,18}/;
    //var PT_pwtype = /^(?=([a-zA-Z0-9]+[!,@,#,$,%,^,&,*,?,_,~]*)|([!,@,#,$,%,^,&,*,?,_,~]+[a-zA-Z0-9])$).{6,18}/;
    var PT_pwtype = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{6,18}$/;
    pwconCheck(obj);
    if (!PT_pwtype.test(frm.password.value)) {
        $("#pwconcheck_text").css("color", "#FF5A00").html('영문 대소문자, 숫자 및 특수문자 6~18자 조합 입력하세요.');
        //6~18 자리의 영문과 숫자 조합이어야만 합니다
        $("#passChk").val('N');
        return false
    } else {
        if (frm.password.value.length < 6 || frm.password.value.length > 18) {
            $("#pwconcheck_text").css("color", "#FF5A00").html('영문 대소문자, 숫자 및 특수문자 6~18자 조합 입력하세요.');
            //6~18 자리의 영문과 숫자 조합이어야만 합니다
            $("#passChk").val('N');
            return false
        }
        $("#pwconcheck_text").css("color", "#00B050").html('이 비밀번호는 사용가능 합니다.');
        //이 비밀번호는 사용할 수 있습니다
        $("#passChk").val('Y');
    }
}

function pwconCheck(obj) {
    var frm = document.join_frm;
    if (frm.password.value.length > 0 && frm.password2.value.length > 0) {
        if (frm.password.value != frm.password2.value) {
            $("#pwconcheck_textRe").css("color", "#FF5A00").html('비밀번호가 일치하지 않습니다.');
            //비밀번호가 일치하지 않습니다
            $("#confChk").val("N");
            return false;
        }
        $("#pwconcheck_textRe").css("color", "#00B050").html('비밀번호가 일치합니다.');
        //'비밀번호가 일치합니다.'
        $("#confChk").val("Y");
    } else {
        $("#pwconcheck_textRe").html('');
        $("#pw_con_flag").val('N');
        return false;
    }
}

$("#userName").blur(function(){
    $.ajax({
        url : "/user/idcheck/" + $("#userName").val(),
        type : "GET",
        success: function(result) {
            if(result == 1) {
                $("#id_check").css("color","#FF5A00").html("중복된 아이디가 있습니다.");
                $("#idChk").val('N');
            } else {
                $("#id_check").css("color","#00B050").html("사용가능합니다.");
                $("#idChk").val('Y');
            }
        },
    })
});

function insertChk() {
    var frm=document.join_frm;

    if($("#idChk").val() == 'N'){
        frm.userName.focus();
        return false;
    }
    if ($("#passChk").val() == 'N') {
        frm.password.focus();
        return false;
    }
    if ($("#confChk").val() == 'N') {
        frm.password2.focus();
        return false;
    }
}

