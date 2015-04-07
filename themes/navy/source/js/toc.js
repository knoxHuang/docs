(function(){
  'use strict';

  var header = document.getElementById('top');
  var container = document.getElementById('full-wrap');
  var toc = document.getElementById('article-toc');
  var tocTop = document.getElementById('article-toc-top');
  //var headerHeight = header.clientHeight;

  if (!toc) return;

  function updateSidebarPosition(){
    //var scrollTop = $('#full-wrap').scrollTop();
    var scrollTop = $('body').scrollTop();
    if (scrollTop > $('#top')[0].clientHeight){
      toc.classList.add('fixed');
    } else {
      toc.classList.remove('fixed');
    }
  }

  container.addEventListener('scroll', function(){
    window.requestAnimationFrame(updateSidebarPosition);
  });

  updateSidebarPosition();

  tocTop.addEventListener('click', function(e){
    e.preventDefault();
    container.scrollTop = 0;
  });
})();