/* Shared behaviour: copy-to-clipboard for BibTeX blocks */
(function () {
  function copy(text, btn) {
    var restore = btn.textContent;
    function ok() {
      btn.textContent = 'Copied';
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = restore;
        btn.classList.remove('done');
      }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.closest('.bibtex').querySelector('pre');
        if (pre) copy(pre.textContent, btn);
      });
    });
  });
})();
