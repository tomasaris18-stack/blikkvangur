// Google Analytics 4 + samþykki fyrir vafrakökum.
// GA hleðst AÐEINS ef gestur ýtir á „Leyfa".
(function () {
  var GA_ID = 'G-THTY0LDSRG'; // Settu GA4 mælingarauðkennið hér, t.d. 'G-ABC123XYZ'
  if (!GA_ID) return;

  var KEY = 'bv-cookie-consent';
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function showBanner() {
    if (document.getElementById('bv-consent')) return;
    var css = document.createElement('style');
    css.textContent =
      '#bv-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:520px;margin:0 auto;background:#111210;color:#f7f5f0;padding:18px 20px;border-radius:6px;font-family:"DM Sans",sans-serif;font-size:14px;line-height:1.6;box-shadow:0 10px 30px rgba(0,0,0,.25)}' +
      '#bv-consent a{color:#b8962e}' +
      '#bv-consent .bv-row{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}' +
      '#bv-consent button{font:inherit;font-weight:600;padding:10px 18px;border-radius:4px;cursor:pointer;border:1px solid #b8962e}' +
      '#bv-consent .bv-yes{background:#b8962e;color:#111210}' +
      '#bv-consent .bv-no{background:transparent;color:#f7f5f0}';
    document.head.appendChild(css);
    var box = document.createElement('div');
    box.id = 'bv-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Vafrakökur');
    box.innerHTML =
      'Við notum vafrakökur til að telja heimsóknir og sjá hvað virkar á vefnum. <a href="/personuvernd">Nánar</a>' +
      '<div class="bv-row"><button class="bv-yes" type="button">Leyfa</button><button class="bv-no" type="button">Hafna</button></div>';
    document.body.appendChild(box);
    box.querySelector('.bv-yes').onclick = function () { setChoice('yes'); box.remove(); loadGA(); };
    box.querySelector('.bv-no').onclick = function () { setChoice('no'); box.remove(); };
  }

  // Svo hægt sé að breyta valinu (hlekkur í fæti / persónuverndarsíðu)
  window.openConsent = function () { showBanner(); return false; };

  var choice = getChoice();
  if (choice === 'yes') loadGA();
  else if (choice !== 'no') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }
})();
