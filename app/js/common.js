// 统一的错误处理
var domainUrl = 'http://172.31.92.27';
var TOKEN = localStorage.getItem("token");
var util = {};
util.ajax = function (option) {
    var config = {
        type: "GET",
        url: "",
        timeout: 50000,
        data: "",
        async: true,
        dataType: "json",
        success: function() {},
        error: function () {},
        contentType: "application/json"
    };
    var setting = $.extend({}, config, option);
    // 判断是否传递userId和orgId
    var userId = getQueryString("userId");
    var orgId = getQueryString("orgId");
    var queryString = "";
    if (userId && orgId) {
        queryString = "userId=" + userId + "&orgId=" + orgId;
        if (setting.url.indexOf("?") !== -1) {
            queryString = setting.url + "&" + queryString;
        } else {
            queryString = setting.url + "?" + queryString;
        }
    } else {
        queryString = setting.url;
    }
    $.ajax({
        type: setting.type,
        url: setting.url,
        timeout: setting.timeout,
        headers: {token: TOKEN},
        data:  setting.data == "" ? "" : JSON.stringify(setting.data),
        async: setting.async,
        dataType: setting.dataType,
        contentType: setting.contentType,
        success: function (res) {
            if (res.code == "0") {
                if (setting.success) {
                    setting.success(res);
                }
            } else {
                $(document).dialog({
                    content: res.message,
                });
            }

        },
        error: function () {
            $(document).dialog({
                content: "网络错误，稍后尝试。",
            });
        }
    });
};