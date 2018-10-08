/* global TrelloPowerUp */

var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
};


TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      text: 'RT Suite',
      callback: function(t) {
        return t.popup({
          title: "Choose a story points",
          url: 'estimate.html',
        });
      }
    }];
  },
  
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
      return [{
        icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
        text: estimate || 'No Estimate!',
        color: estimate ? null : 'red',
      }];  
    });
  },
  
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
      return [{
        title: 'Estimate',
        text: estimate || 'No Estimate!',
        color: estimate ? null : 'red',
        callback: function(t) {
          return t.popup({
            title: "Estimation",
            url: 'estimate.html',
          });
        }
      }]
    });
  },
  
  
  
  'board-buttons': function (t, opts) {
    return [{
      // we can either provide a button that has a callback function
      //icon: WHITE_ROCKET_ICON, //HERE IS THE ICON
      icon: GREY_ROCKET_ICON,
      text: 'BurnDown',
      callback: function(t) {
          return t.modal({
          // the url to load for the iframe
          url: 'https://rtsuite2.glitch.me/',
          // optional arguments to be passed to the iframe as query parameters
          // access later with t.arg('text')
          args: { text: 'Hello' },
          // optional color for header chrome
          accentColor: 'blue',
          // initial height for iframe
          height: 700, // not used if fullscreen is true
          // whether the modal should stretch to take up the whole screen
          fullscreen: false,
          // optional function to be called if user closes modal (via `X` or escape, etc)
          callback: () => console.log('Goodbye.'),
          // optional title for header chrome
          title: 'Burndown',
          // optional action buttons for header chrome
          // max 3, up to 1 on right side
          actions: [{
            icon: GREY_ROCKET_ICON, //LEFT ICON
            url: 'https://google.com',
            alt: 'Leftmost',
            position: 'left',            
          }, {
            icon: GREY_ROCKET_ICON, //SECOND LEFT ICON
            callback: (tr) => tr.popup({
              title: tr.localizeKey('appear_in_settings'),
              url: 'settings.html',
              height: 164,
            }),
            alt: 'Second from left',
            position: 'left',
          }, {
            icon: GREY_ROCKET_ICON, //RIGHT ICON
            callback: () => console.log(':tada:'),
            alt: 'Right side',
            position: 'right',
          }],
        });
        },
      condition: 'edit'
    }, {
      // or we can also have a button that is just a simple url
      // clicking it will open a new tab at the provided url
      icon: {
        dark: GREY_ROCKET_ICON,
        light: WHITE_ROCKET_ICON,
      },
      text: 'Go to RavTech site',
      condition: 'always',
      url: 'http://ravtech.co.il/',
      target: 'Inspiring Boards' // optional target for above url
    }];
  }
});
