$('document').ready(function () {
	var lastScrollTop = 0;
	$(window).scroll(function trucenscroll(event) {
		var st = $(this).scrollTop();
		var sl = $(this).scrollLeft();
		if (st > lastScrollTop) {
			var p1, angle, i, tmp;

			p1 = {
					'x': sl - p0.x,
					'y': st - p0.y
				},
				angle = {
					'x': -p1.y * unit,
					'y': p1.x * unit
				};

			for (i = 0; i < faces.length; i++) {
				tmp = 'rotateX(' + angle.x + 'deg)' + ' rotateY(' + angle.y + 'deg)' + styles[i];
				faces[i].style.transform = p + tmp;
				faces[i].style['-webkit-transform'] = p + tmp;
			}
		} else if (st == lastScrollTop) {} else {
			var p1, angle, i, tmp;
			p1 = {
					'x': sl - p0.x,
					'y': st - p0.y
				},
				angle = {
					'x': -p1.y * unit,
					'y': p1.x * unit
				};

			for (i = 0; i < faces.length; i++) {
				tmp = 'rotateX(' + angle.x + 'deg)' + ' rotateY(' + angle.y + 'deg)' + styles[i];
				faces[i].style.transform = p + tmp;
				faces[i].style['-webkit-transform'] = p + tmp;
			}
		}
		lastScrollTop = st;
	});
});








init();
//			onMouseMove
function onMouseMove(e) {
	var p1, angle, i, tmp;

	if (!dragging) return;

	p1 = {
			'x': e.clientX - p0.x,
			'y': e.clientY - p0.y
		},
		angle = {
			'x': -p1.y * unit,
			'y': p1.x * unit
		};

	for (i = 0; i < faces.length; i++) {
		tmp = 'rotateX(' + angle.x + 'deg)' + ' rotateY(' + angle.y + 'deg)' + styles[i];
		faces[i].style.transform = p + tmp;
		faces[i].style['-webkit-transform'] = p + tmp;
	}
}
//			onMouseDown
function onMouseDown(e) {
	var element;

	onMouseUp(); // disable if dragging

	element = e.target;
	//if (! element.classList.contains('face')) return false;

	e.preventDefault();
	window.p0 = {
		'x': e.clientX,
		'y': e.clientY
	};
	dragging = true;
	return false;
}
//			onMouseUp
function onMouseUp(e) {
	var i, tmp, style;

	if (!dragging) return;
	dragging = false;

	for (i = 0; i < faces.length; i++) {
		style = faces[i].style;
		tmp = style.transform || style['-webkit-transform'];
		styles[i] = tmp.replace('perspective(32em) ', '');
	}

}
//			initializeCube
function initializeCube() {
	var i, tmp;

	for (i = 0; i < faces.length; i++) {
		if (i < 4) tmp = 'rotateY(' + i * 90 + 'deg)';
		if (i >= 4) tmp = 'rotateX(' + Math.pow(-1, i) * 90 + 'deg)';
		tmp += ' translateZ(' + side / 2 + 'px)';

		faces[i].style.transform = p + tmp;
		faces[i].style['-webkit-transform'] = p + tmp;
		styles.push(tmp);
	}
}
//			init
function init() {
	window.addEventListener('mousedown', onMouseDown, false);
	window.addEventListener('mouseup', onMouseUp, false);
	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('ontouchstart', onMouseDown, false);
	window.addEventListener('ontouchend', onMouseDown, false);
	window.addEventListener('ontouchmove', onMouseDown, false);

	window.faces = document.querySelectorAll('.face');
	window.styles = new Array();
	window.style = getComputedStyle(faces[0]);
	window.factor = 3;
	window.side = parseInt(style.width.split('px')[0], 10);
	window.max_amount = factor * side;
	window.unit = 360 / max_amount;
	window.dragging = false;
	window.scrolling = false;
	window.p = 'perspective(32em)';

	initializeCube();
}