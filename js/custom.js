function setPageWrapperPadding() {
  const header = document.getElementById("header");
  const pageWrapper = document.getElementById("page-wrapper");

  if (header && pageWrapper) {
    const headerHeight = header.offsetHeight;
    pageWrapper.style.paddingTop = headerHeight + "px";
  }
}

// Run on load
window.addEventListener("load", setPageWrapperPadding);

// Run on resize (in case header height changes on different screen sizes)
window.addEventListener("resize", setPageWrapperPadding);


$(function() {
  // Single overlay, hidden by default
  const $overlay = $('<div class="dropdown-overlay" aria-hidden="true"></div>')
    .appendTo('body')
    .hide(); // start hidden

  // Position overlay behind dropdown menu
  function positionOverlay($menu) {
    if (!$menu || !$menu.length) return;
    const rect = $menu[0].getBoundingClientRect();
    $overlay.css({
      top: rect.top + 'px',
      height: rect.height + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px'
    });
  }

  // Show dropdown with slideDown and overlay (only for dropdowns under #header)
  $('.dropdown').on('show.bs.dropdown', function() {
    const $dropdown = $(this);
    const $menu = $dropdown.find('.dropdown-menu').first();

    // Determine whether this dropdown is inside #header
    const usesOverlay = $dropdown.closest('#header').length > 0;

    // store this so hide handler knows whether to remove overlay
    $menu.data('uses-overlay', usesOverlay);

    setTimeout(function() {
      if (usesOverlay) {
        positionOverlay($menu);
        $overlay.show().addClass('is-visible');
      }

      $menu
        .stop(true, true)
        .css({ display: 'none' })
        .addClass('show')
        .slideDown(400);
    }, 10);
  });

  // Hide dropdown with slideUp and remove overlay only if it was used
  $('.dropdown').on('hide.bs.dropdown', function(e) {
    // prevent default immediate hide by bootstrap
    e.preventDefault();

    const $dropdown = $(this);
    const $menu = $dropdown.find('.dropdown-menu').first();
    const usesOverlay = !!$menu.data('uses-overlay');

    $menu.stop(true, true).slideUp(180, function() {
      $menu.removeClass('show').css('display', '');
      if (usesOverlay) {
        $overlay.removeClass('is-visible').hide();
      }
      // clear stored flag
      $menu.removeData('uses-overlay');
      // let Bootstrap know hide completed
      $dropdown.trigger('hidden.bs.dropdown');
    });
  });

  // Clicking the overlay should close the open header dropdown (optional)
  $overlay.on('click', function() {
    const $openHeaderDropdown = $('#header .dropdown.show').first();
    if ($openHeaderDropdown.length) {
      $openHeaderDropdown.find('[data-bs-toggle="dropdown"]').trigger('click');
      // Alternatively trigger hide: $openHeaderDropdown.trigger('hide.bs.dropdown');
    }
  });

  // Reposition overlay on scroll/resize only if header dropdown menu is open & visible
  $(window).on('resize scroll', function() {
    const $openMenu = $('#header .dropdown-menu.show').first();
    if ($openMenu.length && $openMenu.is(':visible')) {
      positionOverlay($openMenu);
    }
  });
});



$(document).ready(function() {
  $('.nav-item.dropdown').on('shown.bs.dropdown', function () {
    let $ul = $(this).find('.dropdown-menu > ul');
    if ($ul.length && !$ul.attr('data-fixed-height')) {
      let autoHeight = $ul[0].scrollHeight; // get natural height
      $ul.css('height', autoHeight + 'px'); // set inline height
      $ul.attr('data-fixed-height', 'true'); // mark as fixed
    }
  });

  // Work items filtering functionality
  function filterWorkItems(filterId) {
    const $workItems = $('.work-item-inner');
    
    if (!filterId || filterId === 'all') {
      // Show all work items
      $workItems.fadeIn(300);
    } else {
      // Filter work items based on data-ids attribute
      $workItems.each(function() {
        const $item = $(this);
        const dataIds = $item.attr('data-ids');
        
        if (dataIds && dataIds.split(',').map(id => id.trim()).includes(filterId)) {
          $item.fadeIn(300);
        } else {
          $item.fadeOut(300);
        }
      });
    }
  }

  // Handle dropdown item clicks for work filtering
  $('#your-ally .dropdown-item').on('click', function(e) {
    e.preventDefault();
    const filterId = $(this).attr('data-id');
    const filterText = $(this).text().trim();
    
    // Update dropdown button text
    const $dropdownToggle = $('#your-ally .dropdown-toggle');
    $dropdownToggle.html(filterText + ' <span class="dropdown_btn"><i class="fa-solid fa-angle-down"></i></span>');
    
    // Filter work items
    filterWorkItems(filterId);
    if(filterId == "all") {
      $('.services-section').hide();
      $('.home-section').show();
      $('#deep-section .wrapper').addClass('border-bottom-cust');
    } else {
      $('.services-section').show();
      $('.home-section').hide();
      $('#deep-section .wrapper').removeClass('border-bottom-cust');
    }
    
    // Close dropdown
    $(this).closest('.dropdown').removeClass('show');
    $(this).closest('.dropdown-menu').removeClass('show');
  });

  // Optional: Add "All" option to show all items
  // You can uncomment this if you want to add an "All" option
  // $('#your-ally .dropdown-menu').prepend('<li><a class="dropdown-item" href="#" data-id="all">All Works</a></li>');
});

