var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}

// 过滤器
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    var y = padZero(dt.getFullYear()) 
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm =padZero( dt.getMinutes())
    var ss =padZero( dt.getSeconds())
    return y + '-' + m + '-' + d + '-' + hh + ':' + mm + ":" + ss
}
function padZero(n) {
    return n > 9 ? n : '0' + n
}


initTable()
// 获取文章列表数据的方法
function initTable() {
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败！')
            }
            // 使用模板引擎渲染页面的数据
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
        }
    })
}
initCate()
var form = layui.form;
function initCate() {
    $.ajax({
        type: "GET",
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取分类数据失败')
            }
            var htmlstr = template('tpl-cate', res)
            $('[name=cate_id').html(htmlstr)
            // layui 重新渲染表单区域的UI结构
            form.render()
        }
    });
}
// 下拉列表提交
$('#form-search').on('submit', function (e) {
    // 阻止事件
    e.preventDefault()
    // 获取列表值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 赋值给q
    q.cate_id = cate_id
    q.state = state
    // 调用渲染
    initTable()
})
// 调用layui的方法
var laypage = layui.laypage
// 渲染分页的方法
function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
        // 分页容器的 Id
        elem: 'pageBox',
        // 总数据条数
        count: total,
        // 每页显示几条数据
        limit: q.pagesize,
        // 设置默认被选中的分页
        curr: q.pagenum,//q.页码数
        // first值 如果是通过点击页码是jump方法执行，fist保存的是undefined
        //如果jump方法是应为laypage。render方法执行二默认执行，那么first
        //中保存的是true
        jump: function (obj, first) {
            console.log(obj.curr)
            if (!first) {
                initTable()
            }
            q.pagenum = obj.curr
        }
    })
}



