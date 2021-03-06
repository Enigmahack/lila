var m = require('mithril');
var partial = require('chessground').util.partial;
var util = require('./util');
var button = require('./button');
var pagination = require('../pagination');
var arena = require('./arena');

var oneDayInSeconds = 60 * 60 * 24;

function startingMoment(data) {
  if (!data.secondsToStart) return;
  if (data.secondsToStart > oneDayInSeconds)
    return m('div.tournament_clock.title_tag', [
      m('time.moment-from-now.shy', {
        datetime: data.startsAt
      }, data.startsAt)
    ]);

  return m('div.tournament_clock.title_tag', {
    config: util.clock(data.secondsToStart)
  }, [
    m('span.shy', 'Starting in '),
    m('span.time.text')
  ]);
}

module.exports = {
  main: function(ctrl) {
    var pag = pagination.players(ctrl);
    return [
      startingMoment(ctrl.data),
      util.title(ctrl),
      m('div.standing_wrap',
        pagination.render(ctrl, pag, function() {
          return m('table.slist.standing' + (ctrl.data.scheduled ? '.scheduled' : ''), arena.standing(ctrl, pag));
        })),
      m('br'),
      m('br'),
      m('div.content_box_content', {
        config: function(el, isUpdate) {
          if (!isUpdate) $(el).html($('#tournament_faq').show());
        }
      })
    ];
  },
  side: function(ctrl) {
    return null;
  }
};
