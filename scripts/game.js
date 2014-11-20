$(function() {
  var isMouseDown = false;
  var isOn = false;
  
  var puzzle = [];
  $.getJSON('puzzles/soccer.json').done(function(data) {
    puzzle = data;
    var line = '<table><tr id="header"><th>';
    $.each(puzzle.column, function(i, v) {
      line += '<th>';
      console.log(typeof v);
      if (typeof v === 'number') {
        if (v > 9) {
          line += '<span class="condensed">' + v + '</span>';
        } else {
          line += v;
        }
      } else if ($.isArray(v)) {
        $.each(v, function(i2, v2) {
          if (v2 > 9) {
            line += '<span class="condensed">' + v2 + '</span>';
          } else {
            line += v2;
          }
          if (i2 !== v.length - 1) {
            line += '<br />';
          }
        });
      }
    });

    $.each(puzzle.row, function(i, v) {
      line += '<tr><th>';
      console.log(typeof v);
      if (typeof v === 'number') {
        if (v > 9) {
          line += '<span class="condensed">' + v + '</span>';
        } else {
          line += v;
        }
      } else if ($.isArray(v)) {
        $.each(v, function(i2, v2) {
          if (v2 > 9) {
            line += '<span class="condensed">' + v2 + '</span>';
          } else {
            line += v2;
          }
          if (i2 !== v.length - 1) {
            line += '&nbsp;&nbsp;';
          }
        });
      }
      for(var k = 0; k < puzzle.column.length; k++) {
        line += '<td>';
      }
    });
    $('#game').append(line);
    
    $('th,td')
      .hover(function() {
      $(this)
        .parents('table')
        .find('td:nth-child(' + ($(this)
          .index() + 1) + ')')
          .add($(this).not('#header th')
          .parent())
        .toggleClass('highlight');
    });
    
    $('#paint, #mark').on('click', function() {
      if ($(this).hasClass('highlight')) {
      } else {
        $('#paint, #mark').toggleClass('highlight');
      }
    });
        
    $('td').on('mousedown', function() {
      var cursor;
      if ($('#paint').hasClass('highlight')) {
        cursor = 'on';
        $(this).removeClass('mark');
      } else {
        cursor = 'mark';
        $(this).removeClass('on');
      }
      $(this).toggleClass(cursor);
      isMouseDown = true;
      if ($(this).hasClass(cursor)) {
        isOn = true;
      } else {
        isOn = false;
      }
    });
    
    $('td').on('mouseup', function() {
      isMouseDown = false;
    });

    $('td').on('mousemove', function() {
      var cursor;
      if ($('#paint').hasClass('highlight')) {
        cursor = 'on';
      } else {
        cursor = 'mark';        
      }
      if (isMouseDown) {
        if (isOn) {
          $(this).addClass(cursor);
          if (cursor === 'on') {
            $(this).removeClass('mark');
          } else {
            $(this).removeClass('on');
          }
        } else {
          $(this).removeClass(cursor);
          $(this).removeClass('on');
        }
      }
    });
  });
});
