// taken from mo.js demos
function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
};

function extend( a, b ) {
    for( var key in b ) { 
        if( b.hasOwnProperty( key ) ) {
            a[key] = b[key];
        }
    }
    return a;
}

function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = false;

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
        this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    // this.el.addEventListener(clickHandler, function() {
        if( self.checked ) {
            self.options.onUnCheck();
        }
        else {
            self.options.onCheck();
            self.timeline.start();
        }
        self.checked = !self.checked;
    // });
}

Animocon.prototype.options = {
    tweens : [
        new mojs.Burst({
            shape : 'circle',
            isRunLess: true
        })
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
};

var el6 = document.querySelector(".pao"),el6span = el6.querySelector("p")
var scaleCurve6 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
		new Animocon(el6, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el6,
					duration: 1500,
					shape : 'circle',
					fill : 'white',
					x: '50%',
					y: '50%',
					childOptions: { 
						radius: {12:0},
						type: 'line',
						stroke: '#988ADE',
						strokeWidth: 2
					},
					radius: {40:110},
					count: 20,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el6,
					duration: 800,
					type: 'circle',
					radius: {10: 60},
					fill: 'transparent',
					stroke: '#988ADE',
					strokeWidth: {30:0},
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 800,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
					onUpdate: function(progress) {
						var scaleProgress = scaleCurve6(progress);
						el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
					}
				})
			],
			onCheck : function() {
				el6.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el6.style.color = '#C0C1C3';	
			}
		});