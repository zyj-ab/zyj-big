$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 调用layul 
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则 \s
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义一个函数
        repwd: function (value) {
            // 获得reg-box里面name=passward的值
            var repwd = $('.reg-box [name=password]').val();
            // 对比值是否相等
            if (repwd != value) {
                return '错误,两次不一样'
            }
        }

    })
    var layer = layui.layer
    // 提交表单
    $('#form_reg').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        // Ajax
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('成功')
            $('#link_login').click()
        })
    })
    // 获得登录表单提交
    $('#form_login').submit(function (e) {
        e.preventDefault();
        // ajax
        $.ajax({
            type: "POST",
            url: '/api/login',
            // 获得表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("失败")
                }
                layer.msg('成功')
                // 登录成功后得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转主页
                location.href = "/index.html"
            }

        });
    })

})