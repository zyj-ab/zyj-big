$(function () {
    getUserInfo()
})
// 创建函数
function getUserInfo() {
    // 发起ajax get
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取头像失败')
            }
            // 渲染头像函数
            renderAvatar(res.data)
        },
        // 无论调取函数成功还是失败都会调用
        complete: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
              // 1. 强制清空 token
              localStorage.removeItem('token')
              // 2. 强制跳转到登录页面
              location.href = '/login.html'
            }
          }
    });
}
// token9ueeeje
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}

// function renderAvatar(user) {
//     // 1. 获取用户的名称
//     var name = user.nickname || user.username
//     // 2. 设置欢迎的文本
//     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//     // 3. 按需渲染用户的头像
//     if (user.user_pic !== null) {
//       // 3.1 渲染图片头像
//       $('.layui-nav-img')
//         .attr('src', user.user_pic)
//         .show()
//       $('.text-avatar').hide()
//     } else {
//       // 3.2 渲染文本头像
//       $('.layui-nav-img').hide()
//       var first = name[0].toUpperCase()
//       $('.text-avatar')
//         .html(first)
//         .show()
//     }
//   }