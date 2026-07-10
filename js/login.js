$(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    const $msg = $('#formMsg').removeClass('error success').hide();
    const $btn = $('#submitBtn').prop('disabled', true).text('Signing in…');

    $.ajax({
      url: 'php/login.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        identifier: $('#identifier').val().trim(),
        password: $('#password').val()
      }),
      success: function (res) {
        $msg.addClass('success').text(res.message).show();
        setTimeout(() => window.location.href = 'profile.html', 600);
      },
      error: function (xhr) {
        const res = xhr.responseJSON || {};
        $msg.addClass('error').text(res.message || 'Something went wrong. Try again.').show();
        $btn.prop('disabled', false).text('Sign in');
      }
    });
  });
});
