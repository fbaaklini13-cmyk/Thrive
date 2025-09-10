
// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle){
  toggle.addEventListener('click', ()=> links.classList.toggle('open'));
}

// Smooth reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  })
},{threshold:.14});
document.querySelectorAll('.reveal-up').forEach(el=>io.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      window.scrollTo({top: el.offsetTop-64, behavior:'smooth'});
      links?.classList.remove('open');
    }
  })
});

// Fun demo for scanner card
const demoBtn = document.querySelector('[data-demo-scan]');
if (demoBtn){
  demoBtn.addEventListener('click', ()=>{
    const line = document.querySelector('.scanner-line');
    line.style.animation = 'none';
    // restart animation
    void line.offsetWidth;
    line.style.animation = '';
  })
}

// Replace year if needed

// Note: The waitlist form now posts directly to FormSubmit (see index.html),
// so we no longer intercept the submission in JavaScript. All signup emails
// are handled by the form action on the server side.


// --- Support Modal Controls ---
(function(){
  const openBtn = document.getElementById('openSupport');
  const closeBtn = document.getElementById('closeSupport');
  const modal = document.getElementById('supportModal');
  const overlay = document.getElementById('supportOverlay');

  if (!openBtn || !closeBtn || !modal || !overlay) return;

  function openModal(){
    modal.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    // move focus to close for accessibility
    closeBtn.focus();
    document.addEventListener('keydown', escHandler);
  }

  function closeModal(){
    modal.setAttribute('hidden', '');
    overlay.setAttribute('hidden', '');
    openBtn.focus();
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e){
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
})();


// Enhanced waitlist form handler: disables double-clicks, shows status, handles rate limits.
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('thrive-form');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', function(){
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    status.textContent = 'Sending...';
    // do not preventDefault; submit to Web3Forms and let redirect occur
  });
});document.addEventListener('DOMContentLoaded', () => {
  // Cheaper reveal on mobile
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('is-visible'));
  }
  // Pause scanner animation when section not visible
  const scanner = document.querySelector('#scanner');
  if (scanner){
    const animated = scanner.querySelectorAll('.scan-ring, .scanner-line');
    const setPlay = (running)=> animated.forEach(el => el.style.setProperty('--play', running ? 'running' : 'paused'));
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => setPlay(e.isIntersecting));
    }, { threshold: .1 });
    io.observe(scanner);
  }
});



/* === Phone E.164 formatter === */
(function(){
  function onlyDigits(s){ return (s || '').replace(/\D+/g, ''); }
  function toE164(cc, local){
    // trim any leading zeros in local for basic sanity
    var l = onlyDigits(local).replace(/^0+/, '');
    return cc + l;
  }
  function hookForm(form){
    var cc = form.querySelector('#countryCode');
    var local = form.querySelector('#phoneLocal');
    var e164 = form.querySelector('#phoneE164');
    if(!cc || !local || !e164) return;
    function update(){
      var val = toE164(cc.value, local.value);
      e164.value = val;
    }
    cc.addEventListener('change', update);
    ['input','blur','keyup'].forEach(function(evt){ local.addEventListener(evt, update); });
    update();
    form.addEventListener('submit', function(e){
      update();
      // rudimentary E.164 check
      var ok = /^\+[1-9]\d{6,14}$/.test(e164.value);
      if(!ok){
        e.preventDefault();
        var status = form.querySelector('#formStatus');
        if(status){ status.textContent = 'Please enter a valid phone number (with your country code).'; }
        local.focus();
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var forms = document.querySelectorAll('form#thrive-form');
    forms.forEach(hookForm);
  });
})();


var THRIVE_COUNTRIES = [{"name": "Afghanistan", "code": "+93"}, {"name": "Albania", "code": "+355"}, {"name": "Algeria", "code": "+213"}, {"name": "American Samoa", "code": "+1"}, {"name": "Andorra", "code": "+376"}, {"name": "Angola", "code": "+244"}, {"name": "Anguilla", "code": "+1"}, {"name": "Antigua and Barbuda", "code": "+1"}, {"name": "Argentina", "code": "+54"}, {"name": "Armenia", "code": "+374"}, {"name": "Aruba", "code": "+297"}, {"name": "Australia", "code": "+61"}, {"name": "Austria", "code": "+43"}, {"name": "Azerbaijan", "code": "+994"}, {"name": "Bahamas", "code": "+1"}, {"name": "Bahrain", "code": "+973"}, {"name": "Bangladesh", "code": "+880"}, {"name": "Barbados", "code": "+1"}, {"name": "Belarus", "code": "+375"}, {"name": "Belgium", "code": "+32"}, {"name": "Belize", "code": "+501"}, {"name": "Benin", "code": "+229"}, {"name": "Bermuda", "code": "+1"}, {"name": "Bhutan", "code": "+975"}, {"name": "Bolivia", "code": "+591"}, {"name": "Bosnia and Herzegovina", "code": "+387"}, {"name": "Botswana", "code": "+267"}, {"name": "Brazil", "code": "+55"}, {"name": "British Indian Ocean Territory", "code": "+246"}, {"name": "British Virgin Islands", "code": "+1"}, {"name": "Brunei", "code": "+673"}, {"name": "Bulgaria", "code": "+359"}, {"name": "Burkina Faso", "code": "+226"}, {"name": "Burundi", "code": "+257"}, {"name": "Cabo Verde", "code": "+238"}, {"name": "Cambodia", "code": "+855"}, {"name": "Cameroon", "code": "+237"}, {"name": "Canada", "code": "+1"}, {"name": "Cayman Islands", "code": "+1"}, {"name": "Central African Republic", "code": "+236"}, {"name": "Chad", "code": "+235"}, {"name": "Chile", "code": "+56"}, {"name": "China", "code": "+86"}, {"name": "Colombia", "code": "+57"}, {"name": "Comoros", "code": "+269"}, {"name": "Congo (Republic)", "code": "+242"}, {"name": "Congo (DRC)", "code": "+243"}, {"name": "Cook Islands", "code": "+682"}, {"name": "Costa Rica", "code": "+506"}, {"name": "C\u00f4te d\u2019Ivoire", "code": "+225"}, {"name": "Croatia", "code": "+385"}, {"name": "Cuba", "code": "+53"}, {"name": "Cura\u00e7ao", "code": "+599"}, {"name": "Cyprus", "code": "+357"}, {"name": "Czechia", "code": "+420"}, {"name": "Denmark", "code": "+45"}, {"name": "Djibouti", "code": "+253"}, {"name": "Dominica", "code": "+1"}, {"name": "Dominican Republic", "code": "+1"}, {"name": "Ecuador", "code": "+593"}, {"name": "Egypt", "code": "+20"}, {"name": "El Salvador", "code": "+503"}, {"name": "Equatorial Guinea", "code": "+240"}, {"name": "Eritrea", "code": "+291"}, {"name": "Estonia", "code": "+372"}, {"name": "Eswatini", "code": "+268"}, {"name": "Ethiopia", "code": "+251"}, {"name": "Falkland Islands", "code": "+500"}, {"name": "Faroe Islands", "code": "+298"}, {"name": "Fiji", "code": "+679"}, {"name": "Finland", "code": "+358"}, {"name": "France", "code": "+33"}, {"name": "French Guiana", "code": "+594"}, {"name": "French Polynesia", "code": "+689"}, {"name": "Gabon", "code": "+241"}, {"name": "Gambia", "code": "+220"}, {"name": "Georgia", "code": "+995"}, {"name": "Germany", "code": "+49"}, {"name": "Ghana", "code": "+233"}, {"name": "Gibraltar", "code": "+350"}, {"name": "Greece", "code": "+30"}, {"name": "Greenland", "code": "+299"}, {"name": "Grenada", "code": "+1"}, {"name": "Guadeloupe", "code": "+590"}, {"name": "Guam", "code": "+1"}, {"name": "Guatemala", "code": "+502"}, {"name": "Guernsey", "code": "+44"}, {"name": "Guinea", "code": "+224"}, {"name": "Guinea-Bissau", "code": "+245"}, {"name": "Guyana", "code": "+592"}, {"name": "Haiti", "code": "+509"}, {"name": "Honduras", "code": "+504"}, {"name": "Hong Kong", "code": "+852"}, {"name": "Hungary", "code": "+36"}, {"name": "Iceland", "code": "+354"}, {"name": "India", "code": "+91"}, {"name": "Indonesia", "code": "+62"}, {"name": "Iran", "code": "+98"}, {"name": "Iraq", "code": "+964"}, {"name": "Ireland", "code": "+353"}, {"name": "Isle of Man", "code": "+44"}, {"name": "Israel", "code": "+972"}, {"name": "Italy", "code": "+39"}, {"name": "Jamaica", "code": "+1"}, {"name": "Japan", "code": "+81"}, {"name": "Jersey", "code": "+44"}, {"name": "Jordan", "code": "+962"}, {"name": "Kazakhstan", "code": "+7"}, {"name": "Kenya", "code": "+254"}, {"name": "Kiribati", "code": "+686"}, {"name": "Korea, North", "code": "+850"}, {"name": "Korea, South", "code": "+82"}, {"name": "Kosovo", "code": "+383"}, {"name": "Kuwait", "code": "+965"}, {"name": "Kyrgyzstan", "code": "+996"}, {"name": "Laos", "code": "+856"}, {"name": "Latvia", "code": "+371"}, {"name": "Lebanon", "code": "+961"}, {"name": "Lesotho", "code": "+266"}, {"name": "Liberia", "code": "+231"}, {"name": "Libya", "code": "+218"}, {"name": "Liechtenstein", "code": "+423"}, {"name": "Lithuania", "code": "+370"}, {"name": "Luxembourg", "code": "+352"}, {"name": "Macao", "code": "+853"}, {"name": "Madagascar", "code": "+261"}, {"name": "Malawi", "code": "+265"}, {"name": "Malaysia", "code": "+60"}, {"name": "Maldives", "code": "+960"}, {"name": "Mali", "code": "+223"}, {"name": "Malta", "code": "+356"}, {"name": "Marshall Islands", "code": "+692"}, {"name": "Martinique", "code": "+596"}, {"name": "Mauritania", "code": "+222"}, {"name": "Mauritius", "code": "+230"}, {"name": "Mayotte", "code": "+262"}, {"name": "Mexico", "code": "+52"}, {"name": "Micronesia", "code": "+691"}, {"name": "Moldova", "code": "+373"}, {"name": "Monaco", "code": "+377"}, {"name": "Mongolia", "code": "+976"}, {"name": "Montenegro", "code": "+382"}, {"name": "Montserrat", "code": "+1"}, {"name": "Morocco", "code": "+212"}, {"name": "Mozambique", "code": "+258"}, {"name": "Myanmar", "code": "+95"}, {"name": "Namibia", "code": "+264"}, {"name": "Nauru", "code": "+674"}, {"name": "Nepal", "code": "+977"}, {"name": "Netherlands", "code": "+31"}, {"name": "New Caledonia", "code": "+687"}, {"name": "New Zealand", "code": "+64"}, {"name": "Nicaragua", "code": "+505"}, {"name": "Niger", "code": "+227"}, {"name": "Nigeria", "code": "+234"}, {"name": "Niue", "code": "+683"}, {"name": "North Macedonia", "code": "+389"}, {"name": "Norfolk Island", "code": "+672"}, {"name": "Northern Mariana Islands", "code": "+1"}, {"name": "Norway", "code": "+47"}, {"name": "Oman", "code": "+968"}, {"name": "Pakistan", "code": "+92"}, {"name": "Palau", "code": "+680"}, {"name": "Palestine", "code": "+970"}, {"name": "Panama", "code": "+507"}, {"name": "Papua New Guinea", "code": "+675"}, {"name": "Paraguay", "code": "+595"}, {"name": "Peru", "code": "+51"}, {"name": "Philippines", "code": "+63"}, {"name": "Poland", "code": "+48"}, {"name": "Portugal", "code": "+351"}, {"name": "Puerto Rico", "code": "+1"}, {"name": "Qatar", "code": "+974"}, {"name": "R\u00e9union", "code": "+262"}, {"name": "Romania", "code": "+40"}, {"name": "Russia", "code": "+7"}, {"name": "Rwanda", "code": "+250"}, {"name": "Saint Barth\u00e9lemy", "code": "+590"}, {"name": "Saint Helena", "code": "+290"}, {"name": "Saint Kitts and Nevis", "code": "+1"}, {"name": "Saint Lucia", "code": "+1"}, {"name": "Saint Martin", "code": "+590"}, {"name": "Saint Pierre and Miquelon", "code": "+508"}, {"name": "Saint Vincent and the Grenadines", "code": "+1"}, {"name": "Samoa", "code": "+685"}, {"name": "San Marino", "code": "+378"}, {"name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe", "code": "+239"}, {"name": "Saudi Arabia", "code": "+966"}, {"name": "Senegal", "code": "+221"}, {"name": "Serbia", "code": "+381"}, {"name": "Seychelles", "code": "+248"}, {"name": "Sierra Leone", "code": "+232"}, {"name": "Singapore", "code": "+65"}, {"name": "Sint Maarten", "code": "+1"}, {"name": "Slovakia", "code": "+421"}, {"name": "Slovenia", "code": "+386"}, {"name": "Solomon Islands", "code": "+677"}, {"name": "Somalia", "code": "+252"}, {"name": "South Africa", "code": "+27"}, {"name": "South Sudan", "code": "+211"}, {"name": "Spain", "code": "+34"}, {"name": "Sri Lanka", "code": "+94"}, {"name": "Sudan", "code": "+249"}, {"name": "Suriname", "code": "+597"}, {"name": "Sweden", "code": "+46"}, {"name": "Switzerland", "code": "+41"}, {"name": "Syria", "code": "+963"}, {"name": "Taiwan", "code": "+886"}, {"name": "Tajikistan", "code": "+992"}, {"name": "Tanzania", "code": "+255"}, {"name": "Thailand", "code": "+66"}, {"name": "Timor-Leste", "code": "+670"}, {"name": "Togo", "code": "+228"}, {"name": "Tokelau", "code": "+690"}, {"name": "Tonga", "code": "+676"}, {"name": "Trinidad and Tobago", "code": "+1"}, {"name": "Tunisia", "code": "+216"}, {"name": "Turkey", "code": "+90"}, {"name": "Turkmenistan", "code": "+993"}, {"name": "Turks and Caicos Islands", "code": "+1"}, {"name": "Tuvalu", "code": "+688"}, {"name": "Uganda", "code": "+256"}, {"name": "Ukraine", "code": "+380"}, {"name": "United Arab Emirates", "code": "+971"}, {"name": "United Kingdom", "code": "+44"}, {"name": "United States", "code": "+1"}, {"name": "Uruguay", "code": "+598"}, {"name": "Uzbekistan", "code": "+998"}, {"name": "Vanuatu", "code": "+678"}, {"name": "Vatican City", "code": "+39"}, {"name": "Venezuela", "code": "+58"}, {"name": "Vietnam", "code": "+84"}, {"name": "Wallis and Futuna", "code": "+681"}, {"name": "Western Sahara", "code": "+212"}, {"name": "Yemen", "code": "+967"}, {"name": "Zambia", "code": "+260"}, {"name": "Zimbabwe", "code": "+263"}];

/* === Populate country dropdown with full list (no flags) === */
(function(){
  function populateSelect(select){
    if(!select || !window.THRIVE_COUNTRIES) return;
    // Clear any existing
    while(select.firstChild) select.removeChild(select.firstChild);
    // Add a placeholder option
    var opt = document.createElement('option');
    opt.value = '+961';
    opt.textContent = 'Lebanon (+961)';
    select.appendChild(opt);
    // Add full list (dedupe by code+name)
    var seen = {};
    window.THRIVE_COUNTRIES.forEach(function(item){
      var key = item.name + '|' + item.code;
      if(seen[key]) return; seen[key] = true;
      var o = document.createElement('option');
      o.value = item.code;
      o.textContent = item.name + ' (' + item.code + ')';
      select.appendChild(o);
    });
    // Try to keep Lebanon selected by default for this site audience
    select.value = '+961';
  }
  document.addEventListener('DOMContentLoaded', function(){
    populateSelect(document.querySelector('#countryCode'));
  });
})();
