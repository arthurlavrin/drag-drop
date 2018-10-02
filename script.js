;(function () {

	window.addEventListener('load', init, false);
	function init() {
		var elem = document.querySelectorAll('.el-to-drag');
		for (var i = 0; i < elem.length; i += 1) {
			elem[i].addEventListener('mousedown', function (e) {
				drag(this, e);
			});
			elem[i].ondragstart = function() {
				return false;
			};
		}
	}

	function getCoords(element) {
		var box = element.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

	function drag(elToDrag, event) {

		// coors of mouse start
		var startX = event.pageX,
			startY = event.pageY;

		// coors of start el to drag
		var origX = getCoords(elToDrag).left,
		    origY = getCoords(elToDrag).top;

		// space beetwen
		var deltaX = startX - origX,
			deltaY = startY - origY;

		// creating a clone of target element
		var cloneElToDrag = elToDrag.cloneNode(true);
		cloneElToDrag.style =
			'position: absolute; ' +
			'background-color: rgba(170, 170, 0, 0.46);  ' +
			'pointer-events: none;' +
			'box-shadow: 5px 5px 12px black;';

		elToDrag.style = 'border: 2px solid black; background-color: transparent;';

		document.body.appendChild(cloneElToDrag);

		// init mousemove mouseup
		document.addEventListener('mousemove', moveHandler, true);
		document.addEventListener('mouseup', upHandler, true);

		moveHandler(event);
		var wrapper = document.querySelectorAll('#wrapper > div > div ');
		for (var t = 0; t < wrapper.length; t++) {
			wrapper[t].onmouseover = function () {
				if ((cloneElToDrag !== null) && (this !== elToDrag)) {
					this.style.backgroundColor = 'red';
					this.style.border = '2px dashed black';
				}
			};
			wrapper[t].onmouseout = function () {
				if ((cloneElToDrag !== null) && (this !== elToDrag)) {
					this.style.backgroundColor = '#aaaa00';
					this.style.border = 'none';
				}
			};
		}

		function moveHandler(e) {
			// drag elements with considering of first click
			cloneElToDrag.style.left = (e.pageX - deltaX - 10) + 'px';
			cloneElToDrag.style.top = (e.pageY - deltaY - 10) + 'px';

		}

		function upHandler(ev) {
			document.body.removeChild(cloneElToDrag);

			elToDrag.style = 'border: none;';
			cloneElToDrag = null;

			var divWrapper = elToDrag.parentNode;
			var elementFromPoint = document.elementFromPoint(ev.clientX, ev.clientY);
			var targetEl = elementFromPoint.parentNode;
			var wrapper = document.getElementById('wrapper');

			if (elementFromPoint.className === 'el-to-drag') {
				divWrapper.appendChild(elementFromPoint);
				targetEl.appendChild(elToDrag);
				elementFromPoint.style.backgroundColor = '#aaaa00';
				elementFromPoint.style.border = 'none';
				elToDrag.style.backgroundColor = '#aaaa00';
			}

			document.removeEventListener('mouseup', upHandler, true);
			document.removeEventListener('mousemove', moveHandler, true);
		}
	}

})();


