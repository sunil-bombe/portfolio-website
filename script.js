/* script.js
   jQuery-powered interactivity:
   - Smooth scroll
   - Active nav link highlight on scroll
   - Responsive nav toggle
   - Project filter
   - Reveal on scroll (add .in-view)
   - Back-to-top button
   - Contact form frontend validation
*/

(function($){
  $(function(){

    // Helper: element in viewport (partial)
    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < (window.innerHeight || document.documentElement.clientHeight) - 60;
    }

    // Smooth scrolling for nav links
    $('a.nav-link, a[href^="#"]').on('click', function(e){
      var target = $(this).attr('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        var $el = $(target);
        if ($el.length) {
          $('html, body').animate({ scrollTop: $el.offset().top - 64 }, 600);
        }
        // close mobile nav if open
        if ($('.nav').hasClass('open')) {
          $('.nav').removeClass('open');
        }
      }
    });

    // Mobile nav toggle
    $('.nav-toggle').on('click', function(){
      $('.nav').toggleClass('open');
    });

    // Active nav highlight on scroll
    var sections = $('main section');
    function updateActiveNav() {
      var scrollPos = $(window).scrollTop();
      sections.each(function(){
        var top = $(this).offset().top - 80;
        var bottom = top + $(this).outerHeight();
        var id = $(this).attr('id');
        if (scrollPos >= top && scrollPos < bottom) {
          $('.nav-link').removeClass('active');
          $('.nav-link[href="#' + id + '"]').addClass('active');
        }
      });
    }

    // Reveal on scroll
    function revealOnScroll() {
      $('.reveal').each(function(){
        if (isInViewport(this)) {
          $(this).addClass('in-view');
        }
      });
    }

    // Project gallery filtering
    $('.filter-btn').on('click', function(){
      var filter = $(this).data('filter');
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');

      $('.project-card').each(function(){
        var cat = $(this).data('category');
        if (filter === 'all' || cat === filter) {
          $(this).show(250);
        } else {
          $(this).hide(200);
        }
      });
    });

    // Back to top
    var $back = $('#backToTop');
    $back.on('click', function(){ $('html,body').animate({scrollTop:0},600); });
    function toggleBackToTop() {
      if ($(window).scrollTop() > 500) $back.fadeIn(200);
      else $back.fadeOut(200);
    }

    // Contact form validation (frontend only)
    $('#contactForm').on('submit', function(e){
      e.preventDefault();
      var name = $('#name').val().trim();
      var email = $('#email').val().trim();
      var message = $('#message').val().trim();
      var valid = true;

      function setError(field, msg) {
        $('[data-for="'+field+'"]').text(msg);
        valid = false;
      }
      function clearError(field) {
        $('[data-for="'+field+'"]').text('');
      }

      clearError('name'); clearError('email'); clearError('message');

      if (name.length < 2) setError('name', 'Please enter your name (2+ characters).');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) setError('email', 'Please enter a valid email address.');
      if (message.length < 8) setError('message', 'Message should be at least 8 characters.');

      if (!valid) {
        $('#formStatus').text('Please fix the errors and try again.').css('color','#d04444');
        return;
      }

      // Simulate successful submission (front-end only)
      $('#formStatus').text('Sending...').css('color', 'var(--muted)');
      setTimeout(function(){
        $('#formStatus').text('Thanks — your message looks great! (frontend only)').css('color','var(--accent)');
        $('#contactForm')[0].reset();
      }, 900);
    });

    // On scroll events
    $(window).on('scroll resize', function(){
      updateActiveNav();
      revealOnScroll();
      toggleBackToTop();
    });

    // Initial run
    updateActiveNav();
    revealOnScroll();
    toggleBackToTop();

    // Year in footer
    $('#year').text(new Date().getFullYear());

  });
})(jQuery);
