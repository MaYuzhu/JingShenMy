(function (w) {
    $('#select1').on('click',function (ev) {
        var ev = ev || w.event
        var target = ev.target || ev.srcElement
        if(target.nodeName.toLowerCase() == 'a'){
            $('#dropdownMenu1').text(target.innerHTML)
            type_text = $('#dropdownMenu1').text(target.innerHTML)
        }

    })

})(window)