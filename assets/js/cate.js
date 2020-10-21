initArtCateList()
var layer = layui.layer
var form = layui.form
// 获取文章分类的列表
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}
var indexAdd = null
// 添加
$('#btnAddCate').on('click', function () {
    layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
    })
})
// 事件委托
$("body").on('submit', "#form-add", function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            initArtCateList()
            layer.msg('成功')
            layer.close(indexAdd)
        }
    });
})
// 编辑按钮
var indexEdit = null
$('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
    })
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            form.val('form-edit', res.data)
        }
    })
})
var id = $(this).attr('data-id')
// 发起请求获取对应分类的数据
$.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,
    success: function (res) {
        form.val('form-edit', res.data)
    }
})
// 编辑事件委托
$("body").on('submit', "#form-edit", function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            layer.msg('成功')
            layer.close(indexEdit)
            initArtCateList()

        }
    });
})
// 删除
// 事件委托
$('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除分类失败！')
                }
                layer.msg('删除分类成功！')
                layer.close(index)
                initArtCateList()
            }
        })
    })
})