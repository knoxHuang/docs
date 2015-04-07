(function(){
    'use strict';

    var header = document.getElementById('top');
    //var container = document.getElementsByTagName('body')[0];
    var toc = document.getElementById('article-toc');
    var sidebar = document.getElementById('sidebar');
    var tocTop = document.getElementById('article-toc-top');
    var headerHeight = header.clientHeight;

    if (!toc) return;

    function updateSidebarPosition(){
        //var scrollTop = $('#full-wrap').scrollTop();
        var scrollTop = $('body').scrollTop();
        if (scrollTop > headerHeight){
            toc.classList.add('fixed');
            sidebar.classList.add('fixed');
        } else {
            toc.classList.remove('fixed');
            sidebar.classList.remove('fixed');
        }
    }

    $(window).scroll( function(){
        console.log('updating position');
        window.requestAnimationFrame(updateSidebarPosition);
    });

    updateSidebarPosition();

    tocTop.addEventListener('click', function(e){
        e.preventDefault();
        $('body').scrollTop(0);
    });
})();