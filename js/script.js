$(function () {
  // Close mobile menu after clicking a navigation link.
  $('.navbar-nav .nav-link').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Highlight the active navigation item.
  $('section, header').each(function () {
    $(this).attr('data-section', $(this).attr('id'));
  });

  $(window).on('scroll', function () {
    const scrollPosition = $(window).scrollTop() + 120;

    $('header[id], section[id]').each(function () {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = $(this).attr('id');
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

  // Current year in footer.
  $('#currentYear').text(new Date().getFullYear());

  // Demo contact form. Connect this later to your email/API backend.
  $('#contactForm').on('submit', function (event) {
    event.preventDefault();

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();

    if (!name || !email || !message) {
      $('#formMessage')
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Please fill in all required fields.');
      return;
    }

    $('#formMessage')
      .removeClass('text-danger')
      .addClass('text-success')
      .text('Thank you! The form is ready to connect with your email service.');

    this.reset();
  });
});
