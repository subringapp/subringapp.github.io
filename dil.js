// Sayfa dilini seçer: önce kayıtlı seçim, yoksa tarayıcı dili (Türkçe ise TR, diğerleri EN)
(function(){
  var kayitli=null;
  try{kayitli=localStorage.getItem('subring-dil')}catch(e){}
  var tarayici=(navigator.language||'en').toLowerCase().indexOf('tr')===0?'tr':'en';
  var url=new URLSearchParams(location.search).get('lang');
  var dil=(url==='tr'||url==='en')?url:(kayitli||tarayici);
  function uygula(d){
    document.documentElement.lang=d;
    document.querySelectorAll('[data-dil]').forEach(function(el){el.hidden=el.getAttribute('data-dil')!==d});
    document.querySelectorAll('.dil button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.sec===d?'true':'false')});
    var t=document.querySelector('meta[name="baslik-'+d+'"]'); if(t) document.title=t.content;
  }
  document.addEventListener('DOMContentLoaded',function(){
    uygula(dil);
    document.querySelectorAll('.dil button').forEach(function(b){
      b.addEventListener('click',function(){dil=b.dataset.sec;try{localStorage.setItem('subring-dil',dil)}catch(e){};uygula(dil)});
    });
  });
})();
