// @ts-nocheck
import { handleFileMove } from './script';

export function draggable(node, data) {
	let state = data;

	node.draggable = true;

	function handle_dragstart(e) {
		e.dataTransfer.setData('text/plain', state);
	}

	node.addEventListener('dragstart', handle_dragstart);
	return {
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
		}
	};
}

export function dropzone(node) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable'
	};

	function handle_dragenter(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const data = e.dataTransfer.getData('text/plain');
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
		const targetFile = e.target.href.split('/')[e.target.href.split('/').length - 1];
		handleFileMove(data, targetFile == 'home' ? null : targetFile);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update() {
			state = {
				dropEffect: 'move',
				dragover_class: 'droppable'
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}
